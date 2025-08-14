# AWS Amplify Deployment Guide for WVEC Website

## Prerequisites
- AWS Account (create one at https://aws.amazon.com if needed)
- GitHub repository with your code (completed in previous step)
- Claude API key from Anthropic (for WVGM-4 AI feature)

## Step-by-Step Deployment

### 1. Access AWS Amplify Console
1. Go to: https://console.aws.amazon.com/amplify
2. Sign in with your AWS account
3. Select your preferred region (e.g., `eu-west-2` for London)

### 2. Create New App
1. Click the orange **"New app"** button
2. Select **"Host web app"**
3. Choose **GitHub** as your repository service
4. Click **"Continue"**

### 3. Connect GitHub Repository
1. Click **"Authorize AWS Amplify"**
2. A popup will open - authorize AWS to access your GitHub
3. Select your repository: **wvec-website**
4. Select branch: **main**
5. Click **"Next"**

### 4. Configure Build Settings
AWS Amplify should auto-detect Next.js. The build settings should look like:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

✅ We've already added `amplify.yml` to your repository, so this is configured!

Click **"Next"**

### 5. Configure Environment Variables
Click **"Advanced settings"** and add these environment variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `CLAUDE_API_KEY` | `sk-ant-...` | Your Claude API key |
| `JWT_SECRET` | `generate-32-char-random-string` | For admin authentication |
| `ADMIN_EMAILS` | `pastor@wvec.org.uk,admin@wvec.org.uk,secretary@wvec.org.uk,russell@tyrcars.co.uk` | Approved admin emails |
| `DEFAULT_ADMIN_PASSWORD` | `Password123` | Default password |
| `WVGM4_SYSTEM_PROMPT` | `You are WVGM-4...` | AI system prompt (optional) |

**To generate a JWT_SECRET:**
```bash
openssl rand -base64 32
```

### 6. Review and Deploy
1. Review all settings
2. Click **"Save and deploy"**
3. Wait 5-10 minutes for initial deployment

### 7. Access Your Website
Once deployed, you'll get a URL like:
```
https://main.d1234567890abc.amplifyapp.com
```

Test these pages:
- Homepage: `/`
- Admin Portal: `/admin`
- AI Assistant: `/wvgm-4`
- Events: `/events`
- Sermons: `/sermons`

## Setting Up Custom Domain (Optional)

### If you own wvec.org.uk:

1. In Amplify Console, click **"Domain management"**
2. Click **"Add domain"**
3. Enter: `wvec.org.uk`
4. Configure subdomains:
   - `@` → main branch (for wvec.org.uk)
   - `www` → main branch (for www.wvec.org.uk)
5. Click **"Save"**

### DNS Configuration:
Add these records to your domain's DNS:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `main.d1234567890abc.amplifyapp.com` |
| A | @ | Amplify will provide IP addresses |

### SSL Certificate:
- AWS automatically provisions SSL certificates
- Takes 15-30 minutes to activate

## Post-Deployment Checklist

### ✅ Test Core Functionality:
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Service times display
- [ ] Contact information visible

### ✅ Test Admin Portal:
- [ ] Login with approved email
- [ ] Create a test event
- [ ] Create a test article
- [ ] Change password
- [ ] Logout works

### ✅ Test WVGM-4 AI:
- [ ] Chat interface loads
- [ ] Can send messages (requires Claude API key)
- [ ] Conversation history persists
- [ ] New chat creation works

### ✅ SEO Verification:
- [ ] Meta tags present (view source)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

## Monitoring & Maintenance

### View Logs:
1. In Amplify Console, click your app
2. Go to **"Monitoring"** tab
3. View build logs and access logs

### Automatic Deployments:
- Every push to `main` branch triggers deployment
- Takes 3-5 minutes per deployment

### Manual Redeploy:
1. In Amplify Console, click **"Redeploy this version"**

## Troubleshooting

### Build Fails:
- Check build logs for errors
- Ensure all dependencies in package.json
- Verify environment variables set correctly

### 500 Errors:
- Check environment variables
- View CloudWatch logs
- Ensure data directory exists

### Admin Login Issues:
- Verify email in ADMIN_EMAILS
- Check JWT_SECRET is set
- Ensure DEFAULT_ADMIN_PASSWORD matches

## Support Resources

- AWS Amplify Docs: https://docs.amplify.aws
- Next.js on AWS: https://aws.amazon.com/blogs/mobile/amplify-next-js-13/
- WVEC Contact: wvec.office@gmail.com

## Costs

AWS Amplify Free Tier includes:
- 1,000 build minutes per month
- 15 GB served per month
- 5 GB stored per month

Estimated monthly cost for church website: **$0-5**

---

**Need help?** Contact your web administrator or check the repository issues.