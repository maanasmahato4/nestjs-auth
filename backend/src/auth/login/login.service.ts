import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RefreshToken } from "../entity/refresh-token.model";
import { Response } from "express";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class LoginService {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>
    ) { }

    async SignIn(user: LoginDTO, res: Response) {
        const userExist = await this.userService.findByEmail(user.email);
        if (!userExist) {
            throw new NotFoundException("user not found!");
        }
        const [access_token, refresh_token] = await Promise.all([this.authService.GenerateAccessToken(userExist), this.authService.GenerateRefreshToken(userExist)]);
        const userRefreshToken = new this.refreshTokenModel({ userId: userExist._id, refresh_token: refresh_token });
        await userRefreshToken.save();
        res.cookie('jwt', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json(access_token);
    }
}