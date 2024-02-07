export abstract class ReadRepository {
  abstract $query<T = any>(
    query: TemplateStringsArray,
    ...values: any[]
  ): Promise<T>;
}
