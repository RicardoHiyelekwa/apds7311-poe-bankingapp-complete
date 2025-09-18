require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const connectDB = require('./db');

connectDB();

const authRoutes = require('./routes/auth');
const txRoutes = require('./routes/transactions');

if(!process.env.JWT_SECRET){
  process.env.JWT_SECRET = crypto.randomBytes(64).toString('hex');
  console.log('⚠️ JWT_SECRET not set. Generated random secret for this process.');
}

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL || true, credentials: true }));

const authLimiter = rateLimit({ windowMs:15*60*1000, max:10 });
app.use('/api/auth', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/transactions', txRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('API listening on', port));
