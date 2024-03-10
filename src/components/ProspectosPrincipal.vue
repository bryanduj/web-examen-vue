
<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">


  <div>
    <button class="Agregar" @click="agregarProspecto()"></button>
    <h1>Listado de Prospectos</h1>
    <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="row">#</th>
      <th scope="row">Nombre</th>
      <th scope="row">Primer Apellido</th>
      <th scope="row">Segundo Apellido</th>
      <th scopet="row">Estatus</th>
      <th scopet="row">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="prospecto in prospectos" :key="prospecto.ProspectoID">
      <td scope="row">{{ prospecto.ProspectoID }}</td>
      <td scope="row">{{ prospecto.Nombre }}</td>
      <td>{{ prospecto.PrimerApellido }}</td>
      <td>{{ prospecto.SegundoApellido }}</td>
      <td>{{ getStatusText(prospecto.Estatus) }} </td>
      <td><button class="Eye" @click="verDetalle(prospecto.ProspectoID)"><i class="fa-solid fa-eye"></i></button><button v-if="prospecto.Estatus==1" class="Eye" :style="{ backgroundImage: 'url(' + require('/src/assets/editar.png') + ')' }"@click="actualizarProspecto(prospecto.ProspectoID)"><i class="fa-solid fa-eye"></i></button></td>
    </tr>
  </tbody>
</table>
  </div>
</template>



<script>
import axios from 'axios'; // Importar Axios

export default {
  data() {
    return {
      prospectos: []
    };
  },
  mounted() {
    // Lógica para obtener los datos de los prospectos desde la API
    this.obtenerProspectos();
  },
  methods: {
    getStatusText(status) {
      switch (status) {
        case 1:
          return 'Por revisar';
        case 2:
          return 'Autorizado';
        case 3:
          return 'Rechazado';
        default:
          return 'Estado desconocido';
      }
    },
    async obtenerProspectos() {
      try {
        const response = await axios.get('http://localhost/prospectos');
        this.prospectos = response.data;
      } catch (error) {
        console.error('Error al obtener los prospectos:', error);
      }
    },
    agregarProspecto(){
      this.$router.push('/AgregarProspecto')
    },
    actualizarProspecto(prospecto){
      this.$router.push(`/ProspectosEspecificos/${prospecto}/1`);
    },
    verDetalle(prospecto) {
      // Navegar a la pantalla de detalles del prospecto utilizando Vue Router
        this.$router.push(`/ProspectosEspecificos/${prospecto}/0`);

    }
  }
};
</script>


<style>
  /* Estilos para la tabla */
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #ddd;
    margin: auto; /* Centra la tabla horizontalmente */
  }
  .Eye{
    display: inline-block;
    width: 2em; 
    height: 2em; 
    background-image: url('../assets/ojo.png');
    background-size: cover;
    border: none;
    background-color: white;
  }
  .Agregar{
    display: inline-block;
    width: 5em; 
    height: 5em; 
    background-image: url('../assets/Persona.png');
    background-size: cover;
    background-color: white;
    border: none;
  }
  /* Estilos para las celdas del encabezado */
  th {
    padding: 12px;
    text-align: center;
    background-color: #f2f2f2;
    border: 1px solid #ddd;
  }

  /* Estilos para las celdas de datos */
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  /* Estilos para las filas alternas */
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
