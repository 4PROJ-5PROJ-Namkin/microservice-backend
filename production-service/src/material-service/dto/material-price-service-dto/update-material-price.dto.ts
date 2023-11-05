import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMaterialPriceDto } from './create-material-price.dto';

export class UpdateMaterialPriceDto extends PartialType(OmitType(CreateMaterialPriceDto, ['materialId'] as const)) {}
