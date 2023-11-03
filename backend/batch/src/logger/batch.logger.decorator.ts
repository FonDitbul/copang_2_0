import { Logger } from '@nestjs/common';

export function BatchLogger(): MethodDecorator {
  const logger = new Logger('Batch', { timestamp: true });

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const context = {
        name: propertyKey,
        isSuccess: 'true',
        message: undefined,
      };
      try {
        return await method();
      } catch (e) {
        context.isSuccess = 'false';
        context.message = e.message;
      } finally {
        logger.log(JSON.stringify(context));
      }
    };
  };
}
