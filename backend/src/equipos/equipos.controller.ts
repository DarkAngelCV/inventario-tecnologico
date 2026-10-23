import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { EquiposService } from './equipos.service.js';
import { CrearEquipoDto } from './dto/crear-equipo.dto.js';
import { ActualizarEquipoDto } from './dto/actualizar-equipo.dto.js';

@Controller('equipos')
export class EquiposController {
  constructor(
    private readonly equiposService: EquiposService,
  ) {}

  // GET: Obtener todos los equipos
  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  // GET: Obtener un equipo por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.findOne(id);
  }

  // POST: Crear un equipo
  @Post()
  create(@Body() datos: CrearEquipoDto) {
    return this.equiposService.create(datos);
  }

  // PATCH: Actualizar un equipo
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: ActualizarEquipoDto,
  ) {
    return this.equiposService.update(id, datos);
  }

  // DELETE: Eliminar un equipo
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.remove(id);
  }
}