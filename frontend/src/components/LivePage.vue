<template>
  <div class="Live_Page">
    <header class="page-header">
      <TopNavBar/>
    </header>
    <div class="button-holder">
      <button class="button" @click=this.zoomReset>Zoom Reset</button>
    </div>
    <div class="title">Live Slip Data Graph</div>
    <Plotter class="plotter"/>
  </div>
</template>

<script>
import Plotter from './LivePlotter.vue'
import {bus} from "@/main";
import TopNavBar from "@/components/TopNavBar";

export default {
  name: "LivePage",
  components: {Plotter,
  TopNavBar},
  methods: {
    zoomReset() {
      bus.$emit("Zoom Reset1 ", "Zoom");
    },
  }
}
</script>

<style scoped>
.button {
  /*display: block;*/
  color: rgba(19, 17, 123, 1);
  /*text-align: center;*/
  font-size: medium;
  font-weight: bold;
  text-decoration: none;
}

.button:hover {
  background-color: lightblue;
}

.button-holder{
  float: left;
  padding-left: 3%;
  padding-bottom: 1%;
  padding-top: 3%;
}

.title {
  position: relative;
  padding-top: 3%;
  font-size: x-large;
  font-weight: bolder;
  color: rgba(19, 17, 123, 1);
}

.plotter {
  position: relative;
  top: 40px;
}

</style>