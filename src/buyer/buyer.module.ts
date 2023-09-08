import { Module } from '@nestjs/common';
import { BuyerController } from './api/buyer.controller';
import { BuyerService } from './application/buyer.service';
import { BuyerPrismaRepository } from './infrastructure/buyer.prisma.repository';
import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../database/repository.module';
import { BuyerAccountController } from './api/buyerAccount.controller';
import { BuyerAddressPrismaRepository } from './infrastructure/buyerAddress.prisma.repository';
import { BuyerAccountService } from './application/buyerAccount.service';

@Module({
  imports: [AuthModule, RepositoryModule],
  controllers: [BuyerController, BuyerAccountController],
  providers: [
    {
      provide: 'IBuyerService',
      useClass: BuyerService,
    },
    {
      provide: 'IBuyerRepository',
      useClass: BuyerPrismaRepository,
    },
    {
      provide: 'IBuyerRepository',
      useClass: BuyerPrismaRepository,
    },
    {
      provide: 'IBuyerAccountService',
      useClass: BuyerAccountService,
    },
    {
      provide: 'IBuyerAddressRepository',
      useClass: BuyerAddressPrismaRepository,
    },
  ],
})
export class BuyerModule {}
