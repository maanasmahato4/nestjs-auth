import { Module } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { UserModule } from "src/user/user.module";
import { RegisterController } from "./register.controller";
import { MailerService } from "src/shared/mail/mailer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { VerificationCode, VerificationCodeSchema } from "../entity/verification-code.model";

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: VerificationCode.name, schema: VerificationCodeSchema }])],
    controllers: [RegisterController],
    providers: [RegisterService, MailerService]
})
export class RegisterModule { }