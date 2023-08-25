import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { formattingPhoneNumber } from '../domain/buyer';

@Injectable()
export class phoneNumberFormattingPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    return formattingPhoneNumber(value);
  }
}
