import * as NestExpress from '@nestjs/platform-express';
import * as NestCore from '@nestjs/core';
import * as BodyParser from 'body-parser';
import * as NestSwagger from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { RootModule } from './modules/root.module';
import { AppConfig } from './shared/infrastructure';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export class ServerApplication {
  private appConfig: ConfigService<AppConfig, true>;
  private constructor(public readonly app: NestExpress.NestExpressApplication) {
    this.appConfig = this.app.get(ConfigService);
  }

  static async create(): Promise<ServerApplication> {
    const app: NestExpress.NestExpressApplication =
      await NestCore.NestFactory.create(RootModule);
    return new ServerApplication(app);
  }

  public async run() {
    this.app.use(BodyParser.json({ limit: '100mb' }));
    this.app.use(BodyParser.urlencoded({ limit: '100mb', extended: true }));
    this.app.use(cookieParser());
    this.buildCQRS();
    this.buildAPIDocumentation();

    // run the server
    const host = this.appConfig.get('API_HOST');
    const port = this.appConfig.get('API_PORT');
    const mess = `Server running on http://${host}:${port}`;
    await this.app.listen(port, () => Logger.log(mess, ServerApplication.name));
  }

  private buildCQRS(): void {
    const origin = this.appConfig.get('CORS_ORIGIN');
    const methods = this.appConfig.get('CORS_METHOD');
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
        .build();

    const document: NestSwagger.OpenAPIObject =
      NestSwagger.SwaggerModule.createDocument(this.app, options);
    NestSwagger.SwaggerModule.setup('docs', this.app, document);
  }
}
