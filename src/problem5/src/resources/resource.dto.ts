import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ActiveFilterEnum } from './resource.enum';

export class ResourceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class ResourceFilterDto {
    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @IsEnum(ActiveFilterEnum)
    isActive?: ActiveFilterEnum;
}

export class UpdateResourceDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}