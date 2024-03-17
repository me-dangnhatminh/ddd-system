import * as NestCommon from '@nestjs/common';
import { ValidationError } from '../common';

export class ValidationPipe extends NestCommon.ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory(errors) {
        const details = errors.map((error) => ({
          name: error.property,
          reason: Object.values(error.constraints ?? '').join(', '),
        }));
        const mess = details.map((d) => d.reason).join(', ');
        const error = new ValidationError(
          'validation-error',
          "Your request parameters didn't validate.",
          mess,
          details,
        );
        return error;
      },
    });
  }
}
