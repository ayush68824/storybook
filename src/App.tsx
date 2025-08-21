import React, { useState } from 'react';
import InputField from './components/InputField';
import DataTable, { Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const sampleUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'inactive', lastLogin: '2024-01-08' },
  ];

  const columns: Column<User>[] = [
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            React Components Assignment
          </h1>
          <p className="text-gray-600">
            InputField and DataTable Components with TypeScript and TailwindCSS
          </p>
        </div>

        {/* InputField Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">InputField Component</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Input */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Input</h3>
              <InputField
                label="Name"
                placeholder="Enter your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="This is a helper text"
              />
            </div>

            {/* Password Input */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Password Input</h3>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                showPasswordToggle
                clearable
              />
            </div>

            {/* Email Input with Error */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Input (Error State)</h3>
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                invalid={emailValue.length > 0 && !emailValue.includes('@')}
                errorMessage={emailValue.length > 0 && !emailValue.includes('@') ? 'Please enter a valid email' : ''}
                clearable
              />
            </div>

            {/* Disabled Input */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Disabled Input</h3>
              <InputField
                label="Disabled Field"
                placeholder="This field is disabled"
                value="Disabled value"
                disabled
              />
            </div>

            {/* Loading Input */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Loading Input</h3>
              <InputField
                label="Loading Field"
                placeholder="Loading..."
                value="Loading value"
                loading
              />
            </div>

            {/* Required Input */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Required Input</h3>
              <InputField
                label="Required Field"
                placeholder="This field is required"
                required
              />
            </div>
          </div>

          {/* Variants */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Input Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Outlined Variant"
                placeholder="Outlined input"
                variant="outlined"
              />
              <InputField
                label="Filled Variant"
                placeholder="Filled input"
                variant="filled"
              />
              <InputField
                label="Ghost Variant"
                placeholder="Ghost input"
                variant="ghost"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Input Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Small Size"
                placeholder="Small input"
                size="sm"
              />
              <InputField
                label="Medium Size"
                placeholder="Medium input"
                size="md"
              />
              <InputField
                label="Large Size"
                placeholder="Large input"
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* DataTable Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">DataTable Component</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Management Table</h3>
            <DataTable
              data={sampleUsers}
              columns={columns}
              selectable
              onRowSelect={setSelectedUsers}
            />
            
            {selectedUsers.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Selected Users:</h4>
                <ul className="text-sm text-blue-800">
                  {selectedUsers.map(user => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Built with React, TypeScript, and TailwindCSS</p>
        </div>
      </div>
    </div>
  );
};

export default App;
