import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'ETnbbuPN17',
    database: 'inventory',
    autoLoadEntities: true,
    synchronize: false
}