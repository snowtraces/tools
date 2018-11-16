<template>
  <div id="app">
    <router-view/>
    <msg></msg>
  </div>
</template>

<script>
import Msg from './components/Msg'
export default {
  name: 'App',
  components: {Msg}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input, button {
  border: none;
}
.has-shadow {
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
}
.is-hidden {
  display: none;
}
.error-msg{
  color: #f00;
}
.success-msg{
  color: #2196F3;
}
</style>
