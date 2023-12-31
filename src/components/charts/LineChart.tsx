import React from "react";
import { Line } from "react-chartjs-2";

interface Props{
    readonly chartData: any;
}


export function LineChart({ chartData }:Props) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}