import * as NestCommon from '@nestjs/common';
import { ValidationError } from '../common';

export class ValidationPipe extends NestCommon.ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory(errors) {
        const error = new ValidationError(
          'validation-error',
          "Your request parameters didn't validate.",
          'Check your request parameters again.',
          errors.map((error) => ({
            name: error.property,
            reason: Object.values(error.constraints ?? '').join(', '),
          })),
        );
        return error;
      },
    });
  }
}
