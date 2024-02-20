import * as NestMailer from '@nestjs-modules/mailer';
import * as NestCQRS from '@nestjs/cqrs';
import * as AuthModule from '@modules/auth';

@NestCQRS.EventsHandler(AuthModule.EmailVerificationCodeRequestedEvent)
export class VerifyEmailCodeGeneratedSubscription {
  constructor(private readonly mailerService: NestMailer.MailerService) {}

  async handle(event: AuthModule.EmailVerificationCodeRequestedEvent) {
    const { email, code } = event.data;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      template: 'verify-email',
      context: { code },
      html: `<h1>Your verification code is: ${code}</h1>`,
    });
  }
}
