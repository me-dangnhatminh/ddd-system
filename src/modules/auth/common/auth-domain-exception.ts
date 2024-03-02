import { DomainException } from '@common';

export class AuthDomainException extends DomainException {
  constructor(code: string, message?: string) {
    super(code, message);
  }
}
