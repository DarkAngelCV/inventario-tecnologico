<script setup>
import { ref, onMounted } from 'vue';
import { obtenerEquipos,  eliminarEquipo as eliminarEquipoAPI,} from '../services/equiposService.js';

const equipos = ref([]);
const cargando = ref(false);
const error = ref('');
const busqueda = ref('');
const filtroEstado = ref('');

const cargarEquipos = async () => {
  cargando.value = true;
  error.value = '';

  try {
    equipos.value = await obtenerEquipos();
  } catch (err) {
    error.value = 'No se pudieron cargar los equipos. Verifica que el servidor esté funcionando.';
    console.error(err);
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  cargarEquipos();
});

const equiposFiltrados = () => {
  return equipos.value.filter((equipo) => {
    const texto = busqueda.value.toLowerCase();

    const coincideTexto =
      equipo.codigoInventario.toLowerCase().includes(texto) ||
      equipo.nombre.toLowerCase().includes(texto) ||
      equipo.tipo.toLowerCase().includes(texto) ||
      equipo.ubicacion.toLowerCase().includes(texto);

    const coincideEstado =
      filtroEstado.value === '' ||
      equipo.estado === filtroEstado.value;

    return coincideTexto && coincideEstado;
  });
};

const eliminarEquipo = async (id) => {
  const confirmar = window.confirm(
    '¿Estás seguro de que deseas eliminar este equipo?'
  );

  if (!confirmar) {
    return;
  }

  try {
    await eliminarEquipoAPI(id);
    alert('Equipo eliminado correctamente');
    await cargarEquipos();
  } catch (err) {
    alert('No se pudo eliminar el equipo.');
    console.error(err);
  }
};

</script>

<template>
  <main class="contenedor">
    <h1>Sistema de Inventario de Equipamiento Tecnológico</h1>

    <p>Listado de equipos registrados en el inventario.</p>

    <button @click="$router.push('/crear')">
      + Nuevo equipo
    </button>

    <button @click="cargarEquipos">
      Actualizar listado
    </button>


    <div class="filtros">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por código, nombre, tipo o ubicación..."
      />

      <select v-model="filtroEstado">
      <option value="">Todos los estados</option>
      <option value="Disponible">Disponible</option>
      <option value="En uso">En uso</option>
      <option value="Mantención">Mantención</option>
      <option value="Baja">Baja</option>
      </select>
    </div>


    <p v-if="cargando">Cargando equipos...</p>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <table v-if="!cargando && !error && equipos.length > 0">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Ubicación</th>
          <th>Estado</th>
          <th>Fecha adquisición</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="equipo in equiposFiltrados()" :key="equipo.id">
          <td>{{ equipo.codigoInventario }}</td>
          <td>{{ equipo.nombre }}</td>
          <td>{{ equipo.tipo }}</td>
          <td>{{ equipo.marca }}</td>
          <td>{{ equipo.modelo }}</td>
          <td>{{ equipo.ubicacion }}</td>
          <td>{{ equipo.estado }}</td>
          <td>{{ equipo.fechaAdquisicion }}</td>
          <td>
          <button @click="$router.push(`/editar/${equipo.id}`)">
          Editar
          </button>
          <button @click="eliminarEquipo(equipo.id)">
          Eliminar
          </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!cargando && !error && equipos.length === 0">No hay equipos registrados.</p>
    <p v-else-if="!cargando && !error && equiposFiltrados().length === 0">
      No se encontraron equipos con los filtros aplicados.
    </p>
  </main>
</template>


<style scoped>
.contenedor {
  padding: 35px;
  max-width: 1400px;
  margin: 30px auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
}

h1 {
  color: #1e3a5f;
  font-size: 28px;
  margin-bottom: 10px;
}

p {
  color: #555;
}

button {
  padding: 10px 18px;
  margin: 8px 5px 8px 0;
  border: none;
  border-radius: 6px;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #1d4ed8;
}

.filtros {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

.filtros input,
.filtros select {
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.filtros input {
  flex: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px;
}

th,
td {
  border-bottom: 1px solid #ddd;
  padding: 13px 10px;
  text-align: left;
}

th {
  background-color: #1e3a5f;
  color: white;
}

tbody tr:hover {
  background-color: #f1f5f9;
}

td button:last-child {
  background-color: #dc2626;
}

td button:last-child:hover {
  background-color: #b91c1c;
}

.error {
  color: #dc2626;
  font-weight: bold;
}

@media (max-width: 800px) {
  .contenedor {
    padding: 15px;
    overflow-x: auto;
  }

  .filtros {
    flex-direction: column;
  }
}
</style>
