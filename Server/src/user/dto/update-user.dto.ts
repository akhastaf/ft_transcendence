import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBooleanString, IsString } from "class-validator";

export class UpdateUserDTO {
    @ApiProperty()
    @IsString()
    @IsBooleanString()
    twofa?: string;
    @ApiProperty()
    avatar?: any;
}