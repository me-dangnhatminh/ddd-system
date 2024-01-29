export abstract class IFileRepository {
  abstract create(): File;
  abstract save(file: File): Promise<void>;
  abstract findById(id: string): Promise<File>;
}
