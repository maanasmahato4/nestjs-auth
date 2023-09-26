import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import {MongooseModule} from "@nestjs/mongoose";
import { User, UserSchema } from './entity/user.model';
import { VerificationCode, VerificationCodeSchema } from 'src/auth/entity/verification-code.model';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: VerificationCode.name, schema: VerificationCodeSchema}])],
  controllers: [UserController],
  providers: [UserService, BcryptService],
  exports: [UserService]
})
export class UserModule {}
