import { ErrorTypes, IErrorDetail } from '@common';
import * as Either from 'fp-ts/lib/Either';

export interface ItemSizeProps {
  value: string;
}

export class ItemSize {
  //size format is 0.5KB, 1MB, 1GB, 1TB
  static readonly SIZE_REGEX = /^(\d+(?:\.\d+)?)\s*([KMGTP]B)$/i;

  get value() {
    return this.props.value;
  }

  protected constructor(protected props: ItemSizeProps) {
    this.props = props;
  }
}
