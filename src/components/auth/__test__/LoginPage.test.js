import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginPage from '../LoginPage.js';
import { defaultState} from '../../../store/reducers.js'

describe('LoginPage', () => {
  test('Snapshot', () => {
        const store = {
        getState: () => defaultState,
        dispatch: () => {},
        subscribe: () => {},
    }
    const {container} = render(
      <Provider store= {store}>
        <LoginPage />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
