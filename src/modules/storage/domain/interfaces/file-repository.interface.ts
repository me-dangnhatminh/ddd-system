import { IRepository } from '@common';

export abstract class IFileRepository implements IRepository {
  abstract create(): File;
  abstract save(file: File): Promise<void>;
  abstract findById(id: string): Promise<File>;
}
