import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
    private readonly logger = new Logger(CustomValidationPipe.name);

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const errorMessages = this.flattenValidationErrors(errors);
            console.log(errorMessages)
            this.logger.warn(`Validation failed: ${JSON.stringify(errorMessages)}`);
            throw new BadRequestException({
                message: 'Validation failed',
                errors: errorMessages,
            });
        }

        return object;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private flattenValidationErrors(errors: any[]): string[] {
        const messages: string[] = [];

        errors.forEach(error => {
            if (error.constraints) {
                Object.values(error.constraints).forEach((message: string) => {
                    messages.push(message);
                });
            }

            if (error.children) {
                messages.push(...this.flattenValidationErrors(error.children));
            }
        });

        return messages;
    }
} 