import { ApiProperty } from '@nestjs/swagger';

export class FailResDto {
  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'API 요청 실패',
  })
  readonly isSuccess: string;

  @ApiProperty({
    type: String,
    example: '요청이 실패하였습니다.',
    description: '에러 메시지',
  })
  readonly message: string;
}
