import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

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
}