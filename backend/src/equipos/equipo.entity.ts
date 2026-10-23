import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  codigoInventario: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  tipo: string;

  @Column({ length: 100 })
  marca: string;

  @Column({ length: 100 })
  modelo: string;

  @Column({ length: 150 })
  ubicacion: string;

  @Column({
    type: 'enum',
    enum: ['Disponible', 'En uso', 'Mantención', 'Baja'],
  })
  estado: string;

  @Column({ type: 'date' })
  fechaAdquisicion: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}