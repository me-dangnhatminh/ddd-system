import { RootModule } from './infrastructure/IoC/root.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import {
  HttpException,
  HttpStatus,
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
          const message: { [key: string]: string } = {};
          errors.forEach((error) => {
            const prop = error.property;
            message[prop] = Object.values(error.constraints ?? {}).join(', ');
          });
          return new HttpException(message, HttpStatus.BAD_REQUEST);
        },
      }),
    );
  }
}
