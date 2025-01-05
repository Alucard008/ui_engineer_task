import React from 'react';
// import { useTheme } from '../themeContext';
// import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Toggle = ({ isStreaming, toggleStreaming }) => {
  //   const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center gap-6">
      <button
        onClick={toggleStreaming}
        className={`px-6 py-2 rounded-full font-bold ${
          isStreaming ? 'bg-red-500 ' : 'bg-green-500'
        } text-white shadow-md`}
      >
        {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
      </button>
      {/* <button
        onClick={toggleTheme}
        className={`flex items-center px-6 py-2 rounded-full font-bold shadow-md gap-2 ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        {theme === 'dark' ? (
          <SunIcon className="w-6 h-6 text-yellow-300" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-500" />
        )}
      </button> */}
    </div>
  );
};

export default Toggle;
