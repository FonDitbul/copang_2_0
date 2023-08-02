import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { Buyer } from '../../buyer/api/buyer-info.decorator';
import { UserInfo } from '../../auth/domain/login.token';
import { OrderBuyProductReq } from './order.req.dto';

@Controller()
export class OrderController {}
