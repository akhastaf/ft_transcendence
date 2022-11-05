import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsAlphanumeric, ValidateIf, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Privacy } from '../entities/group.entity';


export class CreateGroupDto {

    @ApiProperty()
    @MinLength(3)
    @MaxLength(50)
    @IsAlphanumeric()
    name: string;
    @ApiProperty()
    @ValidateIf(obj => obj.privacy === Privacy.PROTECTED)
    @IsNotEmpty()
    password?: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    avatar?: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    privacy?: string;

}
//** DTO (Data Transfer Object) schema. A DTO is an object that defines how the data will be sent over the network */
//*
//* The DTO on it's own is more of a guideline for the developer and those who consume the API to know what kind of shape the request body expects to be,
//* it doesn't actually run any validations on its own. However, with Typescript you can add in decorators from the class-validator library and and use
//* the built-in ValidationPipe and have validations run on your incoming requests so that only the expected request body can come in.
//* In short, the DTO is the definition of what the request should look like, but because JavaScript is a dynamic language, you can send in anything.
//* That's why libraries like class-validator and runtypes exist.
//? https://stackoverflow.com/questions/59397687/what-is-the-purpose-of-a-data-transfer-object-in-nestjs#:~:text=The%20DTO%20on,and%20runtypes%20exist


// privacy?
// name
// avatar?
// description?
// passwoord?