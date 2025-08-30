// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './health/health.controller';
import { databaseConfig } from './config/database.config';
import { frontendConfig } from './config/frontend.config';
import { UserModule } from './users/user.module';
import { TaskModule } from './tasks/task.module';
import { NoteModule } from './notes/note.module';
import { EventStoreModule } from './shared/infrastructure/event-store/event-store.module';
import { AuthModule } from './auth/auth.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, frontendConfig],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        ...configService.get('database.options'),
      }),
      inject: [ConfigService],
    }),
    EventStoreModule,
    UserModule,
    TaskModule,
    NoteModule,
    AuthModule,
    CalendarModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }