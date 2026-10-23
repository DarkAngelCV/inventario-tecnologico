import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './equipo.entity.js';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) {}

  // Obtener todos los equipos
  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find();
  }

  // Obtener un equipo por su ID
  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOneBy({ id });

    if (!equipo) {
      throw new NotFoundException(
        `No se encontró el equipo con ID ${id}`,
      );
    }

    return equipo;
  }

  // Crear un equipo
  async create(datos: Partial<Equipo>): Promise<Equipo> {
    const equipo = this.equipoRepository.create(datos);
    return this.equipoRepository.save(equipo);
  }

  // Actualizar un equipo
  async update(
    id: number,
    datos: Partial<Equipo>,
  ): Promise<Equipo> {
    const equipo = await this.findOne(id);

    const equipoActualizado = this.equipoRepository.merge(
      equipo,
      datos,
    );

    return this.equipoRepository.save(equipoActualizado);
  }

  // Eliminar un equipo
  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id);
    await this.equipoRepository.remove(equipo);
  }
}