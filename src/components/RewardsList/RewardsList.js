import CustomerRewards from '../CustomerRewards/CustomerRewards';

import './RewardsList.css';

const RewardsList = ({ customersTransactions }) => {
  return (
    <div className='rewards-list'>
      {Object.entries(customersTransactions).map(
        ([customerId, transactions]) => (
          <CustomerRewards
            key={customerId}
            transactions={transactions}
          />
        )
      )}
    </div>
  );
};

export default RewardsList;
