export const EXCEPTION_STATUS = {
  LOGIN_TOKEN_ERROR: { errorCode: 10001, message: '올바른 토큰이 아닙니다' },
  LOGIN_TOKEN_EXPIRE: { errorCode: 10002, message: '만료된 토큰입니다.' },

  USER_ID_DUPLICATE: { errorCode: 10101, message: '해당 user Id는 이미 존재합니다.' },
  USER_NOT_EXIST: { errorCode: 10102, message: '해당 유저가 존재하지 않습니다.' },
  USER_DELETED: { errorCode: 10103, message: '해당 유저는 삭제되었습니다.' },
  USER_PASSWORD_NOT_MATCH: { errorCode: 10104, message: '유저의 비밀번호가 일치하지 않습니다.' },

  // 유저의 정보 변경시
  USER_CHANGE_PASSWORD_SAME: { errorCode: 10105, message: '이전 비밀번호와 동일한 비밀번호 입니다.' },
  USER_CHANGE_NICK_NAME_SAME: { errorCode: 10106, message: '닉네임이 동일한 유저가 존재합니다.' },
  USER_CHANGE_EMAIL_SAME: { errorCode: 10107, message: '이메일이 동일한 유저가 존재합니다.' },
  USER_CHANGE_PHONE_NUMBER_SAME: { errorCode: 10107, message: '휴대폰 번호가 동일한 유저가 존재합니다.' },

  // 유저 정보 관련
  USER_ID_NOT_MATCH: { errorCode: 10201, message: '유저ID가 일치하지 않는 정보입니다.' },
  USER_ADDRESS_NOT_EXIST: { errorCode: 10202, message: '존재하지 않는 USER_ADDRESS 입니다.' },
  USER_CARD_NOT_EXIST: { errorCode: 10203, message: '존재하지 않는 유저 카드 입니다.' },

  PAGING_NUM_ERROR: { errorCode: 10301, message: '페이징 넘버 에러' },
  PAGING_SORT_BY_OPTION_ERROR: { errorCode: 10302, message: '존재하지 않는 정렬 옵션' },
  PAGING_ORDER_OPTION_ERROR: { errorCode: 10303, message: 'asc or desc 가 아닙니다' },

  // 물품 관련 에러 20001 ~
  PRODUCT_NOT_EXIST: { errorCode: 20001, message: '물품이 존재하지 않거나 삭제되었습니다.' },
  PRODUCT_NOT_AVAILABLE_BUY: { errorCode: 20002, message: '해당 물품은 구매할 수 없습니다.' },
  PRODUCT_NO_QUANTITY: { errorCode: 20003, message: '물품 수량이 존재하지 않습니다.' },

  // 장바구니 (Cart) 관련 에러 21001 ~
  CART_EXIST: { errorCode: 21001, message: '장바구니에 해당 제품이 이미 존재합니다.' },
  CART_NOT_EXIST: { errorCode: 21002, message: '장바구니에 존재하지 않습니다.' },
  CART_DELETED: { errorCode: 21003, message: '삭제된 장바구니 입니다.' },
  CART_BUYER_ID_DIFFERENT: { errorCode: 21004, message: '장바구니의 buyerId와 요청한 buyerId가 다릅니다.' },

  // 주문 물품 Order Product 관련 에러 22001 ~
  ORDER_PRODUCT_NOT_EXIST: { errorCode: 22001, message: '주문 물품이 존재하지 않습니다' },
  ORDER_PRODUCT_NOT_SHIPPING_COMPLETE: { errorCode: 22002, message: '주문 물품 배송이 완료되지 않았습니다.' },
  ORDER_PRODUCT_NOT_MATCH_BUYER: { errorCode: 22003, message: 'buyer의 정보가 다릅니다.' },
};

export class CoPangException extends Error {
  private readonly errorCode: number;
  readonly message: string;

  constructor(exception: { errorCode: number; message: string }) {
    super();
    this.errorCode = exception.errorCode;
    this.message = exception.message;
  }
  getMessage() {
    return this.message;
  }
  getErrorCode() {
    return this.errorCode;
  }
}
