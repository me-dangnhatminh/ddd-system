import { RegisteredUserEvent } from '@modules/auth';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(RegisteredUserEvent)
export class RegisteredUserSubscription
  implements IEventHandler<RegisteredUserEvent>
{
  constructor(private readonly mailer: MailerService) {}
  async handle(event: RegisteredUserEvent) {
    const { email, firstName, lastName } = event;
    const fullName = `${firstName} ${lastName}`;
    await this.mailer
      .sendMail({
        to: email,
        subject: 'Welcome to the app',
        template: 'welcome',
        context: { name: fullName },
      })
      .catch((error) =>
        Logger.error(
          `Error sending email: ${error}`,
          RegisteredUserSubscription.name,
        ),
      );
  }
}
