import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable, { Column } from './DataTable';

interface TestData {
  id: number;
  name: string;
  email: string;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const testColumns: Column<TestData>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sortable: true,
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: false,
  },
];

describe('DataTable', () => {
  it('renders table headers', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders table data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('shows loading state when loading prop is true', () => {
    render(<DataTable data={[]} columns={testColumns} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('shows custom empty text', () => {
    render(<DataTable data={[]} columns={testColumns} emptyText="No users found" />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders select all checkbox when selectable is true', () => {
    render(<DataTable data={testData} columns={testColumns} selectable={true} />);
    expect(screen.getByText('Select All')).toBeInTheDocument();
  });

  it('calls onRowSelect when row is selected', () => {
    const handleRowSelect = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    );
    
    const checkbox = screen.getAllByRole('checkbox')[1]; // First row checkbox
    fireEvent.click(checkbox);
    
    expect(handleRowSelect).toHaveBeenCalled();
  });

  it('renders custom cell content when render function is provided', () => {
    const columnsWithRender: Column<TestData>[] = [
      ...testColumns,
      {
        key: 'status',
        title: 'Status',
        dataIndex: 'name',
        render: (value) => <span data-testid="custom-cell">{value}</span>,
      },
    ];

    render(<DataTable data={testData} columns={columnsWithRender} />);
    expect(screen.getAllByTestId('custom-cell')).toHaveLength(2);
  });

  it('shows selected count when rows are selected', () => {
    const handleRowSelect = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    );
    
    const checkbox = screen.getAllByRole('checkbox')[1]; // First row checkbox
    fireEvent.click(checkbox);
    
    expect(screen.getByText('1 selected')).toBeInTheDocument();
  });
});
