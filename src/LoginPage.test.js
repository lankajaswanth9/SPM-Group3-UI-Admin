import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom'; 


jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { token: 'fake-token' } })),
}));


const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockedNavigate,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  });

  it('renders correctly', () => {
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

 
  it('navigates to another page on successful login', async () => {
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'lankj01@pw.edu');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'Password@1235');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockedNavigate).toHaveBeenCalledWith('/Landingpage');
  });

it('fails on unsuccessful login', async () => {
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'lankj01@pw.edu');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'Password@1235');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockedNavigate).toHaveBeenCalledWith('/Landingpage');
  });
});
