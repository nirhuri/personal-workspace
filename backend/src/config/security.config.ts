// src/config/security.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    corsOrigin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));