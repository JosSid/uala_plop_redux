import './ErrorDisplay.css';

const ErrorDisplay = ({ resetError, error }) => {
  return (
    <div className='loginPage-error' onClick={resetError}>
      {error.message}
    </div>
  );
};

export default ErrorDisplay;
