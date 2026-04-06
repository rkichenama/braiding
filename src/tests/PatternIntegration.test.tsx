import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock html-to-image to avoid issues in test environment
jest.mock('html-to-image', () => ({
  toPng: jest.fn().mockResolvedValue('data:image/png;base64,mock')
}));

describe('Braiding Visualizer Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '';
  });

  test('should render the app and allow changing row count', async () => {
    render(<App />);
    
    expect(screen.getByText('Braiding Visualizer')).toBeInTheDocument();
    
    const rowsInput = screen.getByLabelText('Rows');
    fireEvent.change(rowsInput, { target: { value: '16' } });
    
    // Check if the badge updates
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  test('should allow saving a pattern to history', async () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText('Pattern Name');
    fireEvent.change(nameInput, { target: { value: 'My Test Pattern' } });
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    // Check if history count updates
    expect(screen.getByText('History (1)')).toBeInTheDocument();
    
    // Open history and verify the pattern is there
    const historyButton = screen.getByText('History (1)');
    fireEvent.click(historyButton);
    
    expect(screen.getByText('My Test Pattern')).toBeInTheDocument();
  });

  test('should allow importing a pattern from a string', async () => {
    render(<App />);
    
    const importTextarea = screen.getByPlaceholderText('Paste pattern string here...');
    // Simple 8-strand pattern string (made up for test)
    const patternStr = "32,8,8,u4 o4,u4 o4,#272823;#272823;#272823;#272823;#272823;#272823;#272823;#272823,#51208f;#51208f;#51208f;#51208f;#51208f;#51208f;#51208f;#51208f,0|0;0|0";
    
    fireEvent.change(importTextarea, { target: { value: patternStr } });
    
    const importButton = screen.getByRole('button', { name: /import/i });
    fireEvent.click(importButton);
    
    // Verify state updated (strands should be 8)
    const strandsBadges = screen.getAllByText('8');
    expect(strandsBadges.length).toBeGreaterThan(0);
  });

  test('should allow navigating through the weave steps', async () => {
    render(<App />);
    
    const nextButton = screen.getByTitle('Next Step');
    const prevButton = screen.getByTitle('Previous Step');
    
    expect(screen.getByText('1')).toBeInTheDocument(); // Row 1
    
    fireEvent.click(nextButton);
    expect(screen.getByText('right')).toBeInTheDocument(); // Should switch to right hand
    
    fireEvent.click(nextButton);
    expect(screen.getByText('2')).toBeInTheDocument(); // Row 2
    
    fireEvent.click(prevButton);
    expect(screen.getByText('right')).toBeInTheDocument(); // Back to right hand of row 1
  });
});
