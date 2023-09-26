import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}