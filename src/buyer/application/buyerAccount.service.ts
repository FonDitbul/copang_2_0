import { IBuyerAccountService } from '../domain/buyerAccount.service';
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerAddressRepository } from '../domain/buyerAddress.repository';
import { isNotMatchBuyerId } from '../domain/buyer';
import {
  BuyerCreateAddressIn,
  BuyerCreateCardIn,
  BuyerDeleteAddressIn,
  BuyerDeleteCardIn,
  BuyerUpdateRepresentativeAddressIn,
  BuyerUpdateRepresentativeCardIn,
} from '../domain/port/buyerAccount.in';
import { BuyerCreateAddressOut, BuyerCreateCardOut } from '../domain/port/buyerAccount.out';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { BuyerCard } from '../domain/buyerCard';
import { IBuyerCardRepository } from '../domain/buyerCard.repository';
import { id } from 'date-fns/locale';

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

  async updateRepresentativeAddress(updateAddressIn: BuyerUpdateRepresentativeAddressIn): Promise<void> {
    const { buyerId, id } = updateAddressIn;
    const buyerAddress = await this.buyerAddressRepository.getOneById(id);

    if (isNotMatchBuyerId(buyerAddress, buyerId)) {
      throw new CoPangException(EXCEPTION_STATUS.USER_ID_NOT_MATCH);
    }

    await this.buyerAddressRepository.updatesIsNotRepresentativeAddressByBuyerId(buyerId);
    await this.buyerAddressRepository.updateIsRepresentativeAddressById(id);
  }

  async deleteAddress(deleteAddressIn: BuyerDeleteAddressIn): Promise<void> {
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

  async createCard(createCardIn: BuyerCreateCardIn): Promise<void> {
    const {
      buyerId,
      card: { bankName, cardType, cardNumber, validityPeriod },
    } = createCardIn;

    const createCardOut: BuyerCreateCardOut = {
      buyerId,
      bankName,
      cardType,
      cardNumber,
      validityPeriod,
    };

    await this.buyerCardRepository.create(createCardOut);
  }

  async updateRepresentativeCard(updateCardIn: BuyerUpdateRepresentativeCardIn): Promise<void> {
    const { buyerId, id } = updateCardIn;
    const buyerCard = await this.buyerCardRepository.getOneById(id);

    if (isNotMatchBuyerId(buyerCard, buyerId)) {
      throw new CoPangException(EXCEPTION_STATUS.USER_ID_NOT_MATCH);
    }

    await this.buyerCardRepository.updatesIsNotRepresentativeByBuyerId(buyerId);
    await this.buyerCardRepository.updateIsRepresentativeById(id);
  }

  async deleteCard(deleteCardIn: BuyerDeleteCardIn): Promise<void> {
    const { buyerId, id } = deleteCardIn;
    const buyerCard = await this.buyerCardRepository.getOneById(id);

    if (isNotMatchBuyerId(buyerCard, buyerId)) {
      throw new CoPangException(EXCEPTION_STATUS.USER_ID_NOT_MATCH);
    }

    await this.buyerCardRepository.deleteById(id);
  }
}
