# 🎨 Style Guide

This document defines the coding standards and styling guidelines for the Dumbmerch Frontend. Adhering to these guidelines ensures code consistency and maintainability.

## 📝 Naming Conventions

### Files and Directories
- **Components**: PascalCase (e.g., `ProductCard.tsx`, `Navbar.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Code
- **Variables**: camelCase (`const userProfile = ...`)
- **React Components**: PascalCase (`function UserProfile() { ... }`)
- **Interfaces/Types**: PascalCase (`interface UserProps { ... }`)
- **Boolean Props**: Prefix with `is`, `has`, or `should` (e.g., `isLoading`, `hasError`)

## 💅 CSS & Styling

We use **Tailwind CSS** as our primary styling engine.

### Best Practices
- **Utility First**: Use Tailwind utility classes for layout, spacing, and typography.
- **Avoid Magic Numbers**: Use Tailwind's spacing scale (e.g., `p-4`, `m-2`) instead of arbitrary pixels.
- **Responsiveness**: Use mobile-first prefixes (`md:`, `lg:`) for responsive designs.
- **Interactive States**: Always define `:hover`, `:focus`, and `:active` states for interactive elements.

```tsx
// ✅ Good
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Click Me
</button>

// ❌ Bad (Using arbitrary values and inline styles)
<button style={{ backgroundColor: '#3b82f6', padding: '10px' }}>
  Click Me
</button>
```

## ⚛️ React Best Practices

1. **Functional Components**: Use functional components with Hooks. Avoid Class components.
2. **Prop Destructuring**: Always destructure props for clarity.
3. **Dependency Arrays**: Ensure `useEffect` and `useCallback` dependency arrays are accurate.
4. **Fragment Short Syntax**: Use `<>...</>` instead of `<React.Fragment>`.

## 🧹 Linting & Formatting

We use **ESLint** and **Prettier** to enforce code quality.

- Run Linter: `npm run lint`
- Prettier runs automatically on commit via Husky (if configured).

### Rules Highlight
- No `console.log` in production.
- No unused variables (`no-unused-vars`).
- Explicit return types for complex functions.
