import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class Verify2FaDTO {
    @ApiProperty()
    @IsNumberString()
    token: string;
    @ApiProperty()
    @IsNumber()
    id: number;
}