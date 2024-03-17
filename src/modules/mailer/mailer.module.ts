import * as NestMailer from '@nestjs-modules/mailer';
import * as NestCommon from '@nestjs/common';

import * as App from './application';

const subscriptions: NestCommon.Provider[] = [
  App.VerifyEmailCodeGeneratedSubscription,
];

@NestCommon.Global()
@NestCommon.Module({
  imports: [
    NestMailer.MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: { user: 'alison30@ethereal.email', pass: 'heyMGBAGdkpHKwfzNB' },
      },
    }),
  ],
  providers: [...subscriptions],
  exports: [],
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
