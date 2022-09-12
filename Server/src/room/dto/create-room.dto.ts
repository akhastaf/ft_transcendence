import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "src/auth/decorators/match.decorator";

export class CreateRoomDTO  {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    name: string;
    @ApiProperty()
    @IsBoolean()
    private: boolean;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(8)
    password?: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(8)
    @Match("password", {message: 'repeat password must be idenitcal to password'})
    repeat_password?: string;
}