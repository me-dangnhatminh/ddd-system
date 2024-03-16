import { ValueObject } from '@shared';

export class Username extends ValueObject<string> {
  private constructor(public readonly value: string) {
    super(value);
  }

  public static new(value: string): Username {
    // TODO: Add validation
    if (value.length < 3 || value.length > 20)
      throw new Error('Username length must be between 3 and 20 characters');
    return new Username(value);
  }
}
