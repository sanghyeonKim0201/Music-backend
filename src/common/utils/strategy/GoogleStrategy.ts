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
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube',
      ],
      // response_type: 'code',
      // access_type: 'offline',
      // prompt: 'consent',
    });
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent',
      response_type: 'code',
    };
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails, photos } = profile;

    const info = {
      id,
      first_name: name.givenName,
      last_name: name.familyName,
      email: emails[0].value,
      picture: photos[0].value,
    };

    const token: { accessToken: string; refreshToken?: string } = {
      accessToken,
    };
    if (refreshToken) {
      token.refreshToken = refreshToken;
    }
    console.log(token);
    return { info, token };
  }
}
