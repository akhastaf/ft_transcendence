import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig : TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async () : Promise<TypeOrmModuleOptions> => {
        return {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "pongapp",
            autoLoadEntities: true,
            entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            synchronize: false,
        };
    },
};

export const typeormConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pongapp",
    entities: [__dirname + '/../entities/*.entity.ts'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    migrationsRun: true,
}