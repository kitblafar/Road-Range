<template>
    <canvas id="sensor-chart"></canvas>
</template>

<script>
    import Chart from 'chart.js';
    // Create WebSocket connection.

    let arduinoData = {
        type: 'line',
        data: {
            labels: [], //put time in here
            datasets: [{
                data: [],
                //put arduino data in here
                label: "Arduino-Data",
                backgroundColor: 'rgba(19,17,123,0.5)'
            },
            ],
        },

        options: {
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Number",
                    },
                    ticks: {
                        padding: 25,
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Time(ms)",
                    },
                }]
            }
        },
    };

    export default {

        name: "Plotter",

         async mounted() {
             let data = await this.getCSV();
             let Chart1 = this.createChart('sensor-chart', arduinoData);
             //console.log(data)
             data.split(/\r\n|\r|\n/).forEach((element) => {
                 let splitted = element.split(",")
                 let xdata = splitted[0];
                 let ydata = splitted[1];
                 //console.log(ydata);
                 this.addData(Chart1, xdata, ydata)
             });
         },

        methods: {


            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                const myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
                return (myChart); //make the chart accessible everywhere
            },
            addData(chart, label, data) {
                //add x-axis to end
                chart.data.labels.push(label);
                //chart.data.datasets.forEach((dataset) => { //use this when plotting multiple graphs on same axis
                chart.data.datasets[0].data.push(data); //add data to end
                //});
                chart.update();
            },
            async getCSV() {
                const res = await fetch(' http://localhost:9000/request', {
                });
                const data = await res.text();
                console.log(data)
                return data;
            },

        },


    }


</script>

<style scoped>

</style>