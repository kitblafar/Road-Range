<template>
    <div id="app">
        chart
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
</style>
