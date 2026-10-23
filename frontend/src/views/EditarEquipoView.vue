
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  obtenerEquipo,
  actualizarEquipo,
} from '../services/equiposService.js';

const router = useRouter();
const route = useRoute();

const equipo = ref({
  codigoInventario: '',
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  ubicacion: '',
  estado: 'Disponible',
  fechaAdquisicion: '',
  observaciones: '',
});

const cargando = ref(true);
const guardando = ref(false);
const error = ref('');

const cargarEquipo = async () => {
  try {
    const datos = await obtenerEquipo(route.params.id);

    equipo.value = {
      ...datos,
      fechaAdquisicion: datos.fechaAdquisicion?.substring(0, 10),
    };
  } catch (err) {
    error.value = 'No se pudo cargar el equipo.';
  } finally {
    cargando.value = false;
  }
};

const guardarCambios = async () => {
  error.value = '';
  guardando.value = true;

  try {
    const { id, ...datosEquipo } = equipo.value;

    await actualizarEquipo(route.params.id, datosEquipo);

    alert('Equipo actualizado correctamente');
    router.push('/');
  } catch (err) {
    error.value =
      err.response?.data?.message?.join(', ') ||
      'No se pudieron guardar los cambios.';
  } finally {
    guardando.value = false;
  }
};

onMounted(() => {
  cargarEquipo();
});
</script>

<template>
  <main class="pagina">
    <section class="encabezado">
      <div>
        <span class="etiqueta">INVENTARIO TECNOLÓGICO</span>
        <h1>Editar equipo</h1>
        <p>Modifica la información del equipo seleccionado.</p>
      </div>


    </section>

    <section class="tarjeta">
      <div v-if="cargando" class="cargando">
        <p>Cargando información del equipo...</p>
      </div>

      <div v-else-if="error && !equipo.codigoInventario">
        <p class="error">{{ error }}</p>
        <button type="button" class="boton-cancelar" @click="router.push('/')">
          Volver al inventario
        </button>
      </div>

      <template v-else>
        <div class="titulo-formulario">
          <h2>Información del equipo</h2>
          <p>Modifica los campos que necesites actualizar.</p>
        </div>

        <form @submit.prevent="guardarCambios">
          <div class="formulario-grid">
            <div class="campo">
              <label for="codigo">Código de inventario *</label>
              <input
                id="codigo"
                v-model="equipo.codigoInventario"
                required
                minlength="3"
                maxlength="50"
              />
            </div>

            <div class="campo">
              <label for="nombre">Nombre del equipo *</label>
              <input
                id="nombre"
                v-model="equipo.nombre"
                required
                minlength="3"
                maxlength="100"
              />
            </div>

            <div class="campo">
              <label for="tipo">Tipo de equipo *</label>
              <input id="tipo" v-model="equipo.tipo" required />
            </div>

            <div class="campo">
              <label for="marca">Marca *</label>
              <input id="marca" v-model="equipo.marca" required />
            </div>

            <div class="campo">
              <label for="modelo">Modelo *</label>
              <input id="modelo" v-model="equipo.modelo" required />
            </div>

            <div class="campo">
              <label for="ubicacion">Ubicación *</label>
              <input id="ubicacion" v-model="equipo.ubicacion" required />
            </div>

            <div class="campo">
              <label for="estado">Estado del equipo *</label>
              <select id="estado" v-model="equipo.estado" required>
                <option value="Disponible">Disponible</option>
                <option value="En uso">En uso</option>
                <option value="Mantención">Mantención</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div class="campo">
              <label for="fecha">Fecha de adquisición *</label>
              <input
                id="fecha"
                v-model="equipo.fechaAdquisicion"
                type="date"
                required
              />
            </div>

            <div class="campo campo-completo">
              <label for="observaciones">Observaciones</label>
              <textarea
                id="observaciones"
                v-model="equipo.observaciones"
                placeholder="Agrega información adicional sobre el equipo..."
                rows="4"
              ></textarea>
            </div>
          </div>

          <p v-if="error" class="error">{{ error }}</p>

          <div class="acciones">
            <button
              type="button"
              class="boton-cancelar"
              @click="router.push('/')"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="boton-guardar"
              :disabled="guardando"
            >
              {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </form>
      </template>
    </section>

    <p class="nota">Sistema de Inventario de Equipamiento Tecnológico</p>
  </main>
</template>

<style scoped>
.pagina {
  max-width: 1050px;
  margin: 35px auto;
  padding: 0 25px;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.etiqueta {
  color: #2563eb;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h1 {
  color: #1e3a5f;
  font-size: 29px;
  margin: 9px 0;
}

.encabezado p,
.titulo-formulario p {
  color: #64748b;
  margin: 0;
  font-size: 14px;
}

.icono {
  width: 55px;
  height: 55px;
  background: #dbeafe;
  color: #2563eb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.tarjeta {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
}

.titulo-formulario {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 20px;
  margin-bottom: 25px;
}

h2 {
  color: #1e3a5f;
  font-size: 19px;
  margin: 0 0 7px;
}

.formulario-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo-completo {
  grid-column: 1 / -1;
}

label {
  color: #334155;
  font-size: 14px;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 13px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: #334155;
  background: white;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.acciones {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid #e2e8f0;
}

button {
  padding: 12px 20px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.boton-cancelar {
  background: white;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.boton-cancelar:hover {
  background: #f1f5f9;
}

.boton-guardar {
  background: #2563eb;
  color: white;
  border: none;
}

.boton-guardar:hover {
  background: #1d4ed8;
}

.boton-guardar:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.error {
  background: #fee2e2;
  color: #b91c1c;
  padding: 12px;
  border-radius: 7px;
  font-size: 14px;
}

.cargando {
  text-align: center;
  padding: 35px;
  color: #64748b;
}

.nota {
  text-align: center;
  color: #94a3b8;
  font-size: 12px;
  margin-top: 22px;
}

@media (max-width: 650px) {
  .pagina {
    padding: 0 14px;
    margin: 20px auto;
  }

  .tarjeta {
    padding: 20px;
  }

  .formulario-grid {
    grid-template-columns: 1fr;
  }

  .campo-completo {
    grid-column: auto;
  }

  h1 {
    font-size: 23px;
  }

  .acciones {
    flex-direction: column-reverse;
  }

  button {
    width: 100%;
  }
}
</style>
