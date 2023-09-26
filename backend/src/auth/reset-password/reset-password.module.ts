import { Module, forwardRef } from "@nestjs/common"
import { ResetPasswordController } from "./reset-password.controller";
import { ResetPasswordService } from "./reset-password.service";
import { AuthModule } from "../auth.module";
import { UserModule } from "src/user/user.module";
import { BcryptService } from "src/shared/hashing/bcrypt.service";

@Module({
    imports: [UserModule, forwardRef(() => AuthModule)],
    controllers: [ResetPasswordController],
    providers: [ResetPasswordService, BcryptService]
})

export class ResetPasswordModule {}
