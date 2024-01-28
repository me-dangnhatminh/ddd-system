import { UserCreatedEvent } from '@modules/auth';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedSubscription
  implements IEventHandler<UserCreatedEvent>
{
  constructor(private readonly mailer: MailerService) {}
  async handle(event: UserCreatedEvent) {
    const { data } = event;
    await this.mailer
      .sendMail({
        to: data.email,
        subject: 'Welcome to the app',
        template: 'welcome',
        context: { name: `${data.firstName} ${data.lastName}` },
      })
      .catch((error) =>
        Logger.error(
          `Error sending email: ${error}`,
          UserCreatedSubscription.name,
        ),
      );
  }
}
