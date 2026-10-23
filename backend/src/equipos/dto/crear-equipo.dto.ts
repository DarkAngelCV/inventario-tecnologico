import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsIn,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CrearEquipoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  codigoInventario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsString()
  @IsIn(['Disponible', 'En uso', 'Mantención', 'Baja'])
  estado: string;

  @IsDateString()
  fechaAdquisicion: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}