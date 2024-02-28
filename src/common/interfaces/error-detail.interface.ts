/**
 * ErrorDetail interface is used to define the structure of the error detail object.
 * This object is used to provide more information about the error.
 * @interface IErrorDetail
 * @property {string} code - A unique code that identifies the error.
 * @property {string} message - A human readable message providing more details about the error. If there is only one error, this field will match error.message.
 */
export interface IErrorDetail {
  code: string;
  message: string;
  // extendedHelp?: string; // A link to documentation or more information about the error.
  // sendReport?: boolean; // A URI for a report form used by the service to collect data about the error condition. This URI should be preloaded with parameters describing the request.
}
