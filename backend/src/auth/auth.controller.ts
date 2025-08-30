import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        return { message: 'Redirecting to Google OAuth' };
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any, @Res() res: any) {
        const user = req.user;
        const token = await this.authService.signToken(user);
        res.redirect(`${this.configService.get<string>('FRONTEND_URL')}/auth/callback?token=${token.accessToken}`);
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