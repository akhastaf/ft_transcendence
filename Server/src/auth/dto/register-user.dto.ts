import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class RegisterUserDTO {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(30)
    @MinLength(3)
    @IsNotEmpty()
    username: string;
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Match("password", {message: 'repeat password must be idenitcal to password'})
    repeat_password: string;
}