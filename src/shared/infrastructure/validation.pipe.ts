import * as NestCommon from '@nestjs/common';
import { IValidationError, CommonErrorType } from '../common';

export class ValidationPipe extends NestCommon.ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory(errors) {
        const error: IValidationError = {
          type: CommonErrorType.ValidationError,
          title: "Your request parameters didn't validate.",
          detail: 'Check your request parameters again.',
          invalidParams: errors.map((error) => ({
            name: error.property,
            reason: Object.values(error.constraints ?? '').join(', '),
          })),
        };

        return new NestCommon.BadRequestException(error);
      },
    });
  }
}
