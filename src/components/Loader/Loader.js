import './Loader.css';

const Loader = () => {
  return (
    <div
      className='loader'
      data-testid='loader'
    >
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
