# AI Mystery Room

An AI-powered detective game built with React, Express, MongoDB, and Gemini. Cases and evidence are fictional entertainment.

## Prerequisites

- Node.js 20 or newer and npm
- MongoDB (local or hosted)
- A Gemini API key for case generation (added in a later implementation phase)

## Setup

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
2. Run `npm install` from the project root.
3. Run `npm run dev` to start the API on port 5000 and Vite on port 5173.

The API health endpoint is `http://localhost:5000/api/health`.

## Implementation status

- Phase 1: React/Vite and Express/Mongoose foundations, environment configuration, database connection, and frontend-to-backend health check.
- Case creation: Gemini-backed case generation, server-side case validation/storage, and a private session token for retrieving the generated investigation.
- Investigation view: Generated suspects, evidence categories, evidence detail viewer, and case timeline.
- Accusation/results: One final accusation is checked and recorded by the backend; the solution and supporting evidence are revealed after submission.
- Remaining work: stronger API hardening, image-provider integration, and phase-by-phase acceptance checks.

Set `GEMINI_API_KEY` in `server/.env` and ensure MongoDB is available before generating cases. The culprit and full solution are stored server-side and are omitted from the public case response. Evidence marked as an image is a text description; actual image generation is not configured yet.

See `spec.md` for the product requirements and acceptance criteria.
