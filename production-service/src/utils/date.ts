import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as moment from "moment";
import { ValueTransformer } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsLooseDateStringConstraint implements ValidatorConstraintInterface {
    validate(date: string, args: ValidationArguments) {
        const formats = [
            "DD/MM/YYYY",
            "YYYY/MM/DD",
            "MM/DD/YYYY",
            "YYYY/DD/MM",
            "DD-MM-YYYY",
            "YYYY-MM-DD",
            "MM-DD-YYYY",
            "YYYY-DD-MM"
        ];

        for (const format of formats) {
            if (moment(date, format, true).isValid()) {
                return true;
            }
        }
        return false;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Date format is invalid.';
    }

}

export function IsLooseDateString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isLooseDateString',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            validator: IsLooseDateStringConstraint,
            options: validationOptions
        });
    };
}


export class DateTransformer implements ValueTransformer {
    to(value: any): string | null {
        if (typeof value === 'string') {
            const date = this.parseDate(value);
            return date ? `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}` : null;
        }
        return null;
    }

    from(value: string): Date | null {
        return this.parseDate(value);
    }

    private parseDate(value: string): Date | null {
        const formats = [
            "DD/MM/YYYY",
            "YYYY/MM/DD",
            "MM/DD/YYYY",
            "YYYY/DD/MM",
            "DD-MM-YYYY",
            "YYYY-MM-DD",
            "MM-DD-YYYY",
            "YYYY-DD-MM"
        ];

        for (const format of formats) {
            if (moment(value, format, true).isValid()) {
                return moment(value, format).toDate();
            }
        }
        return null;
    }
}
