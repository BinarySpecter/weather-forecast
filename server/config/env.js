import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const parseOrigins = (value) =>
  (value || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number.parseInt(process.env.PORT, 10) || 5000,
  openWeatherApiKey: (process.env.OPENWEATHER_API_KEY || '').trim(),
  openWeatherBaseUrl: 'https://api.openweathermap.org/data/2.5',
  allowedOrigins: parseOrigins(process.env.CLIENT_ORIGIN),
  requestTimeoutMs: Number.parseInt(process.env.REQUEST_TIMEOUT_MS, 10) || 10000,
};

export const isProduction = config.nodeEnv === 'production';
