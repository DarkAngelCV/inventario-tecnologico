import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EquiposController } from './equipos.controller.js';
import { EquiposService } from './equipos.service.js';

describe('EquiposController', () => {
let controller: EquiposController;

const equiposService = {
    findAll: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
};

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
};

beforeEach(() => {
    vi.clearAllMocks();
    controller = new EquiposController(
    equiposService as unknown as EquiposService,
    );
});

it('debería obtener todos los equipos', async () => {
    equiposService.findAll.mockResolvedValue([equipoEjemplo]);

    const resultado = await controller.findAll();

    expect(resultado).toEqual([equipoEjemplo]);
    expect(equiposService.findAll).toHaveBeenCalled();
});

it('debería obtener un equipo por ID', async () => {
    equiposService.findOne.mockResolvedValue(equipoEjemplo);

    const resultado = await controller.findOne(1);

    expect(resultado).toEqual(equipoEjemplo);
    expect(equiposService.findOne).toHaveBeenCalledWith(1);
});

it('debería crear un equipo', async () => {
    equiposService.create.mockResolvedValue(equipoEjemplo);

    const resultado = await controller.create(equipoEjemplo);

    expect(resultado).toEqual(equipoEjemplo);
    expect(equiposService.create).toHaveBeenCalledWith(equipoEjemplo);
});

it('debería actualizar un equipo', async () => {
    const datos = { nombre: 'Notebook actualizado' };
    equiposService.update.mockResolvedValue(equipoEjemplo);

    const resultado = await controller.update(1, datos);

    expect(resultado).toEqual(equipoEjemplo);
    expect(equiposService.update).toHaveBeenCalledWith(1, datos);
});

it('debería eliminar un equipo', async () => {
    equiposService.remove.mockResolvedValue(undefined);

    const resultado = await controller.remove(1);

    expect(resultado).toBeUndefined();
    expect(equiposService.remove).toHaveBeenCalledWith(1);
});
});