import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import StatDisplay from '../../routes/stats/statDisplay';

describe('StatDisplay', () => {
  test('Find header text on document', () => {
    const headerText = "header_test";
    render(<StatDisplay header={headerText} stat={0} />);
    expect(screen.getByText(headerText)).toBeInTheDocument();
  });
  test('Find stat number on document', () => {
    const statNumber = 123;
    render(<StatDisplay header={""} stat={statNumber} />);
    expect(screen.getByText(statNumber)).toBeInTheDocument();
  });
});
