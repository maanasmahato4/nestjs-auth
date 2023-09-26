import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth.module";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { UserModule } from "src/user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenSchema } from "../entity/refresh-token.model";
import { LocalStrategy } from "../strategy/local.strategy";

@Module({
    imports: [UserModule, forwardRef(() => AuthModule),
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }])
    ],
    controllers: [LoginController],
    providers: [LoginService, LocalStrategy]
})

export class LoginModule { };