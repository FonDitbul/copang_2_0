import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { SortType } from '../../domain/sort-type';

@Injectable()
export class SortValidationPipe implements PipeTransform<string, SortType> {
  transform(value: SortType, metadata: ArgumentMetadata): SortType {
    if (!(value === 'ASC' || value === 'asc' || value === 'DESC' || value === 'desc')) {
      throw new BadRequestException('Sort should to be ASC or DESC');
    }
    return <'ASC' | 'asc' | 'DESC' | 'desc'>value.toLowerCase();
  }
}
