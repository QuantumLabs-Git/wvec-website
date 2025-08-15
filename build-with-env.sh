#!/bin/bash

# Build script for local testing without Supabase
# Production builds on AWS Amplify will have the proper environment variables

export NEXT_PUBLIC_SUPABASE_URL="https://placeholder.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder-key"
export SUPABASE_SERVICE_KEY="placeholder-service-key"

npm run build