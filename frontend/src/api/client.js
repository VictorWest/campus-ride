// A thin wrapper around fetch so every call doesn't repeat
// the same base URL, headers, and JSON-parsing boilerplate.
const API_BASE_URL = 'http://localhost:3000';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (data && data.error) || 'Something went wrong';
    throw new Error(message);
  }

  return data;
}

export function registerUser({ name, email, password }) {
  return request('/auth/register', { method: 'POST', body: { name, email, password } });
}

export function loginUser({ email, password }) {
  return request('/auth/login', { method: 'POST', body: { email, password } });
}

export function fetchCurrentUser(token) {
  return request('/auth/me', { token });
}

export function fetchRides(token) {
  return request('/rides', { token });
}
