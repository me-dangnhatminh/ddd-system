import * as NestExpress from '@nestjs/platform-express';
import * as NestCore from '@nestjs/core';
import * as NestCommon from '@nestjs/common';
import * as BodyParser from 'body-parser';
import * as NestSwagger from '@nestjs/swagger';

import { RootModule } from './modules/root.module';
import { ApiResponse } from './common/api-response';
import {
  IErrorDetail,
  IErrorResponse,
  isErrorDetail,
} from './common/interfaces';

export class ServerApplication {
  private constructor(
    public readonly app: NestExpress.NestExpressApplication,
  ) {}
  static async create(): Promise<ServerApplication> {
    const app =
      await NestCore.NestFactory.create<NestExpress.NestExpressApplication>(
        RootModule,
      );
    return new ServerApplication(app);
  }

  public async run() {
    this.buildValidatorPipe();
    this.app.use(BodyParser.json({ limit: '100mb' }));
    this.app.use(BodyParser.urlencoded({ limit: '100mb', extended: true }));
    this.buildAPIDocumentation();

    await this.app.listen(3000);
  }

  private buildValidatorPipe(): void {
    this.app.useGlobalPipes(
      new NestCommon.ValidationPipe({
        transform: true,
        exceptionFactory(errors: NestCommon.ValidationError[]) {
          const detail = errors.reduce<IErrorDetail[]>((acc, error) => {
            if (!isErrorDetail(error))
              throw new Error(
                'InvalidOperation: Expected error to be IErrorDetail.',
              );
            return [...acc, { type: error.type, message: error.message }];
          }, []);

          const error: IErrorResponse = {
            code: 400,
            message: 'Bad Request',
            detail,
          };
          return ApiResponse.error(error);
        },
      }),
    );
  }

  private buildAPIDocumentation(): void {
    const title = 'IPoster';
    const description = 'IPoster API documentation';
    const version = '1.0.0';

    const options: Omit<NestSwagger.OpenAPIObject, 'paths'> =
      new NestSwagger.DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth({ type: 'apiKey', in: 'header', name: 'x-access-token' })
        .build();

    const document: NestSwagger.OpenAPIObject =
      NestSwagger.SwaggerModule.createDocument(this.app, options);
    NestSwagger.SwaggerModule.setup('docs', this.app, document);
  }
}
