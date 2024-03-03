export abstract class ReadRepository {
  abstract $query<T = unknown>(
    query: TemplateStringsArray,
    ...values: any[]
  ): Promise<T>;

  abstract $queryUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Promise<T>;
}
