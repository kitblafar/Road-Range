<template>
    <canvas id="sensor-chart"></canvas>
</template>

<script>
    import Chart from 'chart.js';
    import arduinoData from '../Data.js';
    export default {
        name: "Plotter",
        mounted() {
            console.log(arduinoData);
            this.createChart('sensor-chart', arduinoData);
            console.log("chart created");
        },
        methods: {
            data() {
                return {
                    arduinoData: arduinoData,
                }
            },
            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                const myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
                console.log(myChart);
            },
        },

    }


</script>

<style scoped>

</style>