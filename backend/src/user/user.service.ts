import { Injectable, ConflictException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import { UserDTO } from './dto/user.dto';
import { IFetchUser } from 'src/types/user.types';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.model';
import { Model } from 'mongoose';
import { VerificationCode } from 'src/auth/entity/verification-code.model';
import { IVerification } from './user.controller';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(VerificationCode.name) private readonly verificationCodeModel: Model<VerificationCode>,
        private readonly bcryptService: BcryptService
    ) { }

    async CreateUser(user: UserDTO): Promise<IFetchUser> {
        try {
            const userExist = await this.userModel.findOne({ email: user.email });
            if (userExist) throw new ConflictException("user already exists!");
            const hashedUser = {
                ...user,
                password: await this.bcryptService.hash(user.password)
            }
            const newUser = new this.userModel(hashedUser);
            return await newUser.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findByEmail(email: string): Promise<IFetchUser> {
        try {
            const user = await this.userModel.findOne({ email: email });
            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findByID(id: string): Promise<IFetchUser> {
        try {
            const user = await this.userModel.findById(id);
            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async ResetPassword(data: { userId: string, password: string }) {
        try {
            const user = await this.findByID(data.userId);
            if (!user) {
                throw new NotFoundException("user does not exist!");
            }
            const newPass = {
                _id: user._id,
                username: user.username,
                email: user.email,
                password: data.password,
                role: user.role,
                isVerified: true
            }
            return await this.userModel.findByIdAndUpdate(data.userId, newPass, { new: true });
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async VerifyUser(id: any, verification: IVerification): Promise<IFetchUser | null> {
        try {
            const user = await this.userModel.findById(id);
            const verificationCode = await this.verificationCodeModel.findOne({ userId: user._id });
            if (!user) {
                throw new NotFoundException("user not found!");
            }
            if (!verificationCode) {
                throw new HttpException("error", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if (verificationCode.verificationCode == verification.verificationCode) {
                const updateUser: IFetchUser = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    isVerified: true
                }
                const verifiedUser = await this.userModel.findByIdAndUpdate(id, updateUser, { new: true });
                return verifiedUser;
            }
            console.log("logged");
            return null;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
