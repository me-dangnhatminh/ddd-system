export interface OwnerProps {
  id: string; // user id
}

export class Owner {
  get id() {
    return this.props.id;
  }

  protected constructor(protected props: OwnerProps) {
    this.props = props;
  }

  new(props: OwnerProps) {
    return new Owner(props);
  }
}
