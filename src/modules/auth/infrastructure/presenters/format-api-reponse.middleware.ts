// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { Either } from 'fp-ts/lib/Either';

// import { ApiResponse, IErrorDetail } from '@common';
// import { mapErrorTypeToHttpCode } from '../../common';

// /**
//  * isEither uses the Either type from fp-ts to check if the value is an instance of Either.
//  * @param value
//  * @returns
//  */
// function isEither<T>(value: unknown): value is Either<IErrorDetail, T> {
//   return (
//     value !== null &&
//     typeof value === 'object' &&
//     '_tag' in value &&
//     ('left' in value || 'right' in value) &&
//     (value['_tag'] === 'Left' || value['_tag'] === 'Right')
//   );
// }

// @Injectable()
// export class FormatApiResponseMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const originalJson = res.json;
//     res.json = function (body) {
//       if (isEither(body)) {
//         if (body._tag === 'Left')
//           return originalJson.call(
//             this,
//             ApiResponse.failed({
//               code: mapErrorTypeToHttpCode(body.left.reason),
//               message: body.left.message,
//             }),
//           );
//         else if (body._tag === 'Right') {
//           const resEmpty = body.right === undefined || body.right === null;
//           const res = resEmpty
//             ? ApiResponse.success(undefined)
//             : ApiResponse.success(body.right);
//           return originalJson.call(this, res);
//         }
//       }

//       return originalJson.call(this, body);
//     };
//     next();
//   }
// }
