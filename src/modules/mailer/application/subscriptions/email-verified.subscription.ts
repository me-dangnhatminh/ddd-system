import * as NestMailer from '@nestjs-modules/mailer';
import * as NestCQRS from '@nestjs/cqrs';

import * as AuthModule from '@modules/auth';

@NestCQRS.EventsHandler(AuthModule.EmailVerifiedEvent)
export class EmailVerifiedSubscription
  implements NestCQRS.IEventHandler<AuthModule.RegisteredUserEvent>
{
  constructor(private readonly mailer: NestMailer.MailerService) {}
  async handle(event: AuthModule.EmailVerifiedEvent) {
    const { email, firstName, lastName } = event;
    await this.mailer.sendMail({
      to: email,
      subject: 'Welcome to our platform!',
      template: 'email-verified',
      context: { firstName, lastName },
      html: `<h1>Welcome to our platform, ${firstName} ${lastName}!</h1>`,
    });
  }
}
