export interface IOptions {
  search?: any;
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface IWhere {}
export interface IData {}
export interface ICreate {}
export interface IUpdate {}
export interface IDelete {}
export interface IGetOne {}
export interface IGetMany {}

export interface IRepository {
  save(data: any): Promise<void>;
  saveMany(data: any): Promise<void>;

  create(data: any): Promise<any>;
  createMany(data: any): Promise<void>;

  getOne(where: any): Promise<any>;
  getMany(where: any, options?: any): Promise<any>;

  update(where: any, data: any): Promise<void>;
  updateMany(where: any, data: any): Promise<void>;

  delete(where: any): Promise<void>;
  deleteMany(where: any): Promise<void>;

  count(where, options?: IOptions): Promise<number>;

  rawExecute(query: string): Promise<void>;
}
