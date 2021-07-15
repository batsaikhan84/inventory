import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule'
@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  providers: [SchedulerService],
  exports: [SchedulerService]
})
export class SchedulerModule {}
