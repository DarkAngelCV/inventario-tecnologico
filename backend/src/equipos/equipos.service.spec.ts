import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { EquiposService } from './equipos.service.js';
import { Equipo } from './equipo.entity.js';

describe('EquiposService', () => {
let service: EquiposService;

const equipoEjemplo = {
    id: 1,
    codigoInventario: 'INV-001',
    nombre: 'Notebook Dell',
    tipo: 'Computador',
    marca: 'Dell',
    modelo: 'Latitude 5420',
    ubicacion: 'Laboratorio',
    estado: 'Disponible',
    fechaAdquisicion: '2024-03-15',
    observaciones: 'Equipo de prueba',
} as Equipo;

const repository = {
    find: vi.fn(),
    findOneBy: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    merge: vi.fn(),
    remove: vi.fn(),
};

beforeEach(() => {
    vi.clearAllMocks();
    service = new EquiposService(repository as any);
});

it('debería obtener todos los equipos', async () => {
    repository.find.mockResolvedValue([equipoEjemplo]);

    const resultado = await service.findAll();

    expect(resultado).toEqual([equipoEjemplo]);
    expect(repository.find).toHaveBeenCalled();
});

it('debería obtener un equipo por su ID', async () => {
    repository.findOneBy.mockResolvedValue(equipoEjemplo);

    const resultado = await service.findOne(1);

    expect(resultado).toEqual(equipoEjemplo);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
});

it('debería lanzar un error si el equipo no existe', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(
    NotFoundException,
    );
});

it('debería crear un equipo', async () => {
    repository.create.mockReturnValue(equipoEjemplo);
    repository.save.mockResolvedValue(equipoEjemplo);

    const resultado = await service.create(equipoEjemplo);

    expect(resultado).toEqual(equipoEjemplo);
    expect(repository.create).toHaveBeenCalledWith(equipoEjemplo);
    expect(repository.save).toHaveBeenCalledWith(equipoEjemplo);
});

it('debería actualizar un equipo', async () => {
    repository.findOneBy.mockResolvedValue(equipoEjemplo);
    repository.merge.mockReturnValue(equipoEjemplo);
    repository.save.mockResolvedValue(equipoEjemplo);

    const resultado = await service.update(1, {
    nombre: 'Notebook actualizado',
    });

    expect(resultado).toEqual(equipoEjemplo);
    expect(repository.merge).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
});

it('debería eliminar un equipo', async () => {
    repository.findOneBy.mockResolvedValue(equipoEjemplo);
    repository.remove.mockResolvedValue(equipoEjemplo);

    await service.remove(1);

    expect(repository.remove).toHaveBeenCalledWith(equipoEjemplo);
});
});