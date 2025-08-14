#!/bin/bash

echo "🚀 Deploying WVEC Website to GitHub"
echo "===================================="

# Check if authenticated
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ Not authenticated with GitHub"
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub authentication confirmed"

# Create repository
echo "📦 Creating GitHub repository..."
gh repo create wvec-website \
    --public \
    --source=. \
    --description="Whiddon Valley Evangelical Church website with admin portal and AI assistant" \
    --push

if [ $? -eq 0 ]; then
    echo "✅ Repository created and code pushed successfully!"
    echo ""
    echo "🔗 Your repository is now available at:"
    gh repo view --web --no-browser
else
    echo "⚠️  Repository might already exist. Trying to add remote and push..."
    
    # Get GitHub username
    USERNAME=$(gh api user --jq .login)
    
    # Add remote if not exists
    git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$USERNAME/wvec-website.git"
    
    # Push to main branch
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Code pushed successfully!"
        echo "🔗 View at: https://github.com/$USERNAME/wvec-website"
    else
        echo "❌ Failed to push. Please check your repository settings."
    fi
fi