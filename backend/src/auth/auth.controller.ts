import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        return { message: 'Redirecting to Google OAuth' };
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any) {
        const user = req.user;
        const token = await this.authService.signToken(user);
        return { user, ...token };
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async profile(@Req() req: any) {
        return req.user;
    }

    @Get('logout')
    async logout() {
        return { success: true, message: 'Logged out' };
    }

    @Get('refresh')
    @UseGuards(AuthGuard('jwt'))
    async refresh(@Req() req: any) {
        const token = await this.authService.signToken({ id: req.user.userId, email: req.user.email, name: req.user.name } as any);
        return token;
    }
} 