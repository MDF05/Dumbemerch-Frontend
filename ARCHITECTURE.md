# 🏗️ Frontend Architecture

This document describes the high-level architecture of the Dumbmerch Frontend application.

## 🏛️ Architectural Pattern

The application follows a **Component-Based Architecture** using React, structured to be modular, reusable, and testable.

### Key Concepts

- **Atomic Design Principles**: Components are organized (loosely) by complexity, from basic UI elements (Atoms) to complex page layouts (Pages).
- **Unidirectional Data Flow**: Data flows down via props, and actions flow up via callbacks or Redux actions.
- **Separation of Concerns**: Logic is separated from UI using Custom Hooks and Redux Slices.

## 📂 Directory Structure

```plaintext
src/
├── assets/         # Static assets (images, fonts, global styles)
├── components/     # Reusable UI components
│   ├── common/     # Generic components (Buttons, Inputs, Modals)
│   ├── layout/     # Structural components (Navbar, Footer, Sidebar)
│   └── specific/   # Feature-specific components (ProductCard, CartItem)
├── config/         # App configuration (axios setup, constants)
├── hooks/          # Custom React hooks (useAuth, useCart)
├── layout/         # Layout wrapper components
├── pages/          # Page components (routed views)
├── redux/          # Redux state management
│   ├── slices/     # Redux Toolkit slices (reducers & actions)
│   └── store.ts    # Store configuration
├── routes/         # Router configuration
├── services/       # API integration services
├── types/          # TypeScript type definitions and interfaces
├── utils/          # Utility functions and helpers
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## 🔄 State Management

We use **Redux Toolkit** for global state management.

- **Auth Slice**: Manages user session, tokens, and profile data.
- **Cart Slice**: Handles shopping cart operations (add, remove, update quantities).
- **UI Slice**: Manages global UI state (modals, toasts, themes).

## 🌐 Data Fetching

- **Axios**: Used for HTTP requests.
- **Services Pattern**: API calls are encapsulated in `src/services/` to decouple UI from API logic.
- **React Query** (Recommended upgrade): Considered for future caching and server-state management.

## 🔌 Real-time Updates

- **Socket.io**: Used for real-time features like order status updates and notifications.
- The socket connection is managed via a custom hook or context provider to ensure a single connection instance.

## 🎨 Design System

- **Styling**: Tailwind CSS for layout and utilities.
- **Components**: Chakra UI for accessible, pre-built components.
- **Theming**: A custom Chakra theme configuration is located in `src/theme/`.
