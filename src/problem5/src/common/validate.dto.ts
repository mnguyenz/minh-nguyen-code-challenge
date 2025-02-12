import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from './httpStatusCodes';

export function validateDto<T extends object>(
    DtoClass: new () => T,
    source: 'body' | 'query' | 'params' = 'body'
) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dtoInstance = plainToInstance(DtoClass, req[source] as object);

        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: 'Validation failed',
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }))
            });
            return;
        }

        req[source] = dtoInstance as any;
        next();
    };
}
