import { calculateRewards } from '../../utils/calculateRewards';

import './CustomerRewards.css';

const CustomerRewards = ({ transactions }) => {
  const calculateTotalRewards = (transactions) =>
    transactions.reduce(
      (acc, transaction) => acc + calculateRewards(transaction.priceUSD),
      0
    );

  if (!transactions.length) {
    return <div className='customer-rewards'>No transactions</div>;
  }

  return (
    <div className='customer-rewards'>
      <h3>{transactions[0].fullName}</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.productName} - ${transaction.priceUSD} -{' '}
            {calculateRewards(transaction.priceUSD)} points
          </li>
        ))}
      </ul>
      <strong>
        Total Rewards: {calculateTotalRewards(transactions)} points
      </strong>
    </div>
  );
};

export default CustomerRewards;
