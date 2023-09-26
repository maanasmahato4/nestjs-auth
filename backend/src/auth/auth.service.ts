import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import { IFetchUser } from 'src/types/user.types';
import { UserService } from 'src/user/user.service';
import { Request, Response } from "express";
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './entity/refresh-token.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>
    ) { }
    async ValidateUser(user: any) {
        const userExist = await this.userService.findByEmail(user.email);
        if (!userExist || !(this.bcryptService.compare(user.password, userExist.password))) {
            throw new NotFoundException("user does not exist");
        }
        else if (userExist.isVerified == false) {
            throw new NotFoundException("user is not verified")
        }
        const { password, ...result } = userExist;
        return result;
    }

    async RefreshToken(req: Request) {
        const cookies = req.cookies;
        if (!cookies?.jwt) throw new UnauthorizedException();
        const data = this.jwtService.decode(cookies?.jwt);
        if (typeof data === 'object' && data !== null) {
            const refreshTokenExist = await this.refreshTokenModel.findOne({ userId: data.userId });
            if (refreshTokenExist) {
                const user = await this.userService.findByID(refreshTokenExist.userId);
                return await this.GenerateAccessToken(user);
            }
        }
    }

    async GenerateAccessToken(user: IFetchUser) {
        const token = this.jwtService.sign({
            userInfo: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, { expiresIn: '10s' });
        return { access_token: token };
    }

    async GenerateRefreshToken(user: IFetchUser) {
        const refreshTokenExist = await this.refreshTokenModel.findOne({ userId: user._id });
        if (refreshTokenExist) {
            await this.refreshTokenModel.findOneAndDelete({ userId: user._id });
        }
        const token = this.jwtService.sign({ userId: user._id }, { expiresIn: '86400s' });
        return token;
    }


    async SignOut(req: Request, res: Response) {
        const cookie = req.cookies;
        if (!cookie?.jwt) throw new NotFoundException("jwt token not found!");
        const data = this.jwtService.decode(cookie?.jwt);
        if (typeof data === "object" && data !== null) {
            await this.refreshTokenModel.findOneAndDelete({ userId: data.userId });
        }
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none', });
        res.status(200).json({ message: "cookie cleared" });
    }

}
