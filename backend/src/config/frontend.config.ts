import { registerAs } from '@nestjs/config';

export const frontendConfig = registerAs('web-app', () => ({
    frontendApp: process.env.FRONTEND_URL || 'http://localhost:3000',
}));