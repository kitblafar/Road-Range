<template>
    <div id="app">
        <div class="top-left"><img src="./assets/logo.svg"></div>
        <LivePage/>
        <SavedPage/>
    </div>
</template>

<script>
    import LivePage from './components/LivePage.vue';
    import SavedPage from './components/SavedPage';

    export default {
        name: 'App',
        components: {
            LivePage,
            SavedPage,
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


</style>
