import { IsNotEmpty, isNumber } from 'class-validator';

export class RemoveUserToGroup {
	@IsNotEmpty()
	user_id: number;

	@IsNotEmpty()
	group_id: number;
}