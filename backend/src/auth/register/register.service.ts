import { Injectable, ConflictException } from "@nestjs/common";
import { MailerService } from "src/shared/mail/mailer.service";
import { IFetchUser } from "src/types/user.types";
import { UserDTO } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";
import { InjectModel } from "@nestjs/mongoose";
import { VerificationCode } from "../entity/verification-code.model";
import { Model } from "mongoose";

@Injectable()
export class RegisterService {
    constructor(
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
        @InjectModel(VerificationCode.name) private readonly verificationCodeModel: Model<VerificationCode>
    ) { }
    async RegisterUser(user: UserDTO): Promise<IFetchUser> {
        const userExist = await this.userService.findByEmail(user.email);
        if (userExist) {
            throw new ConflictException('user already exists!');
        }
        const savedUser = await this.userService.CreateUser(user);
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const savedCode = new this.verificationCodeModel({userId: savedUser._id, verificationCode: code});
        await savedCode.save();
        await this.mailerService.sendMail(user, code);
        return savedUser;
    }
}