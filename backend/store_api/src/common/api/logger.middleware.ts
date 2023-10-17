import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isEmptyObject } from '@libs/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP', { timestamp: true });

  private bodyMasking(body: object, key: string): object {
    const copyBody = { ...body };

    if (!copyBody[key]) {
      return copyBody;
    }

    copyBody[key] = '******';
    return copyBody;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent') || '';
    const token = req.get('Authorization')?.split(' ')[1] || '';
    const now = Date.now();

    const copyBody = isEmptyObject(body) ? body : this.bodyMasking(body, 'password');
    res.on('finish', () => {
      const {
        statusCode,
        locals: { errorCode },
      } = res;

      let message = `${method} ${originalUrl} ${ip} ${userAgent} ${statusCode} ${Date.now() - now}ms`;
      message = isEmptyObject(body) ? message : message + ` ${JSON.stringify(copyBody)}`;
      message = errorCode ? message + ` ${errorCode}` : message;
      message = token ? message + ` ${token}` : message;

      this.logger.log(message);
    });
    next();
  }
}
