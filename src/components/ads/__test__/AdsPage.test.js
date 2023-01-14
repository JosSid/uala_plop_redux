import { render } from "@testing-library/react";
import { AdsPage } from "../AdsPage";
import { BrowserRouter as Router } from "react-router-dom";

describe('AdsPage', () => {
    const defaultProps = {
        onAdsLoaded: jest.fn(),
        onTagsLoaded: jest.fn(),
        ads: [],
        tags: [],
        error: null,
        uiResetError: null,
    };
    const renderComponent = (props) => render(
    <Router>
        <AdsPage {...defaultProps} {...props} />
    </Router>)
    test('Snapshot without data', () => {
        const {container} = renderComponent();
        expect(container).toMatchSnapshot();
    });
    test('Snapshot with data', () => {
        const props = {
            ads: [{id: 1,name: 'car', price: 100, tags: ['motor']}],
            tags: ['motor'],
        };
        const {container} = renderComponent({...props});
        expect(container).toMatchSnapshot()
    });
});