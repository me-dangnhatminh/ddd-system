import { ValueObject } from '@shared';

export class Username extends ValueObject<string> {
  static readonly MAX_LENGTH = 20;
  static readonly MIN_LENGTH = 3;
  static readonly INVALID_MESSAGE = `Username length must be between ${Username.MIN_LENGTH} and ${Username.MAX_LENGTH} characters`;

  private constructor(public readonly value: string) {
    super(value);
  }

  public static new(value: string): Username {
    if (
      value.length < Username.MIN_LENGTH ||
      value.length > Username.MAX_LENGTH
    )
      throw new Error(Username.INVALID_MESSAGE);
    return new Username(value);
  }
}
