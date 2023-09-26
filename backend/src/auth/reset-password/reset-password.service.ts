import { Injectable } from "@nestjs/common";
import { LoginDTO } from "../login/dto/login.dto";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { BcryptService } from "src/shared/hashing/bcrypt.service";

@Injectable()
export class ResetPasswordService {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly bcryptService: BcryptService
    ) { }
    async VerifyUser(user: LoginDTO) {
        return await this.VerifyUser(user);
    }

    async ResetPassword(resetData: any) {
        const hashedPass = await this.bcryptService.hash(resetData.password);
        return await this.ResetPassword({ userId: resetData.user._id, password: hashedPass });
    }
}