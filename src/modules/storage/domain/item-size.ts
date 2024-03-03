export class ItemSize {
  //size format is 0.5KB, 1MB, 1GB, 1TB
  static readonly SIZE_REGEX = /^(\d+(?:\.\d+)?)\s*([KMGTP]B)$/i;

  get value() {
    return this.props.value;
  }

  protected constructor(protected props: any) {
    this.props = props;
  }
}
