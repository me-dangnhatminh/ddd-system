export class BussinessException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationRulesException extends Error {
  static readonly message = 'Validation rules exception';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = ValidationRulesException.name;
  }
}

export class EmailInvalidException extends Error {
  static readonly message = 'Email is invalid';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = EmailInvalidException.name;
  }
}

export class PasswordInvalidException extends Error {
  static readonly message = 'Password is invalid';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = PasswordInvalidException.name;
  }
}

export class NameInvalidException extends Error {
  static readonly message = 'Name is invalid';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = NameInvalidException.name;
  }
}

export class UserNotFoundException extends Error {
  static readonly message = 'User not found';
  constructor(message: string = UserNotFoundException.message) {
    super(message);
    this.name = UserNotFoundException.name;
  }
}

export class PermissionDeniedException extends Error {
  static readonly message = 'Permission denied';
  constructor(message: string = PermissionDeniedException.message) {
    super(message);
    this.name = PermissionDeniedException.name;
  }
}
