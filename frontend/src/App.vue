<template>
    <div class="app">
        <div class="top-left"><img src="./assets/logo.svg" alt="oops"></div>
        <div class="warning">Clicking saved data pauses live-data: <br>To restart live-data click refresh</div>
        <button class="button1">
        <router-link :to="{ name: 'Live' }">Live Data Plot</router-link>
        </button>
        <h1>        </h1>
        <button class="button2">
        <router-link to="/Saved" @click.native="globalPageChangeOff">Saved Data Plot</router-link>
        </button>
        <router-view class="Style"></router-view>
    </div>
</template>

<script>
    import { bus } from './main'
    export default {
        name: 'App',
        components: {},
        methods: {
            globalPageChangeOff() {
                bus.$emit('changeItOff', 'changed page off');
                //console.log("hello");
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
        margin-top: 60px;
    }

    .top-left {
        position: absolute;
        top: 8px;
        left: 16px;
    }
    .button1 {
        font-size: x-large;
        font-weight: bolder;
        position: absolute;
        top: 5%;
        left:35%;
        background-color: #d3d3d3;
        color: purple;
        border: 2px solid rgba(19, 17, 123, 1);
    }

    .button1:hover {
        background-color: rgba(19, 17, 123, 0.5);
        color: white;
    }
    .button2 {
        font-size: x-large;
        font-weight: bolder;
        position: absolute;
        top: 5%;
        right:25%;
        background-color: lightgrey;
        color: purple;
        border: 2px solid rgba(19, 17, 123, 1);
    }

    .button2:hover {
        background-color: rgba(19, 17, 123, 0.5);
        color: white;
    }
    .Style {
        position: relative;
        top: 50px;
    }
    .warning{
        position:absolute;
        top: 120px;
        left: 20px;
        font-weight: bolder;
        color: rgba(19, 17, 123, 1) ;

    }


</style>
