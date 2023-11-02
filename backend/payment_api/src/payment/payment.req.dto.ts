export class PaymentRequestDto {
  readonly method: string;
  readonly type: string;
  readonly bankName: string;
  readonly cardNumber: string;
  readonly cardType: string;
  readonly validityPeriod: string;
}
