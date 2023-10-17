import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../domain/cart.repository';
import { ICartService } from '../domain/cart.service';
import { ICartAddIn, ICartChangeIn, ICartDeleteIn, ICartFindAllIn } from '../domain/port/cart.in';
import { IProductRepository } from '../../product/domain/product.repository';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { Product } from '../../product/domain/product';
import { Cart } from '../domain/cart';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    @Inject('IProductRepository') private productRepository: IProductRepository,
  ) {}

  async findAll(findAllIn: ICartFindAllIn) {
    const carts = await this.cartRepository.findAllByBuyerId({ ...findAllIn });

    let isEndPage = true;
    if (carts.length !== 0) {
      const lastCartId = carts[carts.length - 1].id;
      const cartNextCount = await this.cartRepository.countByBuyerId({
        buyerId: findAllIn.buyerId,
        lastId: lastCartId,
      });
      isEndPage = cartNextCount < findAllIn.limit ? true : false;
    }

    return { carts, isEndPage };
  }

  async add(addIn: ICartAddIn) {
    const { buyerId, productId, productQuantity } = addIn;

    const product = await this.productRepository.findOne({ id: productId });
    if (Product.isDeleted(product)) {
      throw new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_EXIST);
    }

    const existCart = await this.cartRepository.findOne({ buyerId, productId, deletedAt: null });
    if (Cart.isExist(existCart)) {
      throw new CoPangException(EXCEPTION_STATUS.CART_EXIST);
    }

    const cart = await this.cartRepository.add({ buyerId, productId, productQuantity });

    return cart;
  }

  async change(changeIn: ICartChangeIn): Promise<Cart> {
    const { id, buyerId, productQuantity, status } = changeIn;

    const prevCart = await this.cartRepository.findOne({ id });
    if (!Cart.isExist(prevCart)) {
      throw new CoPangException(EXCEPTION_STATUS.CART_NOT_EXIST);
    }
    if (Cart.isDeleted(prevCart)) {
      throw new CoPangException(EXCEPTION_STATUS.CART_DELETED);
    }
    if (!Cart.isSameBuyerId(prevCart, buyerId)) {
      throw new CoPangException(EXCEPTION_STATUS.CART_BUYER_ID_DIFFERENT);
    }

    const cart = await this.cartRepository.change({ id, productQuantity, status });

    return cart;
  }

  async delete(deleteIn: ICartDeleteIn): Promise<Cart> {
    const { id, buyerId } = deleteIn;

    const prevCart = await this.cartRepository.findOne({ id });
    if (!Cart.isExist(prevCart)) {
      throw new CoPangException(EXCEPTION_STATUS.CART_NOT_EXIST);
    }
    if (Cart.isDeleted(prevCart)) {
      throw new CoPangException(EXCEPTION_STATUS.CART_DELETED);
    }
    if (!Cart.isSameBuyerId(prevCart, buyerId)) {
      throw new CoPangException(EXCEPTION_STATUS.CART_BUYER_ID_DIFFERENT);
    }

    const cart = await this.cartRepository.delete({ id });

    return cart;
  }
}
