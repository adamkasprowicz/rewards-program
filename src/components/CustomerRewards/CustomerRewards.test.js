import { render, screen } from '@testing-library/react';
import CustomerRewards from './CustomerRewards';

const mockTransactions = [
  {
    fullName: 'Alice Johnson',
    productName: 'Smartphone',
    priceUSD: 120,
    dateTimeStamp: '2023-07-16T12:00:00Z',
    month: 6,
  },
  {
    fullName: 'Alice Johnson',
    productName: 'Headphones',
    priceUSD: 80,
    dateTimeStamp: '2023-07-17T15:00:00Z',
    month: 6,
  },
];

describe('CustomerRewards', () => {
  test('renders customer name', () => {
    render(<CustomerRewards transactions={mockTransactions} />);
    const customerName = screen.getByText(/alice johnson/i);
    expect(customerName).toBeInTheDocument();
  });

  test('renders transaction details for each item', () => {
    render(<CustomerRewards transactions={mockTransactions} />);
    const productName = screen.getAllByText(/smartphone/i);
    const transactionPrice = screen.getAllByText(/\$120/i);
    const pointsEarned = screen.getAllByText(/90 points/i);

    expect(productName).toHaveLength(1);
    expect(transactionPrice).toHaveLength(1);
    expect(pointsEarned).toHaveLength(1);
  });

  test('calculates total rewards correctly', () => {
    render(<CustomerRewards transactions={mockTransactions} />);
    const rewards = screen.getByText(/total rewards:/i);
    expect(rewards).toHaveTextContent('Total Rewards: 120 points');
  });

  test('displays message for no transactions', () => {
    render(<CustomerRewards transactions={[]} />);
    const message = screen.getByText(/No transactions/i);
    expect(message).toBeInTheDocument();
  });
});
