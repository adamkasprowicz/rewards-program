const fullNames = [
  'Alice Johnson',
  'Bob Smith',
  'Carol Williams',
  'David Brown',
  'Emma Davis',
];

const products = ['Smartphone', 'Laptop', 'Headphones', 'Smartwatch', 'Camera'];

// Helper function to generate a random integer within a range
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate a random date within the last three months
const getRandomDate = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
};

// Helper function to format the month
const getMonthFormat = (date) => {
  return date.getMonth();
};

// Generate transactions
const generateTransactions = (numTransactions) => {
  const transactions = [];

  for (let i = 0; i < numTransactions; i++) {
    const date = getRandomDate();
    transactions.push({
      fullName: fullNames[getRandomInt(0, fullNames.length - 1)],
      productName: products[getRandomInt(0, products.length - 1)],
      priceUSD: getRandomInt(50, 500), // Assuming a price range from $50 to $500
      dateTimeStamp: date.toISOString(),
      month: getMonthFormat(date),
    });
  }

  return transactions;
};

// Export the mock data
export default generateTransactions(100); // generate 100 transactions for the data set
