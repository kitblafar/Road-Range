<template>
    <canvas id="sensor-chart" width="600" height="250"></canvas>
</template>

<script>
    import Chart from 'chart.js';
    // Create WebSocket connection.

    const startTime = Date.now();
    // import {bus} from '@/main';


    let arduinoData = {
        type: 'line',
        data: {
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
            responsive: true,
            plugins: {
                zoom: {
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,

                        // Panning directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'xy'
                    },

                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,

                        // Zooming directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'xy',
                    }
                }
            },
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
            }
        };

        export default {

            name: "Plotter",
            mounted() {
                this.socket = new WebSocket('ws://localhost:4200'); //reopen websocket
                let Chart1 = this.createChart('sensor-chart', arduinoData);
                console.log("chart created");
                // Listen for messages
                this.socket.addEventListener('message', (event) => {
                    // console.log('Message from server ', event.data);
                    //add data to the arduinodata.data array and the time to the label array
                    let time = Date.now() - startTime;
                    this.addData(Chart1, time, event.data);
                });
            },

            beforeDestroy() { //close the websocket so it can be reopened
                this.closingWebSocket()
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
                    //remove x-axis from start
                    chart.data.labels.shift();
                    //add x-axis to end
                    chart.data.labels.push(label);
                    //chart.data.datasets.forEach((dataset) => { //use this when plotting multiple graphs on same axis
                    chart.data.datasets[0].data.shift(); //take data from start
                    chart.data.datasets[0].data.push(data); //add data to end
                    //});
                    chart.update();
                },
                closingWebSocket() {
                    this.socket.close();
                    console.log("I am closing Websocket");
                },
            },
        }


</script>

<style scoped>
    #sensor-chart {
    }
</style>