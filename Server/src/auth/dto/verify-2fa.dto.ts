import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class Verify2FaDTO {
    @ApiProperty()
    @IsString()
    token: string;
    @ApiProperty()
    @IsNumber()
    id: number;
}