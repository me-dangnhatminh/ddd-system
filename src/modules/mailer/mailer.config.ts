import { IsNotEmpty } from 'class-validator';

export class MailerConfig {
  @IsNotEmpty() SMTP_HOST = String(process.env.SMTP_HOST ?? '');
  @IsNotEmpty() SMTP_PORT = Number(process.env.SMTP_PORT ?? '');
  @IsNotEmpty() SMTP_USER = String(process.env.SMTP_USER ?? '');
  @IsNotEmpty() SMTP_PASS = String(process.env.SMTP_PASS ?? '');
}
