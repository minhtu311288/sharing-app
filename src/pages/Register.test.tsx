import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { Router } from 'react-router-dom';

describe('Register Component', () => {

  it('should display an error message when email is not provided', async () => {
    const { getByText, getByRole } = render(<Router location={''} navigator={undefined as any}><Register /></Router>);

    const submitButton = getByRole('button', { name: /Create Account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Email must is required')).toBeInTheDocument();
    });
  });

  it('should display an error message when passwords do not match', async () => {
    const { getByRole, getByLabelText, getByText } = render(<Router location={''} navigator={undefined as any}><Register /></Router>);

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByRole('button', { name: /Create Account/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Password is not matching with confirm password')).toBeInTheDocument();
    });
  });

  it('should display a success message when registration is successful', async () => {

    const { getByRole, getByLabelText, getByText } = render(<Router location={''} navigator={undefined as any}><Register /></Router>);

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByRole('button', { name: /Create Account/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('You have successfully registered!')).toBeInTheDocument();
    });
  });

  it('should display an error message when registration fails', async () => {

    const { getByRole, getByLabelText, getByText } = render(<Router location={''} navigator={undefined as any}><Register /></Router>);

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByRole('button', { name: /Create Account/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Something went wrong.')).toBeInTheDocument();
    });
  });
});