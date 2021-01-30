<template>
    <div id="app">
        <div class="top-left"><img src="./assets/logo.svg"></div>
        <button class="button1">
        <router-link :to="{ name: 'Live' }">Live Data Plot</router-link>
        </button>
        <h1>        </h1>
        <button class="button2">
        <router-link to="/Saved">Saved Data Plot</router-link>
        </button>
        <router-view class="Style"></router-view>
    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {
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
    .button1 {
        font-size: x-large;
        font-weight: bolder;
        position: absolute;
        top: 10%;
        left:35%;
        background-color: lightgrey;
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
        top: 10%;
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


</style>
