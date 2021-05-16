<template>
  <canvas id="sensor-chart" width="600" height="250"></canvas>
</template>

<script>
import Chart from 'chart.js';
import {bus} from "@/main";

const startTime = Date.now();


let arduinoData = {
  type: 'line',
  data: {
    labels: new Array(100).fill(0), //put time in here
    datasets: [{
      data: new Array(100).fill(0),
      //put arduino data in here
      label: "Speed",
      yAxisID: "S1",
      backgroundColor: 'rgba(19,17,123,0.5)'
    },
      {
        data: new Array(100).fill(0),
        //put arduino data in here
        label: "RPM1",
        yAxisID: "S2",
        backgroundColor: 'rgba(19,255,123,0.5)'
      },
      {
        data: new Array(100).fill(0),
        //put arduino data in here
        label: "RPM2",
        yAxisID: "S3",
        backgroundColor: 'rgb(227, 22, 25,0.5)'
      },
      {
        data: new Array(100).fill(0),
        //put arduino data in here
        label: "Splip",
        yAxisID: "S4",
        backgroundColor:'rgb(191, 63, 191,0.5)'
      },

    ],
  },
  options: {
    responsive: true,
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
    animation: {
      duration: 0
    },
    scales: {
      yAxes: [{
        id: 'S1',
        display: 'auto',
        scaleLabel: {
          display: true,
          labelString: "Speed (m/s)",
        },

        ticks: {
          padding: 25,
        }
      },
        {
          id: 'S2',
          display: 'auto',
          scaleLabel: {
            display: true,
            labelString: "RPM1",
          },
          ticks: {
            padding: 25,
          }
        },
        {
          id: 'S3',
          display: 'auto',
          scaleLabel: {
            display: true,
            labelString: "RPM2",
          },
          ticks: {
            padding: 25,
          }
        },
        {
          id: 'S4',
          display: 'auto',
          scaleLabel: {
            display: true,
            labelString: "Slip (%)",
          },
          ticks: {
            padding: 25,
          }
        },],
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
    // Create WebSocket connection.
    let host = "ws://" + window.location.hostname + ":4200";
    this.socket = new WebSocket(host); //reopen websocket as it is closed when saved view selected
    let Chart1 = this.createChart('sensor-chart', arduinoData); //make chart out of arduino data
    console.log("chart created");

    // Listen for messages
          this.socket.addEventListener('message', (event) => {
            let time = Date.now() - startTime;
            console.log(event.data);
          event.data.split(",").forEach((element, index)=>{
            //add data to the arduinodata datasets data and the time to the label array
            this.addData(Chart1, time, element, index);
            console.log(element);
            console.log(index);
                  }
          )
      });

    //reset the zoom when reset zoom event received
    bus.$on("Zoom Reset1 ", () => {
      Chart1.resetZoom();
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
    addData(chart, label, data, x) {
      //remove x-axis from start
      chart.data.labels.shift();
      //add x-axis to end
      chart.data.labels.push(label);
      //chart.data.datasets.forEach((dataset) => { //use this when plotting multiple graphs on same axis
      chart.data.datasets[x].data.shift(); //take data from start
      chart.data.datasets[x].data.push(data); //add data to end
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