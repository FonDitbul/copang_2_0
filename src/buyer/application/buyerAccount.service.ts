import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCreateAddressIn } from '../domain/port/buyerAddress.in';
import { BuyerCreateAddressOut } from '../domain/port/buyerAddress.out';

@Injectable()
export class BuyerAccountService implements IBuyerAccountService {
  constructor(@Inject('IBuyerAddressRepository') private buyerAddressRepository: IBuyerAddressRepository) {}

  async getAddressArray(buyerId: number) {
    const addressArray = this.buyerAddressRepository.getAllAddressByBuyerId(buyerId);

    return addressArray;
  }

  async createAddress(createAddressIn: BuyerCreateAddressIn): Promise<void> {
    const { buyerId, address } = createAddressIn;
    const createAddressOut: BuyerCreateAddressOut = {
      buyerId,
      address: JSON.stringify(address),
    };

    await this.buyerAddressRepository.createAddress(createAddressOut);
  }
}
