import { ErrorTypes, IErrorDetail } from '@common';
import * as Either from 'fp-ts/lib/Either';

export interface ItemSizeProps {
  value: string;
}

const INVALID_SIZE_FORMAT: IErrorDetail = {
  code: ErrorTypes.INVALID_PARAMETER,
  message: 'Invalid size format',
};

export class ItemSize {
  //size format is 0.5KB, 1MB, 1GB, 1TB
  static readonly SIZE_REGEX = /^(\d+(?:\.\d+)?)\s*([KMGTP]B)$/i;

  get value() {
    return this.props.value;
  }

  protected constructor(protected props: ItemSizeProps) {
    this.props = props;
  }

  static create(size: string): Either.Either<IErrorDetail, ItemSize> {
    const match = size.match(ItemSize.SIZE_REGEX);
    if (!match) return Either.left(INVALID_SIZE_FORMAT);
    return Either.right(new ItemSize({ value: size }));
  }
}
