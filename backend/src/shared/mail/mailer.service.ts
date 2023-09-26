import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { UserDTO } from "src/user/dto/user.dto";

@Injectable()
export class MailerService {
    private readonly logger = new Logger(MailerService.name);
    private readonly transporter: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 123,
            secure: true,
            auth: {
                user: "",
                pass: ""
            }
        })
    }

    async sendMail(user: UserDTO, text: string) {
        const info = await this.transporter.sendMail({
            from: "Maanas Mahato <>",
            to: user.email,
            subject: "Email Verification",
            text: text
        })

        return this.logger.log("message sent: ", info.messageId)
    }
}