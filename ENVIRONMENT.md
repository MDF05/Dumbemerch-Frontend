# 🌍 Environment Variables

This document outlines the environment variables required to run the Dumbmerch Frontend.

## Setup

1. Create a file named `.env` in the root directory.
2. Copy the contents of standard variables below.
3. Replace the placeholder values with your actual configuration.

## Variables

| Variable | Description | Required | Default |
|----------|-------------|:--------:|---------|
| `VITE_API_BASE_URL` | The base URL for the backend API. | ✅ | `http://localhost:5000/api/v1` |
| `VITE_SOCKET_URL` | The URL for the Socket.io server. | ✅ | `http://localhost:5000` |
| `VITE_MIDTRANS_CLIENT_KEY` | Client key for Midtrans Payment Gateway. | ✅ | `your-midtrans-client-key` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name for image uploads. | ❌ | `your-cloud-name` |

## Example `.env` File

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000

# Payment Gateway
VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxx

# Third Party Services
VITE_CLOUDINARY_CLOUD_NAME=dumbmerch-cloud
```

## Accessing Variables in Code

Since this project uses Vite, environment variables are exposed on `import.meta.env`.

```typescript
// Example
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

> **Note**: Only variables prefixed with `VITE_` are exposed to your client-side code to prevent accidental leakage of sensitive secrets.
