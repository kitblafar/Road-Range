<template>
    <div id="Saved-Page">
        <div class="title">Plotting Saved Values</div>
        <PlotterSaved/>
    </div>
</template>

<script>
    import PlotterSaved from './PlotterSaved.vue';
    export default {
        name: "SavedPage",
        components: {PlotterSaved},

    };

</script>

<style scoped>
    .title {
        position: center;
        top: 100px;
        font-size: x-large;
        font-weight: bolder;
        color: rgba(19, 17, 123, 1);
    }
    #Saved-Page{
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>