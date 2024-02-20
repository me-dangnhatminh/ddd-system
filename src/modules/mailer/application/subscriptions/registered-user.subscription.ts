import * as NestMailer from '@nestjs-modules/mailer';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestCommon from '@nestjs/common';

import * as AuthModule from '@modules/auth';

@NestCQRS.EventsHandler(AuthModule.RegisteredUserEvent)
export class RegisteredUserSubscription
  implements NestCQRS.IEventHandler<AuthModule.RegisteredUserEvent>
{
  constructor(private readonly mailer: NestMailer.MailerService) {}
  async handle(event: AuthModule.RegisteredUserEvent) {
    const { email, firstName, lastName } = event;
    await this.mailer
      .sendMail({
        to: email,
        subject: 'Welcome to the app',
        template: 'welcome',
        context: { name: `${firstName} ${lastName}` },
        html: `<h1>Welcome to the app, ${firstName} ${lastName}!</h1>`,
      })
      .catch((error) =>
        NestCommon.Logger.error(
          `Error sending email: ${error}`,
          RegisteredUserSubscription.name,
        ),
      );
  }
}
