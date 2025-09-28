import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { UserService } from "src/service/user.service";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "src/dto/user.dto";
import * as bcrypt from 'bcrypt';
import { env } from "src/env";
import { DecodedRequest, UserResponse } from "src/types";
import { LoginDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      image: savedUser.image,
      name: savedUser.name,
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return user;
    }

    return null
  }

  async login(user: LoginDto & { id: string }) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(req: DecodedRequest) {
    const {_id, refreshToken: currentRefreshToken } = req.user;
    const user = await this.userService.getUserWithRefreshTokenHash(_id);

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token is invalid or user not found');
    }

    const isRefreshTokenValid = await bcrypt.compare(currentRefreshToken, user.refreshTokenHash);
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { email: user.email, sub: user.id };
    const newAccessToken = this.jwtService.sign(payload, {
      secret: env.JWT_SECRET,
      expiresIn: '15m',
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await this.userService.updateRefreshTokenHash(_id, newRefreshTokenHash);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(user_id: string): Promise<void> {
    await this.userService.updateRefreshTokenHash(user_id, null);
  }
}
