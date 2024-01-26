type IValueObjectProps = { [value: string]: unknown };
export abstract class ValueObject<T extends IValueObjectProps> {
  protected props: T;

  constructor(props: T) {
    this.props = { ...props };
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    if (vo.props === undefined) return false;
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}