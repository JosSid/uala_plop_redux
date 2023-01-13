import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginPage from '../LoginPage.js';
import { defaultState } from '../../../store/reducers.js';
import { authLogin } from '../../../store/actions.js';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../store/actions.js')

describe('LoginPage', () => {
  const store = {
    getState: () => defaultState,
    dispatch: () => {},
    subscribe: () => {},
  };

  const renderComponent = () => 
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  
  test('Snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
  test('Should dispatch authLogin action', () => {

    const email = 'pepe@pepe.com';
    const password = '1234'

    renderComponent();

    const eMailInput = screen.getByLabelText(/eMail/);
    const passwordInput = screen.getByLabelText(/password/);
    const checkboxInput = screen.getByText('Check for recording Login');
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();
    fireEvent.change(eMailInput, {target: {value: email}});
    fireEvent.change(passwordInput, {target: { value: password}});
    fireEvent.change(checkboxInput, {target: {checked: true}});
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(authLogin).toHaveBeenCalledWith({email, password});
  });
});
