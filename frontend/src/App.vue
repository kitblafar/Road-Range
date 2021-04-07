<template>

  <div class="app">
    <div id="wrapper">
    <div id="nav">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace></router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
    </div>
    <div id="warning-message">
      this website is only viewable in landscape mode
    </div>
  </div>
</template>

<script>
// import { bus } from './main'

export default {
  name: 'App',
  mounted() {
    if(!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  components: {
  },

  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
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
}

#warning-message { display: none; }
@media only screen and (orientation:portrait){
  #wrapper { display:none; }
  #warning-message { display:block; }
}
@media only screen and (orientation:landscape){
  #warning-message { display:none; }
}



</style>
