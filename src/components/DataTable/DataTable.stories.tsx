import type { Meta, StoryObj } from '@storybook/react';
import DataTable, { Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'inactive', lastLogin: '2024-01-08' },
];

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 15, rating: 4.5 },
  { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics', stock: 50, rating: 4.2 },
  { id: 3, name: 'Keyboard', price: 89.99, category: 'Electronics', stock: 25, rating: 4.7 },
  { id: 4, name: 'Monitor', price: 299.99, category: 'Electronics', stock: 10, rating: 4.8 },
  { id: 5, name: 'Headphones', price: 149.99, category: 'Audio', stock: 30, rating: 4.3 },
];

const userColumns: Column<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sortable: true,
    width: '80px',
    align: 'center'
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    sortable: true,
    align: 'center'
  }
];

const productColumns: Column<Product>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sortable: true,
    width: '80px',
    align: 'center'
  },
  {
    key: 'name',
    title: 'Product Name',
    dataIndex: 'name',
    sortable: true
  },
  {
    key: 'price',
    title: 'Price',
    dataIndex: 'price',
    sortable: true,
    render: (value: number) => `$${value.toFixed(2)}`,
    align: 'right'
  },
  {
    key: 'category',
    title: 'Category',
    dataIndex: 'category',
    sortable: true
  },
  {
    key: 'stock',
    title: 'Stock',
    dataIndex: 'stock',
    sortable: true,
    align: 'center'
  },
  {
    key: 'rating',
    title: 'Rating',
    dataIndex: 'rating',
    sortable: true,
    render: (value: number) => (
      <div className="flex items-center">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{value}</span>
      </div>
    ),
    align: 'center'
  }
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    selectable: {
      control: { type: 'boolean' },
    },
    emptyText: {
      control: { type: 'text' },
    },
    loadingText: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  } as any,
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  } as any,
};

export const ProductsTable: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    selectable: true,
  } as any,
};

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  } as any,
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyText: 'No users found',
  } as any,
};

export const CustomEmptyText: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyText: 'No data available at the moment',
  } as any,
};

export const CustomLoadingText: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
    loadingText: 'Fetching data...',
  } as any,
};

export const WithCustomTexts: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
    selectAllText: 'Select All Users',
    selectedText: 'users selected',
  } as any,
};
