<template>
    <div id="Saved-Page">
      <header class="page-header">
        <TopNavBar/>
      </header>
        <CustomSelect/>
        <div class="title">Plotting Saved Values</div>
        <PlotterSaved class="plotter"></PlotterSaved>
    </div>
</template>

<script>
    import PlotterSaved from './SavedPlotter.vue';
    import CustomSelect from "@/components/CustomSelect";
    import TopNavBar from "@/components/TopNavBar";
    export default {
        name: "SavedPage",
        components: {
            PlotterSaved,
            CustomSelect,
            TopNavBar
        },

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