import { Request, Response } from 'express';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('google/login')
  @ApiOperation({ summary: 'google login api' })
  @UseGuards(AuthGuard('google'))
  handleLogin() {}

  @Get('google/redirect')
  @ApiOperation({ summary: 'redirect API' })
  @UseGuards(AuthGuard('google'))
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    //@ts-expect-error type에러
    await this.authService.validateUser(req.user.info);
    //@ts-expect-error type에러
    const accessToken = this.authService.generateAccessToken(req.user.info);
    const refreshToken = await this.authService.generateRefreshToken(
      //@ts-expect-error type에러
      req.user.info,
    );
    //app 일 경우
    // res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.redirect('http://localhost:3000/');
  }
  @Get('/refresh')
  @ApiOperation({ summary: 'accessToken refresh' })
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const newAccessToken = await this.authService.refrehsValidate(
        req.cookies.refreshToken,
      );
      res.cookie('accessToken', newAccessToken, { httpOnly: true });
      res.send();
    } catch (error) {
      await this.logout(req, res);
    }
  }
  @Get('google/logout')
  @ApiOperation({ summary: 'google logout API' })
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.logout(req.cookies.refreshToken);
    } catch (error) {
    } finally {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.redirect('https://accounts.google.com/logout');
    }
  }
}
