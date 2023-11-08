import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { fetchTransactions } from './api';

jest.mock('./api', () => ({
  fetchTransactions: jest.fn(),
}));

describe('App', () => {
  it('renders the loader before transactions are fetched', () => {
    fetchTransactions.mockReturnValueOnce(new Promise(() => {}));
    render(<App />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders an error message if the fetch fails', async () => {
    fetchTransactions.mockRejectedValueOnce(
      new Error('Failed to fetch transactions. Please try again.')
    );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('error-box')).toBeInTheDocument();
    });
  });

  it('retries fetching data when the retry button is clicked', async () => {
    fetchTransactions.mockRejectedValueOnce(new Error('Network error'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('error-box')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/retry/i));
    await waitFor(() => expect(fetchTransactions).toHaveBeenCalledTimes(2));
  });

  // we can add more tests for different aspects of the App component as needed...
});
