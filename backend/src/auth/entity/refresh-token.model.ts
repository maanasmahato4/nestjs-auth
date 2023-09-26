import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type RefreshTokenDocument = HydratedDocument<RefreshToken>

@Schema({timestamps: true})
export class RefreshToken {
    @Prop({type: String, required: true})
    userId: string

    @Prop({type: String, required: true})
    refresh_token: string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);