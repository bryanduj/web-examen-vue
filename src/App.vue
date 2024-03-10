<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/AgregarProspecto">Agregar prospecto</router-link> |   
  </nav>
  <router-view/>
</template>
<style>
 .disabled-link {
    pointer-events: none; /* Deshabilita los eventos de clic */

  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #495168;
}

nav {
  padding: 30px;
  background-color: #06203a;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
