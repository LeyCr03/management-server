import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import { LoginDto, RefreshTokenDto, TokensDto } from './auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponse } from 'src/dto/user.dto';
import { UserResponse } from 'src/types';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: "Create new user" })
  @ApiResponse({ status: 201, description: 'User created successfully.', type: CreateUserResponse })
  @ApiResponse({ status: 400, description: 'Error.' })
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK) 
  @ApiOperation({ summary: 'Authenticate user and get access and refresh tokens' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully.', type: TokensDto })
  @ApiResponse({ status: 401, description: 'Unauthorized credentials.' })
  async login(@Request() req): Promise<TokensDto> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiBody({ type: RefreshTokenDto }) 
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.', type: TokensDto })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token.' })
  async refreshTokens(@Request() req): Promise<TokensDto> {
    return this.authService.refreshTokens(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Logout user and invalidate refresh token' })
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async logout(@Request() req) {
    await this.authService.logout(req.user.user_id);
    return { message: 'Logged out successfully' };
  }
}