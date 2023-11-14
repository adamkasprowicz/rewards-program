export const calculateRewards = (amount) => {
  if (amount > 100) {
    return 2 * (amount - 100) + 50;
  }
  if (amount > 50) {
    return amount - 50;
  }
  return 0;
};
