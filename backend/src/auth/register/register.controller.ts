import {Controller, Post, Body, HttpException, HttpStatus} from "@nestjs/common";
import { RegisterService } from "./register.service";
import { UserDTO } from "src/user/dto/user.dto";

@Controller('register')
export class RegisterController {
    constructor(
        private readonly registerService: RegisterService
    ){}
    @Post('new')
    async RegisterUser(@Body() user: UserDTO){
        try {
            return await this.registerService.RegisterUser(user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}