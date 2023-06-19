import React from 'react';
import { Bar } from 'react-chartjs-2';

export interface SampleDataModel {
   labels: number[] | undefined;
   datasets: {
      label: string;
      data: number[] | undefined;
      backgroundColor: string[];
      borderRadius: number;
   }[];
}
export interface BarChartProps {
   chartData: SampleDataModel;
   options: any;
}

export const options = {
   responsive: true,
   scales: {
      y: {
         display: false,
      },
   },
   plugins: {
      legend: {
         position: 'top' as const,
      },
      tooltip: {
         intersect: false,
      },
   },
};

const BarChart: React.FC<BarChartProps> = ({ chartData, options }) => {
   return (
      <Bar
         className="bg-[#14181D] p-2 rounded-sm mt-2"
         data={chartData}
         options={options}
      />
   );
};

export default BarChart;
