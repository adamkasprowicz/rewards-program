import { useState, useEffect, useCallback } from 'react';

import { fetchTransactions } from './api';
import RewardsList from './components/RewardsList/RewardsList';
import Loader from './components/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const groupTransactionsByCustomer = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const { fullName } = transaction;
      acc[fullName] = acc[fullName] || [];
      acc[fullName].push(transaction);
      return acc;
    }, {});
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(groupTransactionsByCustomer(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div
          className='error'
          data-testid='error-box'
        >
          <div className='error-label'>Error: {error}</div>
          <button
            className='button-retry'
            onClick={loadData}
          >
            Retry
          </button>
        </div>
      );
    }
    return <RewardsList customersTransactions={transactions} />;
  };

  return (
    <ErrorBoundary>
      <div className='app'>
        <div className='app-name'>Rewards Program</div>
        {renderContent()}
      </div>
    </ErrorBoundary>
  );
};

export default App;
