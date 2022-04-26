import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ManageTaskDialog from '../../routes/manage-tasks/manageTaskDialog';

const createText = "Create New Task";

describe('ManageTaskDialog', () => {
  test('Find when create text when ManageTaskDialog is open', () => {
    render(<ManageTaskDialog open={true} />);
    expect(screen.getByText(createText)).toBeInTheDocument();
  });
  test('Can not find create text when ManageTaskDialog is closed', () => {
    render(<ManageTaskDialog open={false} />);
    expect(screen.queryByText(createText)).toBeNull();
  });
});
