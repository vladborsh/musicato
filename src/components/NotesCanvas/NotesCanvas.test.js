import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotesCanvas from './NotesCanvas';

describe('<NotesCanvas />', () => {
  test('it should mount', () => {
    render(<NotesCanvas />);
    
    const notesCanvas = screen.getByTestId('NotesCanvas');

    expect(notesCanvas).toBeInTheDocument();
  });
});