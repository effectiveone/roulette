// const unSortedRouletteWheelNumbers = [
//   { number: 0, color: "green" },
//   ...Array.from({ length: 35 }, (_, i) => ({
//     number: i + 1,
//     color: i % 2 === 0 ? "black" : "red",
//   })),
// ];

// const sortedNumbers = [
//   0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
//   16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
// ];

// const rouletteWheelNumbers = unSortedRouletteWheelNumbers.sort((a, b) => {
//   const aIndex = sortedNumbers.indexOf(a.number);
//   const bIndex = sortedNumbers.indexOf(b.number);
//   return aIndex - bIndex;
// });

const rouletteWheelNumbers = [
  { number: 0, color: "green", startAngle: 0, endAngle: 9.72 },
  { number: 32, color: "red", startAngle: 9.73, endAngle: 19.45 },
  { number: 15, color: "black", startAngle: 19.46, endAngle: 29.18 },
  { number: 19, color: "red", startAngle: 29.19, endAngle: 38.91 },
  { number: 4, color: "black", startAngle: 38.92, endAngle: 48.64 },
  { number: 21, color: "red", startAngle: 48.65, endAngle: 58.37 },
  { number: 2, color: "black", startAngle: 58.38, endAngle: 68.1 },
  { number: 25, color: "red", startAngle: 68.11, endAngle: 77.83 },
  { number: 17, color: "black", startAngle: 77.84, endAngle: 87.56 },
  { number: 34, color: "red", startAngle: 87.57, endAngle: 97.29 },
  { number: 6, color: "black", startAngle: 97.3, endAngle: 107.02 },
  { number: 27, color: "red", startAngle: 107.03, endAngle: 116.75 },
  { number: 13, color: "black", startAngle: 116.76, endAngle: 126.48 },
  { number: 36, color: "red", startAngle: 126.49, endAngle: 136.21 },
  { number: 11, color: "black", startAngle: 136.22, endAngle: 145.94 },
  { number: 30, color: "red", startAngle: 145.95, endAngle: 155.67 },
  { number: 8, color: "black", startAngle: 155.68, endAngle: 165.4 },
  { number: 23, color: "red", startAngle: 165.41, endAngle: 175.13 },
  { number: 10, color: "black", startAngle: 175.14, endAngle: 184.86 },
  { number: 5, color: "red", startAngle: 184.87, endAngle: 194.59 },
  { number: 24, color: "black", startAngle: 194.6, endAngle: 204.32 },
  { number: 16, color: "red", startAngle: 204.33, endAngle: 214.05 },
  { number: 33, color: "black", startAngle: 214.06, endAngle: 223.78 },
  { number: 1, color: "red", startAngle: 223.79, endAngle: 233.51 },
  { number: 20, color: "black", startAngle: 233.52, endAngle: 243.24 },
  { number: 14, color: "red", startAngle: 243.25, endAngle: 252.97 },
  { number: 31, color: "black", startAngle: 252.98, endAngle: 262.7 },
  { number: 9, color: "red", startAngle: 262.71, endAngle: 272.43 },
  { number: 22, color: "black", startAngle: 272.44, endAngle: 282.16 },
  { number: 18, color: "red", startAngle: 282.17, endAngle: 291.89 },
  { number: 29, color: "black", startAngle: 291.9, endAngle: 301.62 },
  { number: 7, color: "red", startAngle: 301.63, endAngle: 311.35 },
  { number: 28, color: "black", startAngle: 311.36, endAngle: 321.08 },
  { number: 12, color: "red", startAngle: 321.09, endAngle: 330.81 },
  { number: 35, color: "black", startAngle: 330.82, endAngle: 340.54 },
  { number: 3, color: "red", startAngle: 340.55, endAngle: 350.27 },
  { number: 26, color: "black", startAngle: 350.28, endAngle: 360 },
];

export default rouletteWheelNumbers;
