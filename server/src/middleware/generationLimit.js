const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const attempts = new Map();

export function generationLimit(request, response, next) {
  const now = Date.now();
  const key = request.ip || request.socket.remoteAddress || 'unknown';
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return response.status(429).json({ success: false, message: 'Too many case requests. Please wait a minute and try again.' });
  recent.push(now);
  attempts.set(key, recent);
  return next();
}
