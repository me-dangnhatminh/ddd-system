// common error types in domain context (e.g. auth, user, etc.)
export enum ErrorTypes {
  INTERNAL = 'internal',
  VALIDATION = 'validation',
  AUTHORIZATION = 'authorization',
  AUTHENTICATION = 'authentication',
  CONCURRENCY = 'concurrency',
  INVALID_ARGUMENT = 'invalid-argument',
  CONFLICT = 'conflict',
  NOT_FOUND = 'not-found',
}
