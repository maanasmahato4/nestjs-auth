import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MailerService } from "src/shared/mail/mailer.service";
import { VerificationCode } from "../entity/verification-code.model";
import { Model } from "mongoose";

@Injectable()
export class ForgotPasswordService {
    constructor(
        private readonly mailer: MailerService,
        @InjectModel(VerificationCode.name) private readonly verificationCodeModel: Model<VerificationCode>
    ) { }
    async SendCode(user: any) {
        const codeWithThisUserIdExist = await this.verificationCodeModel.findOne({userId: user._id});
        if(codeWithThisUserIdExist){
            await this.verificationCodeModel.findOneAndDelete({userId: user._id});
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const savedCode = new this.verificationCodeModel({ userId: user._id, verificationCode: code });
        await savedCode.save();
        await this.mailer.sendMail(user, code);
    }

    // this part is incomplete
}