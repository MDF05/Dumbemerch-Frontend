# 🚀 Deployment Guide

This document covers the build and deployment process for the Dumbmerch Frontend.

## 🏗️ Build Process

The project uses **Vite** for building the production bundle.

### Command
```bash
npm run build
```

### Output
The build process generates a `dist/` folder containing:
- Minified HTML, CSS, and JavaScript.
- Optimized assets.
- Hash-versioned filenames for cache busting.

## ☁️ Deployment Targets

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the Vite framework settings.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Add Environment Variables in the Vercel Dashboard (Project Settings > Environment Variables).
4. Deploy.

### Netlify

1. Drag and drop the `dist/` folder to Netlify Drop, or connect via Git.
2. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Configure Environment Variables in Site Settings.

### Docker (Optional)

You can containerize the frontend using Nginx to serve the static files.

**Dockerfile**:
```dockerfile
# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔄 CI/CD Pipelines

If using GitHub Actions, a typical workflow `.github/workflows/deploy.yml` might look like this:

```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Dependencies
        run: npm ci
      - name: Build
        run: npm run build
```
