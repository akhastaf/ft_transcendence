import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsNumber } from "class-validator";

export class Reset2FaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    recovery_code: string;
    @ApiProperty()
    @IsNumber()
    id: number;
}