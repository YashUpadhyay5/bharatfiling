import express from 'express';
import cors from 'cors';
import path from 'path';
import { ENV } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import businessRoutes from './routes/business.routes.js';
import fieldRoutes from './routes/field.routes.js';
import gstRoutes from './routes/gst-registration/index.js';
import documentRoutes from './routes/document.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import caRoutes from './routes/ca.routes.js';
import supportRoutes from './routes/support.routes.js';
import adminRoutes from './routes/admin.routes.js';
import serviceRoutes from './routes/service.routes.js';

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve static uploaded documents
app.use('/uploads', express.static(ENV.STORAGE_DIR));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    platform: 'BharatFiling Indian Compliance Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount Modular API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/businesses', businessRoutes);
app.use('/api/v1/fields', fieldRoutes);
app.use('/api/v1/gst', gstRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/ca', caRoutes);
app.use('/api/v1/support', supportRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/services', serviceRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Your information is safe and saved.',
    error: ENV.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 Route Catch-all
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`,
  });
});

const PORT = ENV.PORT || 5000;
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 BharatFiling Compliance Platform API Online`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🛡️  Mode: ${ENV.NODE_ENV}`);
  console.log(`📁 Uploads: ${ENV.STORAGE_DIR}`);
  console.log(`====================================================`);
});
