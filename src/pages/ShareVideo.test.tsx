/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/prefer-screen-queries */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter
import ShareVideo from './ShareVideo'; // Adjust the import path as needed
import { CallAPIPOST } from '../shared/APIs';

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

    // it('should handle sharing video successfully', async () => {

    //     // Mock the successful API response
    //     (CallAPIPOST as jest.MockedFunction<typeof CallAPIPOST>).mockResolvedValue({ success: true });

    //     const { getByText } = render(
    //         <Router> {/* Wrap your component with <Router> */}
    //             <ShareVideo />
    //         </Router>
    //     );

    //     fireEvent.click(getByText('Share'));
    //     const findSuccessMessage = () => {
    //         const elements = screen.getAllByText((content, element) => {
    //           // Customize the logic to match the text structure
    //           return content.includes('You have successfully shared!');
    //         });
          
    //         if (elements.length > 0) {
    //           return elements[0];
    //         }
          
    //         return null;
    //       };
          
    //       expect(findSuccessMessage()).toBeInTheDocument();
    // });
});