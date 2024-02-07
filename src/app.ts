import { RootModule } from './modules/root.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

import * as bodyParser from 'body-parser';

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
          return new BadRequestException(
            errors
              .map((error) => Object.values(error.constraints ?? {}).join(', '))
              .join(', '),
          );
        },
      }),
    );
  }
}
