import { AuthRepository } from './repository/auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AccessTokenDTO } from './dto/token/access-token.dto';
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(user: AccessTokenDTO): Promise<boolean> {
    const result = await this.authRepository.findById(user.id);
    // 유저에 관한 검증 로직 추가 할 거 있으면 여기다가

    if (!result) {
      await this.authRepository.createUser(user);
    }
    return true;
  }
  async saveGoogleToken(payload: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  }) {
    await this.authRepository.upsertGoogle(payload);
  }
  generateAccessToken(accessTokenDTO: AccessTokenDTO): string {
    const payload = accessTokenDTO;
    return this.jwtService.sign(payload);
  }
  async generateRefreshToken(accessTokenDTO: AccessTokenDTO): Promise<string> {
    const payload = { userId: accessTokenDTO.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });

    const saltRounds = 10;
    const currentRefreshToken = await bcrypt.hash(refreshToken, saltRounds);

    await this.authRepository.upsertToken({
      user_id: payload.userId,
      refresh_token: currentRefreshToken,
    });

    return refreshToken;
  }
  async refrehsValidate(refreshToken: string): Promise<string> {
    const verifyToken = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
    });

    const userId = verifyToken.userId;

    const token = await this.authRepository.findTokenByUserId(userId);

    const compare = await bcrypt.compare(refreshToken, token.refresh_token);
    if (!compare) {
      throw new UnauthorizedException('refresh token error');
    }
    const payload = await this.authRepository.findById(userId);
    // const googleAccessToken =
    //   await this.authRepository.findGoogleTokenById(userId);
    // const accessToken = this.generateAccessToken({
    //   ...payload,
    //   accessToken: googleAccessToken,
    // });
    const accessToken = this.generateAccessToken(payload);
    return accessToken;
  }
  async logout(refreshToken: string) {
    const verifyToken = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
    });
    const userId = verifyToken.userId;
    await this.authRepository.deleteGoogleToken(userId);
    await this.authRepository.deleteToken(userId);
  }
}
