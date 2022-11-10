import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'../../.env' });

export const typeOrmAsyncConfig : TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async () : Promise<TypeOrmModuleOptions> => {
        console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
        return {
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            synchronize: true,
            logging: false,
        };
    },
};

export const typeormConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",//process.env.DB_HOST,
    port: 5432,//parseInt(process.env.DB_PORT),
    username: "postgres",//process.env.DB_USER,
    password: "postgres",//process.env.DB_PASSWORD,
    database: "pongapp",//process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: true,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    logging: true,
    // migrationsRun: true,
}