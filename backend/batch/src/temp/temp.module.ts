import { Module } from '@nestjs/common';
import { TempService } from './temp.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TempService],
})
export class TempModule {}
