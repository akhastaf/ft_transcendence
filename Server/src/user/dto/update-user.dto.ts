import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsBooleanString, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class UpdateUserDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 15)
    username?: string;
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true")
    twofa?: boolean;
    @ApiProperty()
    avatar?: any;
}