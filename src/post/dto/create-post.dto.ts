import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    isPublished: boolean;
    @ApiProperty()
    content: string;
}
