import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

export const jwtModule = JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),//'SECRET',//
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION')},  
    }),
    inject: [ConfigService],
})