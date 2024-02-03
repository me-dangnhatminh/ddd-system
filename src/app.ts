import { RootModule } from './infrastructure/IoC/root.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ErrorTypes } from './common/constants';

import * as bodyParser from 'body-parser';
import { Exception } from './common/exception';

export class ServerApplication {
  private constructor(public readonly app: NestExpressApplication) {}
  static async create(): Promise<ServerApplication> {
    const app = await NestFactory.create<NestExpressApplication>(RootModule);
    return new ServerApplication(app);
  }

  public async run() {
    this.buildValidatorPipe();
    this.app.use(bodyParser.json({ limit: '100mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    await this.app.listen(3000);
  }

  private buildValidatorPipe(): void {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory(errors: ValidationError[]) {
          return new Exception(
            ErrorTypes.INVALID_PARAMETER,
            errors
              .map((error) => Object.values(error.constraints ?? {}).join(', '))
              .join(', '),
          );
        },
      }),
    );
  }
}
