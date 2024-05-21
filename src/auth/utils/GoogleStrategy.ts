import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8080/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    // console.log(user);

    return user;
  }
}
