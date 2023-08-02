import { Module } from '@nestjs/common';
import { RepositoryModule } from '../database/repository.module';
import { OrderController } from './api/order.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  controllers: [OrderController],
  providers: [],
  exports: [],
})
export class OrderModule {}
