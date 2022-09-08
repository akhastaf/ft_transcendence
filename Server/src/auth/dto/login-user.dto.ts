import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginUserDTO {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(30)
    @MinLength(3)
    @IsNotEmpty()
    username: string;
    @ApiProperty()
    @MaxLength(16)
    @MinLength(8)
    @IsNotEmpty()
    password: string;
}