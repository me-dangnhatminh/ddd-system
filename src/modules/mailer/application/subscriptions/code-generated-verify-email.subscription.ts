import { CodeGeneratedVerifyEmailEvent } from '@modules/auth';
import { MailerService } from '@nestjs-modules/mailer';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CodeGeneratedVerifyEmailEvent)
export class CodeGeneratedVerifyEmailSubscription implements IEventHandler {
  constructor(private readonly mailerService: MailerService) {}
  async handle(event: CodeGeneratedVerifyEmailEvent) {
    const { email, code } = event.data;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      template: 'verify-email',
      context: { code },
    });
  }
}
