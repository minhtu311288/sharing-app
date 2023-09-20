/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShareVideo from './ShareVideo'; 

// Mock axios and CallAPIPOST
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: { items: [{ snippet: {} }] } })),
}));

jest.mock('../shared/APIs', () => ({
    CallAPIPOST: jest.fn(() => Promise.resolve({ success: true })),
}));

describe('ShareVideo component', () => {
    it('renders without crashing', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Router>
                <ShareVideo />
            </Router>
        );

        expect(getByText('Share video page')).toBeInTheDocument();
        expect(getByPlaceholderText('Share any youtube link')).toBeInTheDocument();
        expect(getByText('Share')).toBeInTheDocument();
    });
});