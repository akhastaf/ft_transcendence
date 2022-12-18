import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsAlphanumeric, IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGroupDto{

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id_group: number;

	@ApiProperty()
    @MinLength(3)
    @MaxLength(20)
    @IsAlphanumeric()
	@IsOptional()
    name?: string;

    @ApiProperty()
    @IsOptional()
    avatar?: any;


    @ApiProperty()
    @IsOptional()
	@MaxLength(500)
    @IsString()
    description?: string;
}