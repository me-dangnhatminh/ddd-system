import { RootModule } from './infrastructure/IoC/root.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

class ServerApplication {
  private constructor(private readonly app: NestExpressApplication) {}
  static async create(): Promise<ServerApplication> {
    const app = await NestFactory.create<NestExpressApplication>(RootModule);
    return new ServerApplication(app);
  }

  public run() {
    this.buildValidatorPipe();
    this.app.listen(3000);
  }

  private buildValidatorPipe(): void {
    this.app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory(errors: ValidationError[]) {
          const message: { [key: string]: string } = {};
          errors.forEach((error) => {
            const prop = error.property;
            message[prop] = Object.values(error.constraints).join(', ');
          });
          return new HttpException(message, HttpStatus.BAD_REQUEST);
        },
      }),
    );
  }
}
ServerApplication.create().then((app) => app.run());
