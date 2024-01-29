/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IRepository {}

export interface IFindOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
  // fields?: string[];
  // include?: string[];
}
