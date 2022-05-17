import React from 'react';
import AppFunctional from './AppFunctional';
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('renders without errors', () => {
  render(<AppFunctional />);
});
