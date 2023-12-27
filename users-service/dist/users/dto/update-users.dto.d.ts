import { CreateUsersDto } from './create-users.dto';
declare const UpdateUsersDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUsersDto>>;
export declare class UpdateUsersDto extends UpdateUsersDto_base {
    readonly password: string;
}
export {};
