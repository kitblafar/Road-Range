<template>
    <div>
        <canvas id="sensor-chart" width="600" height="250"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';
import 'chartjs-plugin-zoom';
import {bus} from '../main';

let CANData = {
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
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: false,
                    },
                    zoom: {
                        enabled: true,
                        drag: true,
                    }
                }
            },
        },
    };

    export default {

        name: "Plotter",
        components: {},
        async mounted() {
            this.data = await this.getCSV();
            console.log("gets to mounted");
            this.Chart1 = this.createChart('sensor-chart', CANData);
            console.log("gets to chart");

            //count the number of measurements on the CAN bus
            let noMeasurement = -1; //-1 as time is not a value to be counted
            this.data.split(/\r\n|\r|\n/, 1).forEach((element) => {
                    element.split(",").forEach(() => {
                        noMeasurement++
                    });
                }
            );
            bus.$emit('Number of Measurements:', noMeasurement);

            //Find out which elements selected from drop downs and split that
            //find the indexes
            bus.$on("Data Set Index ", (index) => {
                this.indexArray = [];
                //clear the data from last time
                this.removeData(CANData);
                index.forEach((element)=>{
                  this.indexArray.push(element);
                })
                console.log(this.indexArray);
            });
            //find the yaxis titles (names of data sets)
            bus.$on("Data Set Names ", (yAxis) => {
                this.yAxisArray = []
                this.yAxisArray.push(yAxis);
            });

            //finalise
            bus.$on("Submitted ", () => {
                console.log('submitted')
                this.splitData(this.data);
                this.addYAxisIDs(this.Chart1);
                this.Chart1.update();
                document.getElementById("loader").style.visibility = "hidden";
            });

            bus.$on("Zoom Reset ", () => {
                this.Chart1.resetZoom();
            });
        },


        beforeDestroy() {
            this.Chart1.destroy();
            this.removeData(CANData);
            console.log("unmounted");
        },

        methods: {

            addYAxisIDs(chart) {
                let x = 0;
                //use this when plotting multiple graphs on same axis
                chart.options.scales.yAxes.forEach((element) => {
                    console.log(this.yAxisArray[0][x]);
                    element.scaleLabel.labelString = `${this.yAxisArray[0][x]}`;
                    chart.data.datasets[x].label=`${this.yAxisArray[0][x]}`;
                    //add data to end
                    x++;
                });
                chart.update();
            },

            //Split up all the lines then all the measurements and push to the graph
            splitData(data) {
              //remove the old data
              this.removeData(CANData);
              document.getElementById("loader").style.visibility = "visible";
              let splitted = [];
              let xdata=[];
              let ydata=[];
              let ydata1=[];
              let ydata2=[];
              let ydata3=[];

              data.split(/\r\n|\r|\n/).forEach((element) => {
                //console.log("here is each element: "+ element);
                element.split(/,/).forEach((section) => {
                  //console.log("here is each section: "+ section);
                  splitted.push(section);
                });
                //console.log("This is the split array: "+splitted)
                xdata.push(splitted[0]);
                ydata.push(splitted[this.indexArray[0]]);
                ydata1.push(splitted[this.indexArray[1]]);
                ydata2.push(splitted[this.indexArray[2]]);
                ydata3.push(splitted[this.indexArray[3]]);
                //console.log("Here are y values "+ydata)
                splitted = [];
              });
              this.addData(this.Chart1, xdata, ydata, ydata1,ydata2,ydata3);
            },

            //create the chart into which the data is pushed
            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                const myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
                return (myChart); //make the chart accessible everywhere
            },
            //take data off the chart
            removeData(data) {
                data.data.labels = [];
                data.data.datasets.forEach((dataset) => {
                    dataset.data = [];
                })
            },

            //add data to chart
            addData(chart, xSet, ySet, ySet1,ySet2,ySet3) {
              //set the datasets in the chart data to the new values
              chart.data.labels=xSet;
              chart.data.datasets[0].data=ySet;
              chart.data.datasets[1].data=ySet1;
              chart.data.datasets[2].data=ySet2;
              chart.data.datasets[3].data=ySet3;
                return('finished');
            },

            //get the data from the CSV file from the webserver
            async getCSV() {
                let host = window.location.protocol + "//" + window.location.hostname+":2021";
                const res = await fetch(host, {});
                return await res.text();
            },
        },

    }

</script>

<style scoped>

</style>