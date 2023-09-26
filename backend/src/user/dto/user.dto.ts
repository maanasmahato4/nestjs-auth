import { IsNotEmpty, IsEmail, IsString, Validate, IsBoolean, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Role } from "src/shared/enums/roles.enum";

@ValidatorConstraint({name: "isValidRole", async: false})
export class IsValidRole implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return Object.values(Role).includes(value);
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Role must be a valid role!"
    }
}

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Validate(IsValidRole, {
        message: "role must be a valid role!"
    })
    role: string;

    @IsBoolean()
    isVerified: boolean;
}