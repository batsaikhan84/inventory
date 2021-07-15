import { QualityModule } from './inventory/quality/quality.module';
import { StoreRoomModule } from './inventory/store-room/store-room.module';
import { AuthModule } from './inventory/auth/auth.module';
import { ReceivingModule } from './inventory/receiving/receiving.module';
import { MassSpecModule } from './inventory/mass-spec/mass-spec.module';
import { ExtractionModule } from './inventory/extraction/extraction.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { MasterModule } from './inventory/master/master.module';
import { typeOrmConfig } from './config/typeorm.config';
import { RdModule } from './inventory/rd/rd.module';
import { ScreeningModule } from './inventory/screening/screening.module';
import { SpecialRequestModule } from './inventory/special-request/special-request.module';
import { SafetyModule } from './inventory/safety/safety.module';
import { ChemicalModule } from './inventory/chemical/chemical.module';
import { EmailModule } from './inventory/email/email.module';
import { SchedulerModule } from './inventory/scheduler/scheduler.module';
import { ResetModule } from './inventory/auth/reset/reset.module';
import { AuditModule } from './inventory/audit/audit.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configValidationSchema } from './config.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      // validationSchema: configValidationSchema
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //       type: 'mysql',
    //       autoLoadEntities: true,
    //       synchronize: false,
    //   })
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '@Root2021',
    //   database: 'inventory',
    //   autoLoadEntities: true,
    //   synchronize: false
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MasterModule,
    ExtractionModule,
    MassSpecModule,
    ReceivingModule,
    AuthModule,
    StoreRoomModule,
    RdModule,
    QualityModule,
    ScreeningModule,
    RdModule,
    SpecialRequestModule,
    SafetyModule,
    ChemicalModule,
    EmailModule,
    SchedulerModule,
    ResetModule,
    AuditModule

  ]
})
export class InventoryModule {
  constructor(private connection: Connection) {}
}
