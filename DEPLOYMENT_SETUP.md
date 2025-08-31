# Deployment Setup Guide

## GitHub Repository Setup

### 1. Enable GitHub Pages
1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. This will use the workflow we created in `.github/workflows/deploy.yml`

### 2. Configure Repository Settings
1. In **Settings** → **Pages**:
   - Set **Source** to "GitHub Actions"
   - The custom domain will be automatically configured via the `CNAME` file

### 3. Push Changes
```bash
git add .
git commit -m "Add GitHub Actions deployment configuration"
git push origin main
```

## Namecheap Domain Configuration

### 1. DNS Records Setup
In your Namecheap dashboard, go to **Domain List** → **Manage** → **Advanced DNS** and add these records:

#### A Records (IPv4):
```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A Record  
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic
```

#### CNAME Record:
```
Type: CNAME Record
Host: www
Value: themostsundargirlintheworld.com
TTL: Automatic
```

### 2. Wait for DNS Propagation
- DNS changes can take 24-48 hours to propagate globally
- You can check propagation using tools like:
  - https://www.whatsmydns.net/
  - https://dnschecker.org/

### 3. SSL Certificate
- GitHub Pages automatically provides SSL certificates
- Once DNS is properly configured, HTTPS will be available
- The certificate may take a few hours to provision

## Verification Steps

### 1. Check GitHub Actions
1. Go to your repository → **Actions** tab
2. Verify the deployment workflow runs successfully after pushing
3. Check that the site deploys to the GitHub Pages URL

### 2. Test Custom Domain
1. Once DNS propagates, test: `https://themostsundargirlintheworld.com`
2. Test www subdomain: `https://www.themostsundargirlintheworld.com`
3. Verify HTTPS redirects work properly

### 3. Monitor Deployment
- GitHub Actions will automatically deploy on every push to main/master branch
- Check the Actions tab for deployment status
- Monitor for any deployment errors

## Troubleshooting

### Common Issues:
1. **DNS Not Propagated**: Wait 24-48 hours, check with DNS checker tools
2. **SSL Certificate Issues**: Can take up to 24 hours after DNS is correct
3. **Deployment Failures**: Check GitHub Actions logs for specific errors
4. **Custom Domain Not Working**: Verify CNAME file is in the root directory

### Support Resources:
- GitHub Pages Documentation: https://docs.github.com/en/pages
- Namecheap DNS Guide: https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/
- GitHub Actions Documentation: https://docs.github.com/en/actions

## Files Created:
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `CNAME` - Custom domain configuration
- `_redirects` - URL routing rules
- `.nojekyll` - Disables Jekyll processing
- `DEPLOYMENT_SETUP.md` - This setup guide
