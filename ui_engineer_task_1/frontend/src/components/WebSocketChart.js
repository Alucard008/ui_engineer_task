import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WebSocketChart = ({ data }) => {
  const [chartData, setChartData] = useState({});

  // Predefined color mapping for each stock symbol
  const colorMapping = {
    AAPL: {
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    GOOGL: {
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    MSFT: {
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
    TSLA: {
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
    },
    AMZN: {
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
  };

  useEffect(() => {
    const MAX_HISTORY_LENGTH = 10; // Display only the latest 10 values for the chart

    setChartData((prevChartData) => {
      const updatedData = { ...prevChartData };

      Object.keys(data).forEach((symbol) => {
        if (!updatedData[symbol]) {
          updatedData[symbol] = { labels: [], prices: [] };
        }

        data[symbol].forEach((point) => {
          if (!updatedData[symbol].labels.includes(point.time)) {
            updatedData[symbol].labels.push(point.time);
            updatedData[symbol].prices.push(point.price);
          }
        });

        // Ensure only the latest 10 entries are kept
        if (updatedData[symbol].labels.length > MAX_HISTORY_LENGTH) {
          updatedData[symbol].labels = updatedData[symbol].labels.slice(
            -MAX_HISTORY_LENGTH
          );
          updatedData[symbol].prices = updatedData[symbol].prices.slice(
            -MAX_HISTORY_LENGTH
          );
        }
      });

      return updatedData;
    });
  }, [data]);

  const labels = Object.values(chartData)[0]?.labels || [];
  const datasets = Object.keys(chartData).map((symbol) => ({
    label: symbol,
    data: chartData[symbol].prices,
    borderColor: colorMapping[symbol]?.borderColor || 'rgba(0, 0, 0, 1)', // Default color if not defined
    backgroundColor:
      colorMapping[symbol]?.backgroundColor || 'rgba(0, 0, 0, 0.2)', // Default color if not defined
  }));

  const chartConfig = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Price (USD)' } },
    },
  };

  return <Line data={chartConfig} options={options} />;
};

export default WebSocketChart;
