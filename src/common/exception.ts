import { IErrorDetail } from './interfaces';

export class Exception extends Error implements IErrorDetail {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly type: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
