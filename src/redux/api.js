import { create } from 'apisauce';

function headersWithAuth(auth = true) {
  if (!auth) return {};
  const accessToken = localStorage.getItem('tokenInfo');
  if (accessToken) {
    return { Authorization: accessToken };
  }
  return {};
}

export const api = create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'X-API-KEY': 'hPxNDa3xsJ1iUQGmhHWEJ8bA6QGxQJZg2tHYFiCw',
    Accept: 'application/vnd.github.v3+json',
    ...headersWithAuth(true),
  },
});
