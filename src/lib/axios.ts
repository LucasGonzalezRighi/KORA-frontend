import axios from 'axios';

/**
 * Cliente HTTP del navegador. Apunta siempre al BFF (`/api/...`), nunca al
 * backend NestJS. Toda llamada saliente del cliente pasa por acá.
 */
export const apiClient = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

/**
 * Cliente server-to-server. Solo se instancia dentro de Route Handlers —
 * lee `BACKEND_URL`, que no está expuesta al bundle del cliente.
 */
export function createBackendClient() {
  const baseURL = process.env.BACKEND_URL;

  if (!baseURL) {
    throw new Error('Falta BACKEND_URL en el entorno del servidor.');
  }

  const token = process.env.BACKEND_TOKEN;

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    timeout: 15_000,
  });
}
