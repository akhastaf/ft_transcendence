import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";

export class WsCatchAllFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        throw new Error("Method not implemented.");
    }
}