import { calculateRewards } from './calculateRewards';

describe('calculateRewards', () => {
  test('returns 0 for amounts less than $50', () => {
    expect(calculateRewards(49)).toBe(0);
  });

  test('returns 1 point per dollar for amounts between $50 and $100', () => {
    expect(calculateRewards(75)).toBe(25);
  });

  test('returns 1 point per dollar for the first $50 and 2 points per dollar after $100', () => {
    expect(calculateRewards(120)).toBe(90);
  });
});
