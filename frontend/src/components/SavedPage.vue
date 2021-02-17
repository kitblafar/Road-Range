<template>
    <div id="Saved-Page">
        <div class="title">Plotting Saved Values</div>
        <PlotterSaved class="plotter"/>
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
      position: relative;
      top: 20px;
      font-size: x-large;
      font-weight: bolder;
      color: rgba(19, 17, 123, 1);
    }

    .plotter {
      position: relative;
      top: 40px;
    }

</style>