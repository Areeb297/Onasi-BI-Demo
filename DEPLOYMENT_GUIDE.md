# Deployment Guide - Render

Deploy the Onasi BI Demo application to [Render](https://render.com) with this step-by-step guide.

---

## 📋 Prerequisites

- GitHub account with the repository pushed
- Render account (free tier available at [render.com](https://render.com))

---

## 🏗️ Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend      │
│  (Static Site)  │     │  (Web Service)  │
│                 │     │                 │
│  React App      │     │  Express + API  │
│  Port: N/A      │     │  Port: 4000     │
└─────────────────┘     └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │   SQLite DB     │
                        │  (Bundled)      │
                        └─────────────────┘
```

---

## 🚀 Deployment Steps

### Step 1: Deploy the Backend

1. **Log in to Render** → Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New Web Service**
   - Click **New** → **Web Service**
   - Connect your GitHub repository

3. **Configure the Service**

   | Setting | Value |
   |---------|-------|
   | **Name** | `onasi-bi-backend` |
   | **Region** | Choose closest to your users |
   | **Branch** | `main` |
   | **Root Directory** | `backend` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |

4. **Set Environment Variables** (Optional)

   | Key | Value |
   |-----|-------|
   | `PORT` | `4000` |

5. Click **Create Web Service**

6. **Copy the Backend URL** once deployed (e.g., `https://onasi-bi-backend.onrender.com`)

---

### Step 2: Deploy the Frontend

1. **Create New Static Site**
   - Click **New** → **Static Site**
   - Connect the same GitHub repository

2. **Configure the Static Site**

   | Setting | Value |
   |---------|-------|
   | **Name** | `onasi-bi-frontend` |
   | **Branch** | `main` |
   | **Root Directory** | `frontend` |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `build` |

3. **Set Environment Variables** (Required)

   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_URL` | `https://onasi-bi-backend.onrender.com` |

   > ⚠️ Replace with your actual backend URL from Step 1

4. Click **Create Static Site**

---

## ✅ Verify Deployment

1. **Test Backend API**
   ```
   https://your-backend-url.onrender.com/api/tables
   ```
   Should return a JSON array of table names.

2. **Test Frontend**
   - Open your frontend URL
   - Verify the dashboard loads with data

---

## ⚠️ Important Notes

### Cold Starts (Free Tier)

Free web services on Render **spin down after 15 minutes of inactivity**. The first request after spin-down may take 30-60 seconds.

> **Tip:** Upgrade to a paid plan ($7/month) to keep the service always-on.

### Database Limitations

The current setup uses an **in-memory SQLite database**:

| Behavior | Impact |
|----------|--------|
| Data resets on deploy | Demo data is restored |
| Data resets on restart | Same as above |
| Read-only is fine | Perfect for dashboards |

### Upgrade to PostgreSQL (Optional)

For persistent data, migrate to Render's free PostgreSQL:

1. Go to **New** → **PostgreSQL**
2. Create a free database
3. Modify backend to use `pg` package
4. Update connection string via environment variable

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend shows "Failed to load data" | Check `REACT_APP_API_URL` is correct |
| Backend 500 errors | Check logs in Render dashboard |
| CORS errors | Backend already has CORS enabled |
| Slow first load | Cold start on free tier (wait 30-60s) |

---

## 📁 Optional: One-Click Deploy with render.yaml

Create `render.yaml` in your repo root for Blueprint deployment:

```yaml
services:
  - type: web
    name: onasi-bi-backend
    runtime: node
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: PORT
        value: 4000

  - type: web
    name: onasi-bi-frontend
    runtime: static
    rootDir: frontend
    buildCommand: npm install && npm run build
    staticPublishPath: build
    envVars:
      - key: REACT_APP_API_URL
        fromService:
          name: onasi-bi-backend
          type: web
          property: host
```

Then go to **Blueprints** in Render and connect your repo.

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/deploy-node-express-app)
- [Render Static Sites Guide](https://render.com/docs/static-sites)
- [Render Free Tier Details](https://render.com/docs/free)

---

**Happy Deploying! 🎉**
