<template>
  <div class="app">
    <div id="wrapper">
    <router-view @authenticated="setAuthenticated" />
    </div>
    <div id="warning-message">
      <h3>Oops! UON Telemetry is Only Viewable in Landscape Mode. Please Turn Your Phone.
      </h3>
    </div>
  </div>
</template>

<script>
// import { bus } from './main'

export default {
  name: 'App',
  mounted() {
    if(this.authenticated===true) {
      this.$router.replace({ name: "login" });
    }
  },
  components: {
  },

  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
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
/* Only allow Landscape view as graph is too small in Portrait */
#warning-message { display: none;
font-weight: bold;
color: #13117b;
padding-top:1%;
}

@media only screen and (max-width: 490px){
  #wrapper { display:none; }
  #warning-message { display:block; }
}
@media only screen and (orientation:landscape){
  #warning-message { display:none; }
}



</style>
