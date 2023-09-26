import { Controller, Post, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';

export interface IVerification {
    userId: string,
    verificationCode: string
}

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }
    @Post(':id/verify')
    async VerifyUser(@Param('id') id: any, @Body() verification:  IVerification) {
        return await this.userService.VerifyUser(id, verification);
    }
}
