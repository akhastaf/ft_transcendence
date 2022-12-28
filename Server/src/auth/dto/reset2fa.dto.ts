import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class Reset2FaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4',{each:true})
    recovery_code: string;
    @ApiProperty()
    @IsNumber()
    id: number;
}