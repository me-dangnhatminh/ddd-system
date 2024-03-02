/**
 * Error detail interface.
 * @property {string} type - Error type: a unique identifier for the error type.
 * @property {string} code - Error code: a unique code for the error.
 * @property {string} message - Error message: a human-readable description of the error.
 */
export interface IErrorDetail {
  type: string;
  message: string;
  code: number;
  // extendedHelp?: string;
  // sendReport?: boolean;
}

export interface IErrorDetailWithField extends IErrorDetail {
  field: string;
}
