import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from './components/Chart';
import StockTable from './components/StockTable';
import Toggle from './components/Toggle';
import { generateData } from './dataGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';

import WebSocketTable from './components/WebSocketTable';
import WebSocketChart from './components/WebSocketChart';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [socketData, setSocketData] = useState([]);

  const exportToCSV = () => {
    const flatData = stocks.flat();
    const csvRows = [
      ['Symbol', 'Price', 'Time'],
      ...flatData.map((row) => [row.symbol, row.price, row.time]),
    ];
    const csvContent = csvRows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'stock_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let interval;
    if (isStreaming) {
      interval = setInterval(() => {
        const newStockData = [generateData('AAPL'), generateData('GOOGL')];

        setStocks((prev) => [...prev, newStockData]);

        setChartData((prev) => [...prev, newStockData].slice(-100));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      setSocketData((prev) => {
        const updatedData = { ...prev };

        newData.forEach((stock) => {
          const { symbol } = stock;

          // Update the specific stock's history
          if (!updatedData[symbol]) {
            updatedData[symbol] = [];
          }
          updatedData[symbol] = [...updatedData[symbol], stock].slice(-100); // Limit history to the latest 100 entries
        });

        return updatedData;
      });
    };

    return () => socket.close();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen ${
          theme === 'dark'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-extrabold mb-6 text-center">
            Real-Time Stock Viewer
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <ThemeToggle />
            <Toggle
              isStreaming={isStreaming}
              toggleStreaming={() => setIsStreaming(!isStreaming)}
            />
            {/* Export to CSV Button */}
            <button
              onClick={exportToCSV}
              className={`px-6 py-2 rounded-full font-bold ${
                theme === 'dark'
                  ? 'bg-purple-500 text-white'
                  : 'bg-blue-500 text-white'
              } text-white shadow-md`}
            >
              Export to CSV
            </button>
          </div>
          <div className="flex flex-col gap-10">
            <h1 className="text-4xl font-extrabold mb-6 text-center">
              Time Out implementation for data
            </h1>
            <div className="mt-6 grid gap-6 md:grid-cols-2 sm:grid-cols-1">
              <div className="w-full p-2 rounded-lg max-h-[400px]">
                <Chart data={chartData} />
              </div>

              <div className="w-full p-2 rounded-lg overflow-auto max-h-[400px]">
                <StockTable stocks={stocks} theme={theme} />
              </div>
            </div>

            <h1 className="text-4xl font-extrabold mb-6 text-center">
              Live Data from backend implementation with web Socket
            </h1>
            <div className="mt-6 grid gap-6 md:grid-cols-2 sm:grid-cols-1">
              <div className="w-full p-2 rounded-lg max-h-[400px]">
                <WebSocketChart data={socketData} />
              </div>

              <div className="w-full p-2 rounded-lg overflow-auto max-h-[400px]">
                <WebSocketTable data={socketData} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
