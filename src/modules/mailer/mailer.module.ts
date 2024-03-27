import * as NestMailer from '@nestjs-modules/mailer';
import * as NestCommon from '@nestjs/common';

import * as App from './application';
import { ConfigService } from '@nestjs/config';
import { MailerConfig } from './mailer.config';

const subscriptions: NestCommon.Provider[] = [
  App.VerifyEmailCodeGeneratedSubscription,
];

@NestCommon.Global()
@NestCommon.Module({
  imports: [
    NestMailer.MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (mailerConfig: ConfigService<MailerConfig, true>) => ({
        transport: {
          host: mailerConfig.get('SMTP_HOST'),
          port: mailerConfig.get('SMTP_PORT'),
          auth: {
            user: mailerConfig.get('SMTP_USER'),
            pass: mailerConfig.get('SMTP_PASS'),
          },
        },
      }),
    }),
  ],
  providers: [...subscriptions],
})
export class MailerModule implements NestCommon.OnApplicationBootstrap {
  constructor(private readonly mailerService: NestMailer.MailerService) {}
  async onApplicationBootstrap() {
    // await this.testConnection();
  }

  private async testConnection() {
    await this.mailerService
      .sendMail({
        to: 'test@example.com',
        from: 'no-reply@your-app.com',
        subject: 'Test Connection Email',
        text: 'This is a test email.',
      })
      .then(() => {
        NestCommon.Logger.log('Mailer service connected!', MailerModule.name);
      })
      .catch((error) => {
        throw new Error(`Email failed to send: ${error}`);
      });
  }
}
