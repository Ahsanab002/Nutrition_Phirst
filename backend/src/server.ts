import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import adminRoutes from './routes/adminRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import { startStatsUpdateJob } from './jobs/updateProductStats';
import fs from 'fs';
import sharp from 'sharp';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Add compression middleware for better performance
app.use(compression({
  level: 6, // Compression level (0-9)
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req: express.Request, res: express.Response) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Configure helmet but allow cross-origin resource loads for images and other assets
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
// Configure CORS to allow multiple frontend URLs
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',');

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests, or file:// protocol)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port
    if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
      return callback(null, true);
    }
    
    // Allow file:// protocol for local HTML files
    if (origin.startsWith('file://')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-local-admin']
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static images with proper decoding for spaces in filenames
// Use the same origin logic as the main CORS middleware so we don't return a wildcard origin when credentials are enabled
const imagesOriginChecker = (origin: any, callback: any) => {
  // Allow requests with no origin (local files, curl, etc.)
  if (!origin) return callback(null, true);

  // Allow localhost on any port
  if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
    return callback(null, true);
  }

  // Allow file:// protocol for local HTML files
  if (origin.startsWith('file://')) {
    return callback(null, true);
  }

  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  } else {
    console.log(`CORS blocked origin for images: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  }
};

app.use('/images', cors({ origin: imagesOriginChecker, credentials: true, methods: ['GET'], allowedHeaders: ['Content-Type'] }), (req, res, next) => {
  // Decode the URL to handle spaces and special characters
  req.url = decodeURIComponent(req.url);
  next();
}, express.static(path.join(__dirname, '../Images'), {
  // Add cache headers and other options for better performance
  maxAge: '7d', // Cache for 7 days
  etag: true,
  lastModified: true,
  immutable: true
}));

// Also serve images at /backend/Images path to match frontend expectations
app.use('/backend/Images', cors({ origin: imagesOriginChecker, credentials: true, methods: ['GET'], allowedHeaders: ['Content-Type'] }), (req, res, next) => {
  // Decode the URL to handle spaces and special characters
  req.url = decodeURIComponent(req.url);
  next();
}, express.static(path.join(__dirname, '../Images'), {
  // Add cache headers and other options for better performance
  maxAge: '7d', // Cache for 7 days
  etag: true,
  lastModified: true,
  immutable: true
}));

// On-demand image resizing endpoint
// Example: /img/resize?path=product.jpg&w=400&q=80
app.get('/img/resize', async (req, res) => {
  const imgPathRaw = (req.query.path as string) || '';
  const width = parseInt((req.query.w as string) || '400', 10);
  const quality = parseInt((req.query.q as string) || '80', 10);

  if (!imgPathRaw) return res.status(400).send('Missing path');

  // Decode and normalize the incoming path. Accept both '/images/...' and 'images/...'
  let relPath = decodeURIComponent(imgPathRaw);
  // strip leading slashes
  relPath = relPath.replace(/^\/+/, '');
  // if it starts with images/ remove that segment to avoid duplicate paths
  relPath = relPath.replace(/^images\/+/i, '');
  // normalize to remove ../ etc
  relPath = path.normalize(relPath);
  if (relPath.includes('..')) return res.status(400).send('Invalid path');

  const sourcePath = path.join(__dirname, '..', 'Images', relPath);
  if (!fs.existsSync(sourcePath)) return res.status(404).send('Not found');

  const cacheDir = path.join(__dirname, '..', 'Images', '.cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

  const safeKeyName = relPath.replace(/[/\\]/g, '_');
  const cacheKey = `${safeKeyName}_w${width}_q${quality}`;
  const cachedFile = path.join(cacheDir, cacheKey);

  try {
    // Check for cached webp or jpeg
    const acceptsWebP = (req.headers.accept || '').includes('image/webp');
    const ext = acceptsWebP ? '.webp' : '.jpg';
    const cachedFileWithExt = cachedFile + ext;

    if (fs.existsSync(cachedFileWithExt)) {
      res.setHeader('Content-Type', acceptsWebP ? 'image/webp' : 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // 7 days
      return fs.createReadStream(cachedFileWithExt).pipe(res);
    }

    let transformer = sharp(sourcePath).resize({ width });
    if (acceptsWebP) {
      transformer = transformer.webp({ quality });
    } else {
      transformer = transformer.jpeg({ quality });
    }
    const buffer = await transformer.toBuffer();
    fs.writeFileSync(cachedFileWithExt, buffer);
    res.setHeader('Content-Type', acceptsWebP ? 'image/webp' : 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    return res.end(buffer);
  } catch (err) {
    console.error('Image resize error', err);
    return res.status(500).send('Error processing image');
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Image test route
app.get('/test-images', (req, res) => {
  const fs = require('fs');
  const testImagePath = path.join(__dirname, '../Images/kojic jpgs/1ST.jpg');
  const imagesDir = path.join(__dirname, '../Images');
  
  res.json({
    success: true,
    testImageExists: fs.existsSync(testImagePath),
    testImagePath,
    imagesDir,
    imagesDirExists: fs.existsSync(imagesDir),
    sampleFolders: fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : []
  });
});

// Database test route to check products and images
app.get('/test-db', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const productCount = await prisma.product.count();
    const imageCount = await prisma.productImage.count();
    
    const sampleProduct = await prisma.product.findFirst({
      include: {
        images: true,
        category: true
      }
    });
    
    res.json({
      success: true,
      productCount,
      imageCount,
      sampleProduct: sampleProduct ? {
        id: sampleProduct.id,
        name: sampleProduct.name,
        slug: sampleProduct.slug,
        category: sampleProduct.category?.name,
        images: sampleProduct.images.map((img: any) => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          sortOrder: img.sortOrder
        }))
      } : null
    });
    
    await prisma.$disconnect();
  } catch (error: any) {
    console.error('Database test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// CORS test endpoint
app.get('/cors-test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CORS is working!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Admin API debug endpoint
app.get('/api/admin-debug', (req, res) => {
  const isLocalAdmin = req.headers['x-local-admin'] === 'true';
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.json({
    success: true,
    message: 'Admin debug endpoint working',
    headers: {
      'x-local-admin': req.headers['x-local-admin'],
      'authorization': req.headers.authorization ? 'present' : 'missing'
    },
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      isDevelopment,
      isLocalAdmin
    },
    adminEndpoints: [
      'GET /api/admin/dashboard/stats',
      'GET /api/admin/orders', 
      'GET /api/admin/users',
      'GET /api/admin/products',
      'GET /api/admin/categories'
    ],
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/checkout', checkoutRoutes);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Start background job for updating product stats
  startStatsUpdateJob();
});
