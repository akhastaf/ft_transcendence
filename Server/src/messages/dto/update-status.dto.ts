import { ApiProperty } from "@nestjs/swagger";
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
	@IsDate()
	@MinDate(new Date())
	@IsNotEmpty()
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