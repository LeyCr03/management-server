import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../module/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { env } from 'src/env';
import { UserService } from 'src/service/user.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './strategies/local.startegy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.startegy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User,]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: env.JWT_SECRET, 
        signOptions: { expiresIn: '15m' }
      }),
    }),
  ],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy, 
  ],
  controllers: [AuthController],
  exports: [AuthService], 
})
export class AuthModule {}