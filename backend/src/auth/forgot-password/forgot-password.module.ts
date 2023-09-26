import { Module } from "@nestjs/common";
import { ForgotPasswordController } from "./forgot-password.controller";
import { ForgotPasswordService } from "./forgot-password.service";
import { MailerService } from "src/shared/mail/mailer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { VerificationCode, VerificationCodeSchema } from "../entity/verification-code.model";

@Module({
    imports: [MongooseModule.forFeature([{name: VerificationCode.name, schema: VerificationCodeSchema}])],
    controllers: [ForgotPasswordController],
    providers: [ForgotPasswordService, MailerService]
})

export class ForgotPasswordModule {};