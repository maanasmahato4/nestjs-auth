import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, AuthModule,
    MongooseModule.forRoot("mongodb+srv://maanas:mahato@cluster0.fon9sup.mongodb.net/?retryWrites=true&w=majority")
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
