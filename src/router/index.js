import { createRouter, createWebHistory } from 'vue-router'
import ProspectosPrincipal from '@/components/ProspectosPrincipal.vue'
import ProspectosEspecificos from '@/components/ProspectosEspecificos.vue'
import AgregarProspecto from '@/components/AgregarProspecto.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: ProspectosPrincipal
  },
  {
    path: '/ProspectosEspecificos/:id/:editar',
    name: ProspectosEspecificos,
    component: ProspectosEspecificos
  },
  {
    path:'/AgregarProspecto',
    name:AgregarProspecto,
    component:AgregarProspecto
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
