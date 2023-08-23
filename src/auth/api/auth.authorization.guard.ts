import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ILoginToken } from '../domain/login.token';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';

@Injectable()
export class AuthAuthorizationGuard implements CanActivate {
  constructor(@Inject('ILoginToken') private loginToken: ILoginToken) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const bearerToken = request.get('Authorization');
    if (!bearerToken) {
      throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR);
    }

    request.user = this.loginToken.verifyByAccess(bearerToken.split(' ')[1]);

    return true;
  }
}
