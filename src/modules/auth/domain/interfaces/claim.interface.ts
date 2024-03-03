import { Specification } from '@shared';

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
