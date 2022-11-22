import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	content: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	receiver_id: number;
}
