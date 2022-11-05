import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
	content: string;
	// @IsNotEmpty()
	// sender_id: number;
	@IsNotEmpty()
	receiver_id: number;
}
