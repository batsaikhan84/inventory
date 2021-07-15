import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
import { StoreRoomController } from './store-room.controller';
import { StoreRoomRepository } from './store-room.repository';
import { StoreRoomService } from './store-room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreRoomRepository]),
    AuthModule,
    EmailModule
  ],
  controllers: [StoreRoomController],
  providers: [StoreRoomService]
})
export class StoreRoomModule {}
