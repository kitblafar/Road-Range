<template>
    <canvas id="sensor-chart" width="600" height="300"></canvas>
</template>

<script>
    import Chart from 'chart.js';
    // Create WebSocket connection.

    let arduinoData = {
        type: 'line',
        data: {
            labels: [], //put time in here
            datasets: [
                {
                    data: [],
                    //put first data in here
                    label: "Set-One",
                    yAxisID: "Set-One",
                    backgroundColor: 'rgba(19,17,123,0.5)'
                },
                {
                    //put second data here
                    data: [],
                    label: "Set-Two",
                    yAxisID: "Set-Two",
                    backgroundColor: 'rgba(19,255,123,0.5)'

                },
                {
                    //put third data here
                    data: [],
                    label: "Set-Three",
                    yAxisID: "Set-Three",
                    backgroundColor: 'rgb(227, 22, 25,0.5)'

                },
                {
                    //put fourth data here
                    data: [],
                    label: "Set-Four",
                    yAxisID: "Set-Four",
                    backgroundColor: 'rgb(191, 63, 191,0.5)'

                },
            ],
        },

        options: {
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    id: 'Set-One',
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: "Set-One",
                    },

                    ticks: {
                        padding: 25,
                    }
                },
                    {
                        id: 'Set-Two',
                        display: 'auto',
                        scaleLabel: {
                            display: true,
                            labelString: "Set-Two",
                        },
                        ticks: {
                            padding: 25,
                        }
                    },
                    {
                        id: 'Set-Three',
                        display: 'auto',
                        scaleLabel: {
                            display: true,
                            labelString: "Set-Three",
                        },
                        ticks: {
                            padding: 25,
                        }
                    },
                    {
                        id: 'Set-Four',
                        display: 'auto',
                        scaleLabel: {
                            display: true,
                            labelString: "Set-Four",
                        },
                        ticks: {
                            padding: 25,
                        }
                    },
                    ],
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
            console.log("gets to mounted"+ data);
            let Chart1 = this.createChart('sensor-chart', arduinoData);
            console.log("gets to chart");
            let splitted=[];

            data.split(/\r\n|\r|\n/).forEach((element) => {
                console.log("here is each element: "+ element);
                element.split(/,/).forEach((section) => {
                    console.log("here is each section: "+ section);
                    splitted.push(section);
                });
                console.log("This is the split array: "+splitted)
                let xdata = splitted[0];
                let ydata = [splitted[1],splitted[2],splitted[3],splitted[4]];
                console.log("Here are y values "+ydata)
                this.addData(Chart1, xdata, ydata);
                splitted=[];
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
                console.log("The label is: "+label)
                chart.data.labels.push(label);
                console.log("x-data is in graph")
                let x=0
                chart.data.datasets.forEach((dataset) => { //use this when plotting multiple graphs on same axis
                dataset.data.push(data[x]); //add data to end
                    x++;
                });
                x=0;
                chart.update();
            },
            async getCSV() {
                const res = await fetch(' http://localhost:9000/request', {});
                const data = await res.text();
                //console.log(data)
                return data;
            },

        },


    }


</script>

<style scoped>

</style>