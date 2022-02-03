import React, {useContext} from "react";
import {Line} from "react-chartjs-2";
import {Context} from "./Context";
import "../Styles/styles.scss";

function WeightChart() {
  const {weightHistory} = useContext(Context);

  const datesArr = weightHistory ? weightHistory.map(obj => {
    const keyArr = Object.keys(obj);
    return keyArr[0];
  })
  : null;

  const weightsArr = weightHistory ? weightHistory.map(obj => {
    const valueArr = Object.values(obj);
    return valueArr[0];
  })
  : null;

  //Data and styling for the chart
  const chartData = {
    labels: datesArr,
    datasets: [{
      label: "Weight",
      data: weightsArr,
      borderColor: "rgb(100, 100, 100)",
      borderWidth: 3,
      pointBackgroundColor: "rgb(100, 100, 100)"
    }]
  };
  const chartOptions = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          lineWidth: 1,
          color: "rgb(0, 0, 0)"
        },
        ticks: {
          fontColor: "rgb(100, 100, 100)",
          fontSize: 16,
          fontStyle: "bold"
        }
      }],
      yAxes: [{
        gridLines: {
          lineWidth: 1,
          color: "rgb(0, 0, 0)"
        },
        ticks: {
          fontColor: "rgb(100, 100, 100)",
          fontSize: 16,
          fontStyle: "bold",
          lineHeight: 2
        }
      }]
    }
  }

  return (
    <div className="weight-chart">
      <Line data={chartData}
            options={chartOptions}
      />
    </div>
  )
}

export default WeightChart;