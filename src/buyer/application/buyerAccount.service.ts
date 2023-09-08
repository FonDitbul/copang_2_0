import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { BuyerAddress } from '../domain/buyerAddress';

@Injectable()
export class BuyerAccountService implements IBuyerAccountService {
  constructor(@Inject('IBuyerAddressRepository') private buyerAddressRepository: IBuyerAddressRepository) {}

  async getAddressArray(buyerId: number) {
    const addressArray = this.buyerAddressRepository.getAllAddressByBuyerId(buyerId);

    return addressArray;
  }
}
