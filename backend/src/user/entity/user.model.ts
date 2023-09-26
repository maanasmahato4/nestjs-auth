import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocumnet = HydratedDocument<User>

@Schema({timestamps: true})
export class User {
    @Prop({type: String, required: true})
    username: string;

    @Prop({type: String, required: true})
    email: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: String, required: true})
    role: string;

    @Prop({type: Boolean, required: true})
    isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User)