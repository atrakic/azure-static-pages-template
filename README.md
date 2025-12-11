# Azure Static Website Pulumi Template

This template provides a complete solution for deploying a static website on Azure using Pulumi with TypeScript. It automatically provisions the required Azure resources and uploads your static files with proper content type detection.

## When to Use This Template

- You want to deploy a static website (HTML, CSS, JS) to Azure
- You need automatic file uploading with proper content type detection
- You want Infrastructure as Code for your static website hosting
- You're building a frontend application that needs Azure hosting
- You want to leverage Azure Storage's static website capabilities

 ## Prerequisites

 - An active Azure subscription
 - Node.js (LTS) installed
 - A Pulumi account and CLI already installed and configured
 - Azure credentials available (e.g., via `az login` or environment variables)
 - Your static website files in the `wwwroot/` directory

 ## Quick Start

 1. Clone this template:
 ```bash
 git clone <repository-url>
 cd azure-static-pages-template
 ```

 2. Install dependencies:
 ```bash
 npm install
 ```

 3. Add your static files to the `wwwroot/` directory:
 ```
 wwwroot/
 ├── index.html
 ├── 404.html
 ├── style.css
 └── ... (any other static files)
 ```

 4. Configure Azure region (optional):
 ```bash
 pulumi config set azure-native:location eastus
 ```

 5. Deploy your static website:
 ```bash
 pulumi up
 ```

 ## Project Layout

 ```
 .
 ├── Pulumi.yaml       # Project metadata & configuration
 ├── index.ts          # Main Pulumi program with static website setup
 ├── package.json      # Node.js dependencies
 ├── tsconfig.json     # TypeScript compiler options
 └── wwwroot/          # Your static website files
     ├── index.html    # Main page (required)
     ├── 404.html      # Error page (required)
     ├── style.css     # Stylesheets
     └── ...           # Any other static assets
 ```

 ## Configuration

 Pulumi configuration lets you customize deployment parameters.

 - **azure-native:location** (string)
   - Description: Azure region to provision resources in
   - Default: `WestUS2`

 Set a custom location before deployment:
 ```bash
 pulumi config set azure-native:location eastus
 ```

 ## Resources Created

 1. **Resource Group**: Container for all Azure resources
 2. **Storage Account**: StorageV2 account with static website hosting enabled
 3. **Static Website Configuration**: Automatic setup with index.html and 404.html
 4. **Blob Storage**: All files from `wwwroot/` uploaded with correct content types

 ## Features

 ### **Automatic File Discovery**
 - Scans `wwwroot/` directory and uploads all files
 - No need to manually specify each file in code
 - Add new files to `wwwroot/` and they'll be automatically included

 ### **Smart Content Type Detection**
 - Automatically sets correct MIME types based on file extensions
 - Supports HTML, CSS, JavaScript, JSON, images (PNG, JPG, GIF, SVG), and more
 - Ensures proper browser rendering and caching

 ### 📁 **Supported File Types**
 - **Web Files**: `.html`, `.css`, `.js`, `.json`
 - **Images**: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.ico`
 - **Documents**: Any other file type (served as `application/octet-stream`)

 ## Outputs

 After `pulumi up`, the following outputs are available:
 After `pulumi up`, the following outputs are available:

 - **staticEndpoint**: The URL of your live static website

 Retrieve it with:
 ```bash
 pulumi stack output staticEndpoint
 ```

 Your website will be available at: `https://<storage-account>.z16.web.core.windows.net/`

 ## Configuration Options

 Pulumi configuration lets you customize deployment parameters.

 - **azure-native:location** (string)
   - Description: Azure region to provision resources in
   - Default: `WestUS2`

 Set a custom location:
 ```bash
 pulumi config set azure-native:location eastus
 ```

 ## Adding New Files

 To add new static files to your website:

 1. Add files to the `wwwroot/` directory
 2. Run `pulumi up` to deploy changes
 3. Files are automatically detected and uploaded with proper content types

 ## Troubleshooting

 ### Permission Issues
 If you encounter 403 permission errors, ensure your Azure account has:
 - `Storage Blob Data Contributor` role on the storage account
 - `Contributor` role on the resource group

 ### Static Website Not Configured
 If you see "Static website is not configured" errors:
 1. Check that `index.html` exists in your `wwwroot/` directory
 2. Ensure static website hosting is enabled on the storage account
 3. Verify the storage account allows public blob access

 ## Next Steps

 - **Custom Domain**: Configure a custom domain for your static website
 - **CDN Integration**: Add Azure CDN for global content delivery
 - **CI/CD Pipeline**: Set up automated deployment with GitHub Actions
 - **HTTPS**: Configure SSL certificates for secure connections
 - **Multiple Environments**: Create separate stacks for dev/staging/prod

 ## Example Use Cases

 - **Portfolio Websites**: Personal or professional portfolios
 - **Documentation Sites**: Project documentation or knowledge bases
 - **Landing Pages**: Marketing or product landing pages
 - **Single Page Applications**: React, Vue, or Angular SPAs
 - **Static Blogs**: Jekyll, Hugo, or other static site generators
