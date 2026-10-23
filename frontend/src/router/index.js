
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CrearEquipoView from '../views/CrearEquipoView.vue';
import EditarEquipoView from '../views/EditarEquipoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: HomeView,
    },
    {
      path: '/crear',
      name: 'crear-equipo',
      component: CrearEquipoView,
    },
    {
      path: '/editar/:id',
      name: 'editar-equipo',
      component: EditarEquipoView,
    },
  ],
});

export default router;
