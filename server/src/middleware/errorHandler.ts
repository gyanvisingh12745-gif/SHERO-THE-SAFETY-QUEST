import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode || (err.status && typeof err.status === 'number' ? err.status : 500);
  const message = err.message || 'Internal Server Error';

  console.error(`[API Error ${statusCode}]`, err);

  res.status(statusCode).json({
    success: false,
    error: message,
    details: err.details || undefined,
    timestamp: new Date().toISOString()
  });
}
