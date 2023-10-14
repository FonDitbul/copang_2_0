import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Buyer, formattingPhoneNumber } from '../domain/buyer';

@Injectable()
export class phoneNumberFormattingPipe implements PipeTransform<Buyer['phoneNumber'], Buyer['phoneNumber']> {
  transform(value: string, metadata: ArgumentMetadata): string {
    return formattingPhoneNumber(value);
  }
}
