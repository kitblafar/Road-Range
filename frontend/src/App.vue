<template>
    <div id="app">
        <div class="top-left"><img src="./assets/logo.svg"></div>
        <div class="title">Live Slip Data Graph</div>
        <Plotter/>
    </div>
</template>

<script>
    import Plotter from './components/Plotter.vue'

    export default {
        name: 'App',
        components: {
            Plotter
        },
    }

</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .top-left {
        position: absolute;
        top: 8px;
        left: 16px;
    }

    .title {
        position: center;
        font-size: x-large;
        font-weight: bolder;
        color: rgba(19, 17, 123, 1);
    }
</style>
