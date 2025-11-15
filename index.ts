import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as fs from "fs";
import * as path from "path";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup");

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("sa", {
    resourceGroupName: resourceGroup.name,
    sku: {
        name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
    allowBlobPublicAccess: true,
});

// Static website is manually enabled via Azure CLI due to RBAC permission issues
// The $web container is automatically created when static website hosting is enabled

// Get all files from wwwroot directory
const wwwrootPath = "./wwwroot";
const files = fs.readdirSync(wwwrootPath).filter(file => {
    const filePath = path.join(wwwrootPath, file);
    return fs.statSync(filePath).isFile();
});

// Helper function to get content type based on file extension
function getContentType(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        case '.ico':
            return 'image/x-icon';
        default:
            return 'application/octet-stream';
    }
}

// Upload the files
files.map(name =>
    new storage.Blob(name, {
        resourceGroupName: resourceGroup.name,
        accountName: storageAccount.name,
        containerName: "$web",
        source: new pulumi.asset.FileAsset(`./wwwroot/${name}`),
        contentType: getContentType(name),
    }, { dependsOn: [storageAccount] }),
);

new storage.Blob("test.html", {
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
    containerName: "$web",
    source: new pulumi.asset.StringAsset("<h1>This is deployed as-is</h1>"),
    contentMd5: "+vC+ix/2YjgiJLA4GimBqg==",
    contentType: "text/html",
}, { dependsOn: [storageAccount] });

const storageAccountKeys = storage.listStorageAccountKeysOutput({
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name
});

// Export the primary key of the Storage Account
//export const primaryStorageKey = pulumi.secret(storageAccountKeys.keys[0].value);
export const staticEndpoint = storageAccount.primaryEndpoints.web;
