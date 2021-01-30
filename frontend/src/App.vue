<template>
    <div id="app">
        <div class="top-left"><img src="./assets/logo.svg"></div>
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
    .button2 {
        font-size: x-large;
        font-weight: bolder;
        position: center;
        top: 10%;
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


</style>
