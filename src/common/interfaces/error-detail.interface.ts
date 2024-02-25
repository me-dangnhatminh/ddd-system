export interface IErrorDetail {
  type: string; // A URI for the error type, which can provide more information about the error.
  message: string; // A human readable message providing more details about the error. If there is only one error, this field will match error.message.
  // extendedHelp?: string; // A link to documentation or more information about the error.
  // sendReport?: boolean; // A URI for a report form used by the service to collect data about the error condition. This URI should be preloaded with parameters describing the request.
}

export const isErrorDetail = (error: any): error is IErrorDetail => {
  return (
    typeof error === 'object' &&
    typeof error.type === 'string' &&
    typeof error.message === 'string'
  );
};
