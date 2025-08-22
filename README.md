# React Components Assignment

A comprehensive React component library built with TypeScript and TailwindCSS, featuring two main components: **InputField** and **DataTable**.

## 🚀 Features

- **TypeScript** with proper typing
- **TailwindCSS** for modern styling
- **Storybook** for component documentation
- **Responsive design**
- **Accessibility** (ARIA labels)
- **Clean, modern UI**

## 📦 Components

### InputField Component

A flexible input component with validation states and multiple variants.

**Features:**
- Text input with label, placeholder, helper text, error message
- States: disabled, invalid, loading
- Variants: filled, outlined, ghost
- Sizes: small, medium, large
- Optional: clear button, password toggle
- Support for light & dark theme

**Props:**
```typescript
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  required?: boolean;
}
```

### DataTable Component

A data table with sorting, row selection, and loading states.

**Features:**
- Display tabular data
- Column sorting
- Row selection (single/multiple)
- Loading state
- Empty state
- Custom cell rendering

**Props:**
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}
```

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd react-components-assignment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run Storybook:**
   ```bash
   npm run storybook
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

## 📖 Usage Examples

### InputField Examples

```tsx
import InputField from './components/InputField';

// Basic input
<InputField
  label="Name"
  placeholder="Enter your name"
  helperText="This is a helper text"
/>

// Password input with toggle
<InputField
  label="Password"
  type="password"
  placeholder="Enter your password"
  showPasswordToggle
  clearable
/>

// Input with error state
<InputField
  label="Email"
  type="email"
  placeholder="Enter your email"
  invalid={true}
  errorMessage="Please enter a valid email"
/>

// Different variants
<InputField variant="filled" placeholder="Filled input" />
<InputField variant="ghost" placeholder="Ghost input" />

// Different sizes
<InputField size="sm" placeholder="Small input" />
<InputField size="lg" placeholder="Large input" />
```

### DataTable Examples

```tsx
import DataTable, { Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

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
  }
];

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
];

// Basic table
<DataTable data={users} columns={columns} />

// Table with row selection
<DataTable 
  data={users} 
  columns={columns} 
  selectable 
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>

// Loading state
<DataTable data={[]} columns={columns} loading={true} />

// Empty state
<DataTable data={[]} columns={columns} emptyText="No users found" />
```

## 🎨 Styling

The components use TailwindCSS for styling with a custom color palette:

- **Primary colors**: Blue shades for primary actions
- **Gray colors**: Neutral grays for text and backgrounds
- **Status colors**: Green for success, red for errors
- **Responsive design**: Mobile-first approach

## ♿ Accessibility

Both components include proper accessibility features:

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** for interactive elements
- **Semantic HTML** structure
- **Color contrast** compliance

## 🧪 Testing

The project includes basic tests for both components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📚 Storybook

Storybook provides interactive documentation for all components:

```bash
# Start Storybook
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

Visit `http://localhost:6006` to view the component documentation.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.stories.tsx
│   │   └── index.ts
│   └── DataTable/
│       ├── DataTable.tsx
│       ├── DataTable.stories.tsx
│       └── index.ts
├── App.tsx
├── index.tsx
└── index.css
```

## 🚀 Deployment

### Storybook Deployment

1. **Build Storybook:**
   ```bash
   npm run build-storybook
   ```

2. **Deploy to Chromatic:**
   ```bash
   npx chromatic --project-token=<your-token>
   ```

3. **Deploy to Vercel:**
   ```bash
   npx vercel --prod
   ```

### App Deployment

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform** (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built as a React component development assignment showcasing modern React patterns, TypeScript, and TailwindCSS.
