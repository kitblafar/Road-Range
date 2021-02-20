<template>
    <div id="Saved-Page">
        <div class="title">Plotting Saved Values</div>
        <CustomSelect/>
        <PlotterSaved class="plotter"></PlotterSaved>
    </div>
</template>

<script>
    import PlotterSaved from './PlotterSaved.vue';
    import CustomSelect from "@/components/CustomSelect";
    export default {
        name: "SavedPage",
        components: {
            PlotterSaved,
            CustomSelect},

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