import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";

export class addUserDto
{
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id_user: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id_group: number;

    @ApiProperty()
	@IsString()
	@MinLength(8)
    @MaxLength(20)
    password?: string;	
}