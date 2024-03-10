<template>

    <div>
      <!-- Mostrar información del prospecto -->
      <div v-if="prospectoData">
        <h1>Información del Prospecto</h1>
        <p>
  Nombre: {{ prospectoData.Nombre }} 
  {{ prospectoData.PrimerApellido }} 
  {{ prospectoData.SegundoApellido ? prospectoData.SegundoApellido : '' }}
</p>
        <p>Calle: {{ prospectoData.Calle }}</p>
        <p>Número: {{ prospectoData.Numero }}</p>
        <p>Colonia: {{ prospectoData.Colonia }}</p>
        <p>Código Postal: {{ prospectoData.CodigoPostal }}</p>
        <p>Teléfono: {{ prospectoData.Telefono }}</p>
        <p>RFC: {{ prospectoData.RFC }}</p>
        <p>Estatus: {{ getStatusText(prospectoData.Estatus) }}</p>
        <p v-if="prospectoData.Comentarios">Comentarios: {{ prospectoData.Comentarios }}</p>
        <p>Documento:{{ prospectoData.NombreDocumento }} <button @click="verdocumento()">
        <img class="abrir" src="../assets/ojo.png">
      </button> </p>
 <!-- Botón para abrir el modal -->
 

      <!-- Modal -->
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <!-- Botón para cerrar el modal -->
          <button @click="showModal = false" class="close">&times;</button>
          <!-- Contenido del PDF -->
          <embed :src="getDocumentoSrc()" type="application/pdf" width="100%" height="500px"/>
        </div>
      </div>
      </div>
      <div class="long" v-if="validar()">
          <span>Comentarios</span>
          <input  type="text" v-model="comentarios" maxlength="100">
          <div>
            <button @click="aprobar()" class="btn btn-primary" :disabled="comentarios.trim() !=''">Aprobar</button>
          <button @click="rechazar()" class="btn btn-danger" :disabled="comentarios.trim() === ''">Rechazar</button>
          </div>
        </div>
      <!-- Manejo de carga o error -->
      <div v-if="!prospectoData">
        <p>Cargando...</p>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'ProspectosEspecificos',
    data() {
      return {
        showModal: false, // Variable para controlar la visibilidad del modal
        comentarios: '',
        prospectoData: null,
        options: [
      { value: 1, text: this.getStatusText(1) },
      { value: 2, text: this.getStatusText(2) },
      { value: 3, text: this.getStatusText(3) }
    ]
      };
      
    },
    created() {
      // Obtener el parámetro 'id' de la URL
      const prospectoId = this.$route.params.id;
      // Realizar una solicitud a la API utilizando el parámetro 'prospectoId'
      fetch(`http://localhost/prospectos/${prospectoId}`)
        .then(response => response.json())
        .then(data => {
          // Asignar la respuesta de la API a la variable 'prospectoData'
          this.prospectoData = data;
        })
        .catch(error => {
          console.error('Error al obtener datos del prospecto:', error);
        });
    },
    methods: {
      verdocumento() {
      this.showModal = true; // Mostrar el modal al hacer clic en el botón
    },
    getDocumentoSrc() {
      return this.prospectoData.Archivo;
    },
      aprobar() {
        // Crear un objeto con los datos del formulario
        const formData = {
          comentarios:this.comentarios,
            estatus:2,
            empleadoModifico: 2
        };
  
        // Realizar la solicitud POST a la API
        fetch(`http://localhost/prospectos/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
            alert('¡No se puede completar la solicitud!');
          }
          alert('Prospecto modificado con éxito!');
        this.$router.push('/');
          return response.json();
        })
        .then(data => {
          console.log('Respuesta de la API:', data);
          // Aquí puedes manejar la respuesta de la API según sea necesario
        })
        .catch(error => {
      console.error('Error al enviar los datos:', error);
      // Aquí puedes manejar errores de solicitud
    });
  },
  rechazar() {
        // Crear un objeto con los datos del formulario
        const formData = {
          comentarios:this.comentarios,
            estatus:3,
            empleadoModifico: 2
        };
  
        // Realizar la solicitud POST a la API
        fetch(`http://localhost/prospectos/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
            alert('¡No se puede completar la solicitud!');
          }
          alert('Prospecto modificado con éxito!');
        this.$router.push('/');
          return response.json();
        })
        .then(data => {
          console.log('Respuesta de la API:', data);
          // Aquí puedes manejar la respuesta de la API según sea necesario
        })
        .catch(error => {
      console.error('Error al enviar los datos:', error);
      // Aquí puedes manejar errores de solicitud
    });
  },
      validar(){
        const editar=this.$route.params.editar;
        if(editar==1){
          return true;
        }
        return false;
      },
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
      }
    }
  }
  </script>
  <style>
.long{
  width: 100%;
}
.long input[type="text"] {
  width: 50%;
  height: 5em;
}
.modal {
  position: fixed; /* Posición fija */
  z-index: 1; /* Poner el modal por encima de todo */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Habilitar el desplazamiento si es necesario */
  background-color: rgb(0,0,0); /* Fondo oscuro */
  background-color: rgba(0,0,0,0.4); /* Fondo oscuro con opacidad */
}

/* Contenido del modal */
.modal-content {
  background-color: #fefefe; /* Fondo blanco */
  margin: 5% auto; /* Centrar verticalmente */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* 80% del ancho del contenedor padre */
}

/* Botón para cerrar el modal */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Estilos para el botón de abrir */
.abrir {
  display: inline-block;
  width: 1em; 
  height: 1em; 
  background-size: cover;
  border-bottom: none;
  background-color: transparent;
  border: none;
}
  </style>
  