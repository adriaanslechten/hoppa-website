# Deployment Guide

This repository is configured for automatic deployment to Netlify hosting using GitHub Actions.

## 🚀 Automatic Deployment

Every time you push to the `main` or `master` branch, the site will automatically:
1. Build the Next.js application as static files
2. Deploy to Netlify hosting
3. Update your live site at https://hoppa.fit/

## ⚙️ Setup Instructions

### 1. Create Netlify Account

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up with GitHub** (recommended)
3. **Authorize Netlify** to access your repositories

### 2. Initial Manual Deployment

1. **Build your site locally**: `npm run export`
2. **Drag the `out` folder** to Netlify dashboard
3. **Note your temporary URL** (e.g., `amazing-name-123456.netlify.app`)

### 3. Get Netlify Credentials

**Site ID:**
1. In Netlify → **Site settings** → **General**
2. Copy the **Site ID** (e.g., `abc12345-def6-7890-ghij-klmnopqrstuv`)

**Auth Token:**
1. Netlify → **User settings** (avatar menu)
2. **Applications** → **Personal access tokens**
3. **New access token** → name it "GitHub Actions"
4. **Copy the token** (starts with `nfp_...`)

### 4. Configure GitHub Secrets

In your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `NETLIFY_AUTH_TOKEN` | Your personal access token | `nfp_123...` |
| `NETLIFY_SITE_ID` | Your site ID | `abc12345-def6...` |

### 5. Set Up Custom Domain (hoppa.fit)

**In Netlify:**
1. **Site settings** → **Domain management**
2. **Add custom domain** → `hoppa.fit`
3. **Note the DNS instructions** provided

**In GoDaddy:**
1. Go to your `hoppa.fit` domain → **DNS**
2. **Update these records:**
   - **A record**: `@` → `75.2.60.5`
   - **CNAME record**: `www` → `your-site-name.netlify.app`

### 6. Deployment Process

When you push changes:
1. **GitHub Actions runs** automatically
2. **Installs dependencies** and builds the static site
3. **Deploys to Netlify** using your credentials
4. **Your site at https://hoppa.fit/** is updated
5. **SSL certificate** is automatically managed

## 🔧 Manual Deployment

If you need to deploy manually:

```bash
# Build the site
npm run export

# Deploy to Netlify (if you have Netlify CLI installed)
netlify deploy --prod --dir=out
```

## 🐛 Troubleshooting

### Common Issues:

1. **Deployment fails with "Unauthorized"**
   - Check your `NETLIFY_AUTH_TOKEN` in GitHub secrets
   - Ensure the token has the correct permissions
   - Try generating a new token

2. **Site ID not found**
   - Verify `NETLIFY_SITE_ID` matches your site
   - Check in Netlify → Site settings → General

3. **Custom domain not working**
   - Wait 24-48 hours for DNS propagation
   - Verify DNS records in GoDaddy are correct
   - Check Netlify → Domain management for status

4. **Build fails**
   - Check the Actions log for TypeScript or build errors
   - Ensure all dependencies are listed in `package.json`

### Getting Help:

- **GitHub Actions logs**: Repository → Actions tab
- **Netlify deploy logs**: Netlify dashboard → Deploys
- **DNS checker**: Use online tools to verify DNS propagation

## ✨ Benefits over GoDaddy FTP

- ✅ **Free hosting** (no monthly fees)
- ✅ **Automatic SSL** certificates
- ✅ **Global CDN** for faster loading
- ✅ **Branch previews** for testing
- ✅ **Form handling** built-in
- ✅ **Better performance** optimization
- ✅ **Serverless functions** if needed later

## 📝 Notes

- **Free tier includes**: 100GB bandwidth, 300 build minutes/month
- **Custom domain** works on free tier
- **HTTPS** is automatic and free
- **Deployment takes** 2-3 minutes typically
- **DNS changes** can take up to 48 hours to propagate globally
