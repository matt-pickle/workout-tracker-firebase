import React, {useContext} from "react";
import {Chart} from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import {Chart as ChartJS} from 'chart.js/auto';
import {Context} from "./Context";
import "../Styles/styles.scss";

function WeightChart() {
  const {userObj} = useContext(Context);
  
  const datesArr = userObj.weightHistory ? userObj.weightHistory.map(obj => {
    const keyArr = Object.keys(obj);
    return keyArr[0];
  })
  : null;

  const weightsArr = userObj.weightHistory ? userObj.weightHistory.map(obj => {
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
      pointBackgroundColor: "rgb(100, 100, 100)",
      tension: .25
    }]
  };
  const chartOptions = {
    legend: {
      display: false
    },
    scales: {
      x: {
        grid: {
          lineWidth: 1,
          color: "rgb(0, 0, 0)"
        },
        ticks: {
          color: "rgb(100, 100, 100)",
          font: {
            weight: "bold",
            size: 16
          }
        }
      },
      y: {
        grid: {
          lineWidth: 1,
          color: "rgb(0, 0, 0)"
        },
        ticks: {
          color: "rgb(100, 100, 100)",
          font: {
            weight: "bold",
            size: 16
          },
          lineHeight: 2
        }
      }
    }
  }

  return (
    <div className="weight-chart">
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
      />
    </div>
  )
}

export default WeightChart;