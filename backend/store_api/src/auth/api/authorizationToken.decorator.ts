import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizationToken = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const bearerToken: string = request.headers.authorization;
  if (!bearerToken.includes('Bearer')) {
    throw new Error('plz token');
  }

  const token = bearerToken.split(' ')[1];

  return token;
});
