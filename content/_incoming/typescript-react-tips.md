---
title: "TypeScript Tips for React Developers"
date: "2025-04-09"
author: "Harsha Gouru"
tags: ["typescript", "react", "frontend", "javascript", "type-safety"]
excerpt: "Discover practical TypeScript techniques to enhance your React applications with improved type safety, better component props management, and more maintainable code."
---

# TypeScript Tips for React Developers

TypeScript has become the standard choice for building large-scale React applications, and for good reason. It provides type safety, better tooling, and more maintainable code. But simply using TypeScript isn't enough—you need to use it effectively. In this post, I'll share some practical TypeScript tips that will help you write better React applications.

## Properly Type Component Props

One of the first challenges you'll face when using TypeScript with React is typing component props correctly. Here's how to do it effectively:

```typescript
// Instead of using any or implicit types:
const Button = (props) => { /* ... */ }  // ❌ Bad

// Define an interface for your props:
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

// And use it:
const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {text}
    </button>
  );
};
```

Using this approach gives you autocomplete for props, type checking, and helps document your component's API.

## Use Discriminated Unions for Component States

When dealing with components that have multiple states, discriminated unions provide a clean way to model and handle those states:

```typescript
type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  data: User[];
};

type ErrorState = {
  status: 'error';
  error: string;
};

type UserListState = LoadingState | SuccessState | ErrorState;

function UserList() {
  const [state, setState] = useState<UserListState>({ status: 'loading' });

  useEffect(() => {
    fetchUsers()
      .then(data => setState({ status: 'success', data }))
      .catch(error => setState({ status: 'error', error: error.message }));
  }, []);

  // TypeScript will ensure you handle all cases
  switch (state.status) {
    case 'loading':
      return <div>Loading users...</div>;
    case 'success':
      return (
        <ul>
          {state.data.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      );
    case 'error':
      return <div>Error: {state.error}</div>;
  }
}
```

This pattern ensures you handle all possible states and gives you proper type checking within each branch.

## Type React Hooks Correctly

React hooks benefit immensely from TypeScript's type system. Here are some examples of typing hooks correctly:

### useState with Complex Types

```typescript
// Instead of this, which infers the type as string | null:
const [user, setUser] = useState(null);  // ❌ Not ideal

// Do this:
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);  // ✅ Better
```

### useRef with Proper Element Types

```typescript
// For DOM elements:
const inputRef = useRef<HTMLInputElement>(null);

// Later:
<input ref={inputRef} type="text" />

// Access safely:
const focusInput = () => {
  // inputRef.current will be properly typed as HTMLInputElement
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
```

## Create Reusable Type Utilities

As your application grows, you'll find yourself repeating similar type patterns. Create reusable type utilities to keep your code DRY:

```typescript
// Make all properties in a type required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Make all properties in a type optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Pick specific properties from a type
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Example: Creating a subset of a larger type
interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

// Only take what you need
type UserPreview = Pick<User, 'id' | 'name'>;
```

TypeScript actually includes these utility types by default, but this illustrates how you can create your own.

## Type Event Handlers Correctly

Event handling is a common source of type errors. Here's how to handle events properly:

```typescript
// Without typing (not recommended):
const handleChange = (e) => {  // ❌ Not good
  console.log(e.target.value);
};

// With proper typing:
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  // ✅ Better
  console.log(e.target.value);
};

// For forms:
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // form handling logic
};

<form onSubmit={handleSubmit}>
  <input type="text" onChange={handleChange} />
</form>
```

## Use Type Guards for Runtime Type Checking

TypeScript's static type checking is great, but sometimes you need to check types at runtime, especially when dealing with external data:

```typescript
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}

// Type guard function
function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

// Usage
function renderUserControls(user: User | Admin) {
  if (isAdmin(user)) {
    // TypeScript now knows user is Admin
    return <AdminControls permissions={user.permissions} />;
  } else {
    // TypeScript knows user is User
    return <UserControls name={user.name} />;
  }
}
```

## Conclusion

TypeScript adds tremendous value to React applications when used correctly. The tips above will help you leverage TypeScript effectively to create more robust, maintainable, and self-documenting React code. 

Remember these key points:
- Define clear interfaces for component props
- Use discriminated unions for state management
- Type hooks appropriately for their use cases
- Create reusable type utilities
- Type event handlers correctly
- Use type guards for runtime type checking

By following these practices, you'll avoid many common bugs and create a better developer experience for yourself and your team.