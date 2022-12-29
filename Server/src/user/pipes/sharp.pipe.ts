import { Injectable, PipeTransform, ForbiddenException } from "@nestjs/common";
import { join } from "path";
import * as sharp from "sharp";
import { v4 as uuidv4} from "uuid";

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<String>> {
    async transform(image: Express.Multer.File): Promise<String> {
        try {
            if (image) {
                    if (image.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                        const uid = uuidv4();
                        const filename = '/uploads/' + uid + '.webp';
                        await sharp(image.buffer)
                            .resize(800)
                            .webp({effort: 3})
                            .toFile(join(__dirname, `../../../public${filename}`));
                        return `/uploads/${uid}.webp`;
                    }
                throw new ForbiddenException('Only image files are allowed!');
            }
        } catch (error) {
            throw new ForbiddenException('Only image files are allowed!');
        }
    }
}