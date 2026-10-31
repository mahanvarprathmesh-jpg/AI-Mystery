const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, options);
  } catch {
    throw new Error('Could not reach the case archive. Check that the server is running.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'The request could not be completed.');
  return data;
}

export function generateCase(payload) {
  return request('/mysteries/generate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  });
}

export function fetchCase(id, token) {
  return request(`/mysteries/${encodeURIComponent(id)}`, { headers: { 'x-case-token': token } });
}

export function submitAccusation(id, token, payload) {
  return request(`/mysteries/${encodeURIComponent(id)}/accusation`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-case-token': token }, body: JSON.stringify(payload),
  });
}
