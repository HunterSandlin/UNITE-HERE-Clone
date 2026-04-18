const BASE_URL = '/api';

export async function register({ username, email, password }) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || JSON.stringify(data));
  }

  return data; 
}

export async function login({ username, password }) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return data; 
}

export async function getProfile(token) {
  const res = await fetch(`${BASE_URL}/profile/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }

  return data;
}