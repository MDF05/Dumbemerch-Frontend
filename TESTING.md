# 🧪 Testing Guide

This document outlines the testing strategy for the Dumbmerch Frontend.

> **Note**: As of the current version, comprehensive automated testing is in the implementation phase.

## 🎯 Testing Levels

### 1. Unit Testing (Planned)
- **Tool**: Vitest + React Testing Library
- **Scope**: Individual components, hooks, and utility functions.
- **Goal**: Ensure isolated parts of the application work as expected.

### 2. Integration Testing (Planned)
- **Scope**: Interaction between components (e.g., Parent-Child communication, Redux state updates).
- **Goal**: Verify that modules work together correctly.

### 3. End-to-End (E2E) Testing (Planned)
- **Tool**: Cypress or Playwright
- **Scope**: Critical user flows (Login -> Add to Cart -> Checkout).
- **Goal**: Simulate real user behavior and ensure the system works as a whole.

## 🛠️ Running Tests

*Commands will be available once the test suite is configured.*

```bash
# Run Unit Tests
npm run test

# Run Test with Coverage
npm run test:coverage

# Run E2E Tests
npm run e2e
```

## ✅ Manual Testing Checklist

Before submitting a Pull Request, please manually verify:

- [ ] **Responsiveness**: The UI looks good on Mobile, Tablet, and Desktop.
- [ ] **Cross-Browser**: Tested on Chrome, Firefox, and Edge.
- [ ] **Console Errors**: No errors or unhandled warnings in the DevTools console.
- [ ] **Happy Path**: The main functionality (e.g., purchasing an item) works.
- [ ] **Error Handling**: Forms display validation errors correctly.
