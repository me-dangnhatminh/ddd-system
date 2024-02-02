import { MailerService } from '@nestjs-modules/mailer';
import { VerifyEmailCommand } from '../verify-email.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { UserRepository } from 'src/modules/auth/domain';
import { IErrorDetail, Result } from '@common';
import { UserErrors } from '../../common/user-errors';

/**
 *
 * @returns random 4 digit number
 */
const generateCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
    @Inject('CACHE_MANAGER') private readonly cacheService: Cache,
  ) {}

  async execute(
    command: VerifyEmailCommand,
  ): Promise<Result<undefined, IErrorDetail>> {
    const { requester, code } = command;
    const isVerified = command.requester.isVerified;
    if (isVerified) return Result.failure(UserErrors.USER_ALREADY_VERIFIED);
    if (isVerified) throw new Error('User already verified');

    const CODE_CACHE_KEY = `verify-email:${command.requester.email}`;

    // If code is provided, verify code and update user
    if (code !== undefined && code !== null) {
      const _code = await this.cacheService.get(CODE_CACHE_KEY);
      if (`${_code}` !== code) return Result.failure(UserErrors.INVALID_TOKEN);

      requester.verifyEmail(code);
      await this.userRepository.update(requester);
      requester.commit();

      return Result.success();
    }

    // generate code, save to cache and send email
    const codeToVerify = generateCode();
    const codeTtlMinutes = 10; // 10 minutes
    await this.cacheService.set(
      CODE_CACHE_KEY,
      codeToVerify,
      codeTtlMinutes * 60 * 1000, // convert to miliseconds (in v5 ttl is miliseconds)
    );

    await this.mailerService.sendMail({
      to: command.requester.email,
      subject: 'Verify your email',
      html: `
        <h1>Verify your email</h1> \n
        <p>Use this code to verify your email: ${1234}</p>`,
      context: { code: 1234 },
    });
    return Result.success();
  }
}
