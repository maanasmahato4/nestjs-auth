import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ResetPasswordService } from "./reset-password.service";
import { LoginDTO } from "../login/dto/login.dto";

@Controller('reset-password')
export class ResetPasswordController {
    constructor(
        private readonly resetPasswordService: ResetPasswordService
    ) { }

    @Post("")
    async VerifyUser(@Body() user: LoginDTO) {
        return await this.resetPasswordService.VerifyUser(user);
    }

    @Post("/new")
    async ResetPassword(@Body() resetData: any){
        return await this.resetPasswordService.ResetPassword(resetData);
    }
}