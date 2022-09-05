// import { applyDecorators, UseInterceptors } from "@nestjs/common";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
// import { ApiBody, ApiConsumes } from "@nestjs/swagger";
// import { ReferenceObject, SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

// export function ApiFile(file: string = 'file', properties?: Record<string, SchemaObject | ReferenceObject>, localOpption?: MulterOptions) {
//     return applyDecorators(
//         UseInterceptors(FileInterceptor(file, localOpption),
//         ApiConsumes('multipart/form-data'),
//         // ApiBody({
//         //     schema: {
//         //         type: 'object',
//         //         properties: properties ? properties : 
//         //     },
//         })),
//     );
// }