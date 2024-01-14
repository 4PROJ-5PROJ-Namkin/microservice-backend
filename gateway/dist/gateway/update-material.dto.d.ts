import { CreateMaterialDto } from './create-material.dto';
declare const UpdateOneMaterialDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMaterialDto>>;
export declare class UpdateOneMaterialDto extends UpdateOneMaterialDto_base {
    name?: string;
}
declare const UpdateMaterialDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMaterialDto>>;
export declare class UpdateMaterialDto extends UpdateMaterialDto_base {
    id: number;
    name?: string;
}
export declare class UpdateManyMaterialsDto {
    materials: UpdateMaterialDto[];
}
export {};
