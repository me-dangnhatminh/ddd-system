import * as NestExpress from '@nestjs/platform-express';
import * as NestCore from '@nestjs/core';
import * as BodyParser from 'body-parser';
import * as NestSwagger from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { RootModule } from './modules/root.module';

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
    this.app.use(BodyParser.json({ limit: '100mb' }));
    this.app.use(BodyParser.urlencoded({ limit: '100mb', extended: true }));
    this.app.use(cookieParser());
    this.buildCQRS();
    this.buildAPIDocumentation();

    await this.app.listen(3000);
  }

  private buildCQRS(): void {
    const origin = 'http://localhost:5173';
    const methods = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
    this.app.enableCors({ origin, methods, credentials: true });
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
