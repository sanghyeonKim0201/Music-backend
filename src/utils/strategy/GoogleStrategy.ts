import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8080/api/auth/google/redirect',
      scope: ['email', 'profile'],
      accessType: 'offline',
      prompt: 'consent',
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails, photos } = profile;

    const info = {
      id,
      first_name: name.givenName,
      last_name: name.familyName,
      email: emails[0].value,
      picture: photos[0].value,
      token: accessToken,
    };
    console.log(accessToken);
    const token = {
      accessToken,
      refreshToken,
    };
    return { info, token };
  }
}
