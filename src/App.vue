<template>
  <div id="app">
    <MainMap/>
    <Sidebar/>
  </div>
</template>

<script>
import MainMap from './components/MainMap.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
  components: {
    MainMap,
    Sidebar,
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>
