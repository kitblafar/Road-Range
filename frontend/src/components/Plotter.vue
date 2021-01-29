<template>
    <canvas id="sensor-chart"></canvas>
</template>

<script>
    import Chart from 'chart.js';
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:1999');
    const startTime = Date.now();

    let arduinoData = {
        type: 'line',
        data: {
            yAxisID: "Number",
            xAxisID: "Time (ms)",
            labels: new Array(100).fill(0), //put time in here
            datasets: [{
                data: new Array(100).fill(0),
                //put arduino data in here
                label: "Arduino-Data",
                backgroundColor: 'rgba(19,17,123,0.5)'
            },
            ],
        },

        options: {

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
        mounted() {
            let Chart1 = this.createChart('sensor-chart', arduinoData);
            console.log("chart created");
            // Listen for messages
            socket.addEventListener('message', (event) => {
                console.log('Message from server ', event.data);
                //add data to the arduinodata.data array and the time to the label array
                let time = Date.now() - startTime;
                this.addData(Chart1, time, event.data);
            });
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
                return (myChart); //make the chart accessible everywhere
            },
            addData(chart, label, data) {
                //remove data from the end
                chart.data.labels.shift();
                //add data
                chart.data.labels.push(label);
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.shift(); //shift takes from the left
                    dataset.data.push(data);
                });
                chart.update();
            },

        },

    }


</script>

<style scoped>

</style>