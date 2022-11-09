import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";
import { Privacy } from "../entities/group.entity";

export class joinGroupDto
{
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id_group: number;

    @ApiProperty()
    @ValidateIf(obj => obj.privacy === Privacy.PROTECTED)
    @IsNotEmpty()
	@IsString()
	@MinLength(8)
    @MaxLength(20)
    password?: string;	
}