<template>
    <div class="Live_Page">
        <div class="title">Live Slip Data Graph</div>
        <Plotter/>
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
      left: ;
        font-size: x-large;
        font-weight: bolder;
        color: rgba(19, 17, 123, 1);
    }

    .Live_Page {

    }


</style>