import * as NestCommon from '@nestjs/common';
import { AppError } from '../common';

export class ValidationPipe extends NestCommon.ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory(errors) {
        const details = errors.map((error) => ({
          name: error.property,
          reason: Object.values(error.constraints ?? '').join(', '),
        }));

        return AppError.validationError({
          type: 'validation-error',
          title: "Your request parameters didn't validate.",
          detail: details.map((d) => d.reason).join(', '),
          errors: details,
        });
      },
    });
  }
}
