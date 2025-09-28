import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service'; // Adjust path
import { UserService } from 'src/service/user.service'; // Adjust path
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity'; // Adjust path
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { env } from 'src/env'; // Adjust path
import { LoginDto } from '../auth.dto'; // Adjust path

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            updateRefreshTokenHash: jest.fn(),
            getUserWithRefreshTokenHash: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>('UserRepository');
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should hash password, save user and return user info without password', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'plainPassword',
        profileImage: 'image.png',
        description: 'desc',
        name: 'Test User'
      };

      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

      const createdUser = {
        id: 'user-id',
        ...createUserDto,
        password: hashedPassword,
      };
      jest.spyOn(userRepository, 'create').mockReturnValue(createdUser as any);
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser as any);

      const result = await service.register(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
            expect(userRepository.create).toHaveBeenCalledWith({ ...createUserDto, password: hashedPassword });
      expect(userRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual({
        id: createdUser.id,
        email: createdUser.email,
        profileImage: createdUser.profileImage,
        description: createdUser.description,
        name: createdUser.name
      });
    });
  });

  describe('validateUser', () => {
    const email = 'test@example.com';
    const password = 'plainPassword';
    const hashedPassword = 'hashedPassword';

    it('should return user if email exists and password matches', async () => {
      const user = {
        id: 'user-id',
        email,
        password: hashedPassword,
      };
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validateUser(email, password);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const user = {
        id: 'user-id',
        email,
        password: hashedPassword,
      };
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should sign tokens, hash refresh token, update user and return tokens', async () => {
      const user = {
        id: 'user-id',
        email: 'test@example.com',
      };
      const accessToken = 'access-token';
      const refreshToken = 'refresh-token';
      const refreshTokenHash = 'hashed-refresh-token';

      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) => {
        if (options?.secret === env.JWT_SECRET) return accessToken;
        if (options?.secret === env.JWT_REFRESH_SECRET) return refreshToken;
        return '';
      });
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(refreshTokenHash);
      const updateSpy = jest.spyOn(userService, 'updateRefreshTokenHash').mockResolvedValue();

      const result = await service.login({ ...user, email: user.email } as any);

      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(bcrypt.hash).toHaveBeenCalledWith(refreshToken, 10);
      expect(updateSpy).toHaveBeenCalledWith(user.id, refreshTokenHash);
      expect(result).toEqual({ accessToken, refreshToken });
    });
  });

  describe('refreshTokens', () => {
    const userId = 'user-id';
    const email = 'test@example.com';
    const currentRefreshToken = 'current-refresh-token';
    const refreshTokenHash = 'hashed-refresh-token';

    const decodedRequest = {
      user: {
        user_id: userId,
        refreshToken: currentRefreshToken,
      },
    } as any;

    it('should throw UnauthorizedException if user or refreshTokenHash not found', async () => {
      jest.spyOn(userService, 'getUserWithRefreshTokenHash').mockResolvedValue(null);

      await expect(service.refreshTokens(decodedRequest)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if refresh token is invalid', async () => {
      jest.spyOn(userService, 'getUserWithRefreshTokenHash').mockResolvedValue({
        id: userId,
        email,
        refreshTokenHash: 'some-hash',
      } as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.refreshTokens(decodedRequest)).rejects.toThrow(UnauthorizedException);
    });

    it('should generate new tokens, update refresh token hash and return tokens if valid', async () => {
      const newAccessToken = 'new-access-token';
      const newRefreshToken = 'new-refresh-token';
      const newRefreshTokenHash = 'new-refresh-token-hash';

      jest.spyOn(userService, 'getUserWithRefreshTokenHash').mockResolvedValue({
        id: userId,
        email,
        refreshTokenHash,
      } as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) => {
        if (options?.secret === env.JWT_SECRET) return newAccessToken;
        if (options?.secret === env.JWT_REFRESH_SECRET) return newRefreshToken;
        return '';
      });
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(newRefreshTokenHash);
      const updateSpy = jest.spyOn(userService, 'updateRefreshTokenHash').mockResolvedValue();

      const result = await service.refreshTokens(decodedRequest);

      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(bcrypt.hash).toHaveBeenCalledWith(newRefreshToken, 10);
      expect(updateSpy).toHaveBeenCalledWith(userId, newRefreshTokenHash);
      expect(result).toEqual({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  });

  describe('logout', () => {
    it('should call updateRefreshTokenHash with null', async () => {
      const userId: string = 'user-id';
      const updateSpy = jest.spyOn(userService, 'updateRefreshTokenHash').mockResolvedValue();

      await service.logout(userId);

      expect(updateSpy).toHaveBeenCalledWith(userId, null);
    });
  });
});
