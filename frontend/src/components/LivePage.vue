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
        position: center;
        font-size: x-large;
        font-weight: bolder;
        color: rgba(19, 17, 123, 1);
    }

    .Live_Page {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }


</style>