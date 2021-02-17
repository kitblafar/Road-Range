<template>
  <div class="app">
    <header class="page-header">
      <TopNavBar/>
    </header>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>

<script>
// import { bus } from './main'
import TopNavBar from "@/components/TopNavBar";

export default {
  name: 'App',
  components: {
    TopNavBar
  },

  methods: {
    /* globalPageChangeOff() {
        bus.$emit('changeItOff', 'changed page off');
        //console.log("hello");
    }, */
  }
}

</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
