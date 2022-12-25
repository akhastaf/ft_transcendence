import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../.env' });

export const typeOrmAsyncConfig : TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async () : Promise<TypeOrmModuleOptions> => {
        
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
            synchronize: false,
            logging: false,
        };
    },
};

export const typeormConfig : DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST, //"localhost",//
    port: parseInt(process.env.DB_PORT), //5432,//
    username: process.env.DB_USER, //"postgres",//
    password: process.env.DB_PASSWORD, //"postgres",//
    database: process.env.DB_NAME,//"pongapp",//
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    logging: false,
    // migrationsRun: true,
}