import mockData from './mockData';

export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Simulate API call success/failure
      if (Math.random() > 0.8) {
        // 20% chance of failure
        reject(new Error('Failed to fetch transactions. Please try again.'));
      } else {
        resolve(mockData);
      }
    }, 1000);
  });
};
