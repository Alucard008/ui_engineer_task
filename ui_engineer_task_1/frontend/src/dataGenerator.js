export const generateData = (symbol) => ({
  symbol,
  price: (Math.random() * 1000).toFixed(2),
  time: new Date().toLocaleTimeString(),
});
