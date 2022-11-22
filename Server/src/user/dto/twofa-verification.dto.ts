import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString, Length, MaxLength } from "class-validator";

export class TwofaVerificationDTO {
    @ApiProperty()
    @IsString()
    @IsNumberString()
    @Length(6, 6)
    token: string;

}