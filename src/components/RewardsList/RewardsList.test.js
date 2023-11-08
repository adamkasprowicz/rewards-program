import { render, screen } from '@testing-library/react';
import RewardsList from './RewardsList';
import CustomerRewards from '../CustomerRewards/CustomerRewards';

// Since we're testing RewardsList, we don't need to test CustomerRewards again.
jest.mock('../CustomerRewards/CustomerRewards', () => {
  // Mock out the actual component with a dummy that has the same displayName
  return jest.fn(() => null);
});

describe('RewardsList', () => {
  const mockCustomersTransactions = {
    'Alice Johnson': [
      {
        productName: 'Smartphone',
        priceUSD: 120,
        dateTimeStamp: '2023-07-16T12:00:00Z',
        month: 6,
      },
      // ... more transactions
    ],
    'Bob Smith': [
      {
        productName: 'Laptop',
        priceUSD: 999,
        dateTimeStamp: '2023-07-17T13:00:00Z',
        month: 6,
      },
      // ... more transactions
    ],
    // ... more customers
  };

  it('renders no customers when no transactions are available', () => {
    render(<RewardsList customersTransactions={{}} />);
    const message = screen.queryByText(/total rewards:/i);
    expect(message).not.toBeInTheDocument();
  });

  it('renders multiple CustomerRewards components for multiple customers', () => {
    render(<RewardsList customersTransactions={mockCustomersTransactions} />);
    // The CustomerRewards component is mocked, so we just check if it was called with the correct props
    expect(CustomerRewards).toHaveBeenCalledTimes(
      Object.keys(mockCustomersTransactions).length
    );
    Object.entries(mockCustomersTransactions).forEach(
      ([fullName, transactions]) => {
        expect(CustomerRewards).toHaveBeenCalledWith({ transactions }, {});
      }
    );
  });

  // we can add more tests as needed...
});
