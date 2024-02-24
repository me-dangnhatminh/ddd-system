import { Specification } from '@common';

export interface Claim {
  type: string;
  value: string;
  issuer?: string;
}

export interface Policy {
  name: string;
  claims: Claim[];
  specification?: Specification<Claim>;
}
