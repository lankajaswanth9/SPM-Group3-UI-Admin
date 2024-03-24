import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import AddUserForm from './AddUserForm';

describe('AddUserForm', () => {
  test('submits correct data', async () => {
    const handleSave = jest.fn();
    const handleCancel = jest.fn();

    render(<AddUserForm onSave={handleSave} onCancel={handleCancel} />);

    // Simulate user typing into the input fields
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/Name/i), 'John Doe');
      await userEvent.type(screen.getByLabelText(/Email/i), 'john.doe@example.com');
      await userEvent.type(screen.getByLabelText(/Password/i), 'password123');
      await userEvent.selectOptions(screen.getByLabelText(/Role/i), 'User');
    });

    // Simulate form submission
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /add/i }));
    });

    // Check if handleSave was called with the correct data
    expect(handleSave).toHaveBeenCalledWith({
      Name: 'John Doe',
      Email: 'john.doe@example.com',
      Password: 'password123',
      role: 'User',
    });
  });

  test('cancels correctly', async () => {
    const handleSave = jest.fn();
    const handleCancel = jest.fn();

    render(<AddUserForm onSave={handleSave} onCancel={handleCancel} />);

    // Simulate clicking the cancel button
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    // Check if handleCancel was called
    expect(handleCancel).toHaveBeenCalled();
  });
});
