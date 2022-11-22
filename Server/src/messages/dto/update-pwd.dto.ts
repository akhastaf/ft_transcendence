import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";

export class updatePasswordDto
{
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id_group: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	old_password: string;

    @ApiProperty()
	@IsString()
	@MinLength(8)
    @MaxLength(20)
	@IsNotEmpty()
    password: string;

}