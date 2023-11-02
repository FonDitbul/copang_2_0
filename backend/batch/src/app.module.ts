import { Module } from '@nestjs/common';
import { TempModule } from './temp/temp.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), TempModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
