import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @Inject('UserRepository') private readonly userRepository: UserRepository,
    ) { }

    async validateGoogleUser(profile: {
        id: string;
        emails?: { value: string }[];
        displayName?: string;
        photos?: { value: string }[];
    }): Promise<User> {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || 'Unknown';
        const picture = profile.photos?.[0]?.value;

        let user = await this.userRepository.findByGoogleId(profile.id);
        if (!user) {
            if (!email) {
                throw new UnauthorizedException('Email is required from Google profile');
            }
            user = User.create(email, name, profile.id, picture);
            await this.userRepository.save(user);
        }

        return user;
    }

    async signToken(user: User): Promise<{ accessToken: string }> {
        const payload = { sub: user.id, email: user.email, name: user.name };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '1d',
        });
        return { accessToken };
    }
} 