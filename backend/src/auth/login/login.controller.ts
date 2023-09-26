import { Controller, Post, Body, Res, UseGuards } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDTO } from "./dto/login.dto";
import { Response } from "express";
import { LocalGuard } from "../guards/local.guard";

@Controller('signin')
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) { }

    @UseGuards(LocalGuard)
    @Post('')
    async SignIn(@Body() user: LoginDTO, @Res() res: Response) {
       return await this.loginService.SignIn(user, res);
    }
}