<template>
  <div class="Live_Page">
    <div class="title">Live Slip Data Graph</div>
    <Plotter class="plotter"/>
  </div>
</template>

<script>
import Plotter from './Plotter.vue'

export default {
  name: "LivePage",
  components: {Plotter}
}
</script>

<style scoped>
.title {
  position: relative;
  top: 20px;
  font-size: x-large;
  font-weight: bolder;
  color: rgba(19, 17, 123, 1);
}

.plotter {
  position: relative;
  top: 40px;
}


</style>