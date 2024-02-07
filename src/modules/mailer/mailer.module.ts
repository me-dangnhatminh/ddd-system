import {
  MailerService,
  MailerModule as NestMailerModule,
} from '@nestjs-modules/mailer';
import {
  Global,
  Logger,
  Module,
  OnApplicationBootstrap,
  Provider,
} from '@nestjs/common';
import { RegisteredUserSubscription } from './application';

const subscriptions: Provider[] = [RegisteredUserSubscription];

@Global()
@Module({
  imports: [
    NestMailerModule.forRoot({
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
export class MailerModule implements OnApplicationBootstrap {
  constructor(private readonly mailerService: MailerService) {}
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
        Logger.log('Mailer service connected!', MailerModule.name);
      })
      .catch((error) => {
        throw new Error(`Email failed to send: ${error}`);
      });
  }
}
