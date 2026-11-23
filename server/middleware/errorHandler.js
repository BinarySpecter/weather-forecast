import { AppError } from '../utils/AppError.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `No API route matches ${req.method} ${req.originalUrl}.`,
    },
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error?.type === 'entity.parse.failed' || (error instanceof SyntaxError && error.status === 400)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'The request body is not valid JSON.',
      },
    });
  }

  const isOperational = error instanceof AppError;
  const statusCode = isOperational ? error.statusCode : 500;
  const code = isOperational ? error.code : 'INTERNAL_SERVER_ERROR';
  const message = isOperational
    ? error.message
    : 'Something went wrong on our side. Please try again in a moment.';

  if (statusCode >= 500) {
    console.error(`[error] ${req.method} ${req.originalUrl} -> ${statusCode} ${code}: ${error?.message}`);
    console.error(error?.stack);
  } else {
    console.warn(`[warn] ${req.method} ${req.originalUrl} -> ${statusCode} ${code}: ${error?.message}`);
  }

  const payload = {
    success: false,
    error: { code, message },
  };

  if (isOperational && error.details) {
    payload.error.details = error.details;
  }

  return res.status(statusCode).json(payload);
}
