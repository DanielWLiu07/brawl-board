# Environment Variables for Vercel Deployment

This document lists all environment variables that need to be configured in your Vercel project settings.

## Required Environment Variables

### 1. Clerk Authentication

**NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** (Required)
- **Description**: Clerk publishable key for client-side authentication
- **Where to find**: Clerk Dashboard → API Keys → Publishable Key
- **Format**: `pk_test_...` or `pk_live_...`
- **Example**: `pk_test_abcdefghijklmnopqrstuvwxyz1234567890`

**CLERK_SECRET_KEY** (Required)
- **Description**: Clerk secret key for server-side authentication
- **Where to find**: Clerk Dashboard → API Keys → Secret Key
- **Format**: `sk_test_...` or `sk_live_...`
- **Example**: `sk_test_abcdefghijklmnopqrstuvwxyz1234567890`
- **Note**: This is a server-side only variable, not prefixed with `NEXT_PUBLIC_`

### 2. Convex Database

**NEXT_PUBLIC_CONVEX_URL** (Required)
- **Description**: Convex deployment URL for real-time database connections
- **Where to find**: Convex Dashboard → Settings → Deployment URL
- **Format**: `https://your-deployment.convex.cloud` or `https://xxx.convex.site`
- **Example**: `https://your-app-name.convex.cloud`

**Note**: You may also need to configure Convex environment variables in your Convex dashboard if using server-side functions.

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: The variable name (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
   - **Value**: The actual value
   - **Environment**: Select which environments to apply to:
     - **Production**: For production deployments
     - **Preview**: For preview deployments (pull requests)
     - **Development**: For local development (optional, use `.env.local` instead)

4. Click **Save**
5. **Redeploy** your application for changes to take effect

## Environment Variable Checklist

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CONVEX_URL`

## Important Notes

1. **`NEXT_PUBLIC_*` prefix**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser/client-side code. Use this prefix only for values that are safe to be public.

2. **Server-side variables**: Variables without `NEXT_PUBLIC_` prefix are only available on the server-side and are never exposed to the client.

3. **After adding variables**: After adding new environment variables in Vercel, you must redeploy your application for them to take effect.

4. **Local development**: For local development, create a `.env.local` file in the root directory with the same variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
   ```

5. **Security**: Never commit `.env.local` or `.env` files to version control. They are already in `.gitignore`.

## Troubleshooting

### Build fails with "No address provided to ConvexReactClient"
- **Solution**: Make sure `NEXT_PUBLIC_CONVEX_URL` is set in Vercel environment variables
- **Note**: The app is configured to gracefully handle missing Convex URL during build, but it's still required for runtime functionality

### Authentication not working
- **Solution**: Verify both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set correctly
- Check that the keys match your Clerk application

### Convex queries not working
- **Solution**: Ensure `NEXT_PUBLIC_CONVEX_URL` is correctly set and points to your active Convex deployment
- Verify the Convex deployment is running in your Convex dashboard
