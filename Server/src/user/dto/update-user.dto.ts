import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDTO {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(3, 15)
    username?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true")
    twofa?: boolean;
    @ApiPropertyOptional()
    avatar?: any;
}