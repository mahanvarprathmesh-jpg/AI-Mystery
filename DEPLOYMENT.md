# Deploy AI Mystery Room

This repository is configured for a split deployment: the React/Vite client on Vercel, the Express API on Render, and MongoDB Atlas for storage. Gemini calls stay on the API server.

## 1. Keep credentials out of Git

- Put local credentials in `server/.env` only.
- Do not put a real key in `.env.example`; it is a committed template.
- `server/.env1` is ignored and must remain untracked. The server loads `.env`, not `.env1`.
- If a real Gemini or MongoDB credential was ever committed or pushed, rotate it before deployment.

## 2. Push the deployment configuration

Commit and push the project files, including `render.yaml`, `vercel.json`, and `DEPLOYMENT.md`. Confirm `git status` does not list `.env`, `.env1`, or any other credential file.

## 3. Create the MongoDB Atlas database

1. Create an Atlas project and database deployment.
2. Create a database user with access to the application database. This is separate from your Atlas website login.
3. Copy the application connection string and replace its username, password, and database name as needed. Special characters in a password must be URL encoded.
4. Add the Render service's outbound IP ranges to the Atlas project IP access list. You can find the ranges in the Render service's **Connect → Outbound** panel after creating the API service. Keep the database restricted to the required ranges; do not use `0.0.0.0/0` for production.

## 4. Deploy the API to Render

1. In Render, create a Blueprint from the GitHub repository and use the root `render.yaml`, or create a Web Service manually with the repository root as its root directory.
2. For a manual service, use:
   - Build command: `npm install`
   - Start command: `npm run start --workspace server`
   - Health check path: `/api/health`
3. Set the service environment variables in Render:
   - `NODE_ENV=production`
   - `MONGODB_URI` = the Atlas connection string
   - `GEMINI_API_KEY` = your server-side Gemini API key
   - `GEMINI_MODEL=gemini-3.5-flash-lite`
   - `CLIENT_URL` = the Vercel production URL (add additional trusted origins as comma-separated values if needed)
4. Deploy and note the API URL, for example `https://ai-mystery-room-api.onrender.com`.

The server listens on Render's `PORT` and binds to `0.0.0.0`. Missing `MONGODB_URI` stops production startup rather than leaving a nonfunctional API running.

## 5. Deploy the client to Vercel

1. Import the same GitHub repository as a Vercel project.
2. Keep the project root directory at `.` so Vercel can use the npm workspace and root lockfile. `vercel.json` sets the Vite build command and `client/dist` output directory.
3. Add the client build environment variable `VITE_API_URL` with the API base URL, including `/api`; for example `https://ai-mystery-room-api.onrender.com/api`.
4. Deploy and copy the Vercel production URL.

If you create a preview deployment, add its exact origin to Render's `CLIENT_URL` list if the preview needs to call the API.

## 6. Set the production CORS origin and redeploy

Update Render's `CLIENT_URL` to the exact Vercel production origin, such as `https://ai-mystery-room.vercel.app` (no trailing path). Save and redeploy the API.

## 7. Verify the deployment

1. Open `https://<render-service>.onrender.com/api/health`; the response should report the database as `connected`.
2. Open the Vercel URL and create a small fictional case.
3. Check that evidence loads, an accusation submits once, and the results page reveals the solution.
4. Refresh a nested case or results URL to confirm Vercel's SPA rewrite works.

`VITE_API_URL` is compiled into the public frontend bundle, so it must contain only the public API URL. Never place `GEMINI_API_KEY` or `MONGODB_URI` in a `VITE_` variable or in Vercel's client environment.
