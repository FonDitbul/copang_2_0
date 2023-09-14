import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { BuyerAddress, isNotMatchBuyerId } from '../domain/buyerAddress';
import { BuyerCreateAddressIn, BuyerDeleteIn, BuyerUpdateRepresentativeIn } from '../domain/port/buyerAddress.in';
import { BuyerCreateAddressOut } from '../domain/port/buyerAddress.out';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { id } from 'date-fns/locale';
import { BuyerCard } from '../domain/buyerCard';
import { IBuyerCardRepository } from '../domain/buyerCard.repository';

@Injectable()
export class BuyerAccountService implements IBuyerAccountService {
  constructor(
    @Inject('IBuyerAddressRepository') private buyerAddressRepository: IBuyerAddressRepository,
    @Inject('IBuyerCardRepository') private buyerCardRepository: IBuyerCardRepository,
  ) {}

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

  async updateRepresentativeAddress(updateAddressIn: BuyerUpdateRepresentativeIn): Promise<void> {
    const { buyerId, id } = updateAddressIn;
    const buyerAddress = await this.buyerAddressRepository.getOneById(id);

    if (isNotMatchBuyerId(buyerAddress, buyerId)) {
      throw new CoPangException(EXCEPTION_STATUS.USER_ID_NOT_MATCH);
    }

    await this.buyerAddressRepository.updatesIsNotRepresentativeAddressByBuyerId(buyerId);
    await this.buyerAddressRepository.updateIsRepresentativeAddressById(id);
  }

  async deleteAddress(deleteAddressIn: BuyerDeleteIn): Promise<void> {
    const { buyerId, id } = deleteAddressIn;
    const buyerAddress = await this.buyerAddressRepository.getOneById(id);

    if (isNotMatchBuyerId(buyerAddress, buyerId)) {
      throw new CoPangException(EXCEPTION_STATUS.USER_ID_NOT_MATCH);
    }

    await this.buyerAddressRepository.deleteAddressById(id);
  }

  async getCardArray(buyerId: number): Promise<BuyerCard[]> {
    const addressArray = await this.buyerCardRepository.getAllByBuyerId(buyerId);

    return addressArray;
  }
}
