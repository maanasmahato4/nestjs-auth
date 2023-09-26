import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Get('refresh')
    async RefreshUserToken(@Req() req: Request) {
        const token = await this.authService.RefreshToken(req);
        return token;
    }

    @Post('signout')
    async SignOut(@Req() req: Request, @Res() res: Response){
        return await this.authService.SignOut(req, res);
    }
}
