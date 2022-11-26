import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, MinDate} from "class-validator";
import { Status } from "../entities/usertogroup.entity";

export class setStatusDto
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
	@IsNotEmpty()
	status: Status;

	@ApiProperty()
	@IsNotEmpty()
	@Transform( ({ value }) => new Date(value))
	@IsDate()
	@MinDate(new Date())
	until: Date;
}

export class unsetStatusDto
{
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id_user: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id_group: number;
}