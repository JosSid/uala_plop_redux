import NewAdPage from "../NewAdPage";
import { fireEvent, render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { defaultState } from '../../../store/reducers.js';
import '@testing-library/jest-dom/extend-expect';
import { createAd } from '../../../store/actions.js';
jest.mock('../../../store/actions.js')

describe('NewAdPage', () => {
    const store = {
        getState: () => defaultState,
        dispatch: () => {},
        subscribe: () => {},
      };

      const renderComponent = () => 
      render(
        <Provider store={store}>
          <NewAdPage />
        </Provider>
      );
    test('SnapShot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
    test('Should dispatch "createAd" action', async () => {
        renderComponent();
        const title = 'Car';
        const price = 100;
        const tags = []

        const nameInput = screen.getByLabelText(/^Title/);
        const priceInput = screen.getByLabelText(/Price/);
        const tagsInput = screen.getByLabelText(/Tags/);

        fireEvent.change(nameInput, { target: { value: title } });
        fireEvent.change(priceInput,  { target: { value: price } });
        fireEvent.change(tagsInput, { target: { value: tags } });
        const submitButton = screen.getByText('Create Advertisment');

        expect(submitButton).toBeEnabled();


       fireEvent.click(submitButton);

       const formElement = await screen.findByTestId('login-form');
        expect(formElement).toHaveFormValues({
            name: 'Car',
            sale: 'true',
            price: 100,
            tags: tags
        });
        fireEvent.submit(formElement);
        expect(createAd).toHaveBeenCalled();
    });
});