import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import { RegisterModule } from './register/register.module';
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenSchema } from './entity/refresh-token.model';
import { JwtModule } from "@nestjs/jwt";
import { LoginModule } from './login/login.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@Module({
  imports: [UserModule, RegisterModule, forwardRef(() => ResetPasswordModule), ForgotPasswordModule, forwardRef(() => LoginModule),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
    JwtModule.register({
      secret: "jwt_secret",
      signOptions: {
        issuer: 'http://localhost:3000',
        audience: ['http://localhost:5173', 'http://localhost:3000']
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
  exports: [AuthService]
})
export class AuthModule { }
