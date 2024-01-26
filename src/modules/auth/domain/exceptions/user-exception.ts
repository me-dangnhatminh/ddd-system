export class ValidationRulesException extends Error {
  static readonly message = 'Validation rules exception';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = ValidationRulesException.name;
  }
}

export class EmailValidationException extends Error {
  static readonly message = 'Email is not valid';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = EmailValidationException.name;
  }
}

export class PasswordValidationException extends Error {
  static readonly message = 'Password is not valid';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = PasswordValidationException.name;
  }
}

export class NameValidationException extends Error {
  static readonly message = 'Name is not valid';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = NameValidationException.name;
  }
}

export class RoleValidationException extends Error {
  static readonly message = 'Role is not valid';
  constructor(message: string = ValidationRulesException.message) {
    super(message);
    this.name = RoleValidationException.name;
  }
}

export class ConflictException extends Error {
  static readonly message = 'Conflict exception';
  constructor(message: string = ConflictException.message) {
    super(message);
    this.name = ConflictException.name;
  }
}
