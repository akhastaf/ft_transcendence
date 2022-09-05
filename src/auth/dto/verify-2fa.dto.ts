import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsNumber, IsNumberString, MaxLength, MinLength } from "class-validator";

export class Verify2FaDTO {
    @ApiProperty()
    @IsNumberString()
    token: string;
    @ApiProperty()
    @IsNumber()
    id: number;
}