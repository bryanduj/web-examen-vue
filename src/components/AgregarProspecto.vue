<template>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
          <div class="Derecha">
            <button @click="exit()" ></button>
          </div>
          <div class="Principal">
      <h2>Formulario de Prospectos</h2>
      <form @submit.prevent="enviarFormulario">
        <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* Nombre del prospecto</span>
  </div>
  <input type="text"  v-model="nombre" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* Primer apellido</span>
  </div>
  <input type="text"  v-model="primerApellido" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">Segundo apellido</span>
  </div>
  <input type="text"  v-model="segundoApellido" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* Calle</span>
  </div>
  <input type="text"  v-model="calle" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* Numero de casa</span>
  </div>
  <input type="text"  v-model="numero" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* Colonia</span>
  </div>
  <input type="text"  v-model="colonia" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* Código postal</span>
  </div>
  <input type="text"  v-model="codigoPostal" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* Teléfono</span>
  </div>
  <input type="text"  v-model="telefono" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">* RFC</span>
  </div>
  <input type="text"  v-model="rfc" required class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div>
<!-- Agrega un campo de carga de archivos para la imagen -->
<div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupFileAddon01">Subir imagen</span>
        </div>
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile01" @change="handleFileInputChange">
        </div>
    </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        calle: '',
        numero: '',
        colonia: '',
        codigoPostal: '',
        telefono: '',
        rfc: '',
        inputId: ''
      };
    },
    methods: {
      handleFileInputChange(event) {
   this.file = event.target.files[0];
    const reader = new FileReader();
    this.idValue = event.target.id;
    reader.onloadend = () => {
        // El contenido del archivo en formato base64 estará en reader.result
        this.base64String = reader.result;
        // Aquí puedes hacer lo que necesites con la cadena base64, como enviarla al servidor
        console.log(this.base64String);
        console.log(this.file.name);
    };
    reader.readAsDataURL(this.file);
},
      exit(){
        const nuevoProspecto = confirm('Si sale perderá los datos sin confirmar');
        if (nuevoProspecto) {
          this.$router.push('/');
      }
      },
      enviarFormulario() {
        // Crear un objeto con los datos del formulario
        const formData = {
            nombre: this.nombre,
            primerApellido: this.primerApellido,
            segundoApellido: this.segundoApellido,
            calle: this.calle,
            numero: this.numero,
            colonia: this.colonia,
            codigoPostal: this.codigoPostal,
            telefono: this.telefono,
            rfc: this.rfc,
            estatus:1,
            empleadoCreo: 2,
            empleadoModifico: 2,
            nombreDocumento: this.file.name,
            archivo:this.base64String
        };
  
        // Realizar la solicitud POST a la API
        fetch('http://localhost/prospectos', {
          method: 'POST',
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
          alert('Prospecto Agregado con éxito!');
          const nuevoProspecto = confirm('¿Desea agregar otro prospecto?');
      if (nuevoProspecto) {
        this.limpiarFormulario();
      }
      else{
        this.$router.push('/');
      }
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
  limpiarFormulario() {
    // Limpiar los campos del formulario
    this.nombre = '';
    this.primerApellido = '';
    this.segundoApellido = '';
    this.calle = '';
    this.numero = '';
    this.colonia = '';
    this.codigoPostal = '';
    this.telefono = '';
    this.rfc = '';
  }
}
  };
  </script>
  <style>
    .Principal{
       width: 500px; margin: 0 auto; text-align: center;
    }
    .Derecha{
      text-align: right;
      margin-right: 2%;
      margin-top: 2%;
    }
    .Derecha button {
    /* Estilo del botón */
    background-color: transparent; /* Fondo transparente para que se pueda ver la imagen */
    border: none; /* Sin bordes */
    width: 60px; /* Ancho del botón */
    height: 60px; /* Alto del botón */
    /* Ajusta el tamaño de la imagen según el tamaño del botón */
    background-size: cover;
    background-position: center;
    /* Agrega la imagen de fondo */
    background-image: url('/src/assets/Exit.png'); /* Ruta de tu imagen */
}
</style>