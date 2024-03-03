export function nameof<T>(key: Extract<keyof T, string>): string {
  return key;
}
