import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type VerificationCodeDocument = HydratedDocument<VerificationCode>


@Schema({ timestamps: true })
export class VerificationCode {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true })
    verificationCode: string;
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode);