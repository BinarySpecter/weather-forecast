import express from 'express';
import cors from 'cors';

import { config } from './config/env.js';
import weatherRoutes from './routes/weatherRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { AppError } from './utils/AppError.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new AppError(403, 'This origin is not allowed to access the API.', 'CORS_FORBIDDEN'));
    },
    methods: ['GET', 'OPTIONS'],
    maxAge: 86400,
  })
);

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      environment: config.nodeEnv,
      weatherApiConfigured: Boolean(config.openWeatherApiKey),
      uptimeSeconds: Math.round(process.uptime()),
    },
  });
});

app.use('/api', weatherRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

if (!config.openWeatherApiKey) {
  console.warn(
    '[warn] OPENWEATHER_API_KEY is not set. Weather endpoints will respond with 503 until it is configured.'
  );
}

const server = app.listen(config.port, () => {
  console.log(`[server] Weather API listening on http://localhost:${config.port}`);
  console.log(`[server] Environment: ${config.nodeEnv}`);
  console.log(`[server] Allowed client origins: ${config.allowedOrigins.join(', ')}`);
});

const shutdown = (signal) => {
  console.log(`[server] ${signal} received, shutting down gracefully.`);
  server.close(() => process.exit(0));
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
