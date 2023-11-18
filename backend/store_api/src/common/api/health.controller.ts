import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class HealthController {
  @ApiOperation({ summary: 'Health check 용 API', description: 'application 이 active 한 상태인지 확인하는 API' })
  @ApiResponse({ description: 'ALIVE' })
  // ------------------------------------------------------------------------------------------
  @Get('/health-check')
  async healthCheck() {
    return '';
  }
}
