# Dumbmerch Frontend

![Project Banner](https://via.placeholder.com/1200x300?text=Dumbmerch+Frontend)

> A modern, responsive e-commerce frontend built with **React**, **TypeScript**, and **Vite**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2.x-teal)](https://chakra-ui.com/)

---

## 📖 Frontend Overview

**Dumbmerch** is a full-featured e-commerce platform designed to provide a seamless shopping experience. The frontend is engineered for performance, scalability, and maintainability, leveraging the latest web technologies.

This repository contains the client-side application, handling user interfaces for product browsing, shopping cart management, user authentication, and real-time order updates.

## ✨ Features

- **🛍️ Product Catalog**: Dynamic product listing with filtering and search capabilities.
- **🛒 Shopping Cart**: Persistent cart state management using Redux Toolkit.
- **🔐 Authentication**: Secure login and registration with JWT handling.
- **💳 Checkout System**: Integrated payment gateway interface (Midtrans).
- **📱 Responsive Design**: Fully responsive UI using Tailwind CSS and Chakra UI.
- **⚡ Real-time Updates**: Live notifications and order status updates via Socket.io.
- **🎨 Interactive UI**: Smooth animations powered by Framer Motion.

## 🛠️ Tech Stack

| Category          | Technology |
|-------------------|------------|
| **Core**          | [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool**    | [Vite](https://vitejs.dev/) |
| **State Management**| [Redux Toolkit](https://redux-toolkit.js.org/) |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/), [Chakra UI](https://chakra-ui.com/), [Emotion](https://emotion.sh/) |
| **Forms**         | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Networking**    | [Axios](https://axios-http.com/), [Socket.io Client](https://socket.io/) |
| **Animation**     | [Framer Motion](https://www.framer.com/motion/) |
| **Routing**       | [React Router DOM](https://reactrouter.com/) |

## 🚀 Installation

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/MDF05/dumbmerch-frontend.git
   cd dumbmerch-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   Copy the example environment file and update the values.
   ```bash
   cp .env.example .env
   ```
   *See [ENVIRONMENT.md](./ENVIRONMENT.md) for details.*

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

## 📦 Build & Deployment

To build the application for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

*For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).*

## 📚 Documentation

We maintain comprehensive documentation to ensure code quality and ease of contribution.

| Document | Description |
|----------|-------------|
| [**ARCHITECTURE.md**](./ARCHITECTURE.md) | System design, directory structure, and data flow. |
| [**STYLE_GUIDE.md**](./STYLE_GUIDE.md) | Coding standards, naming conventions, and UI guidelines. |
| [**ENVIRONMENT.md**](./ENVIRONMENT.md) | Guide to environment variables and configuration. |
| [**DEPLOYMENT.md**](./DEPLOYMENT.md) | CICD pipelines and production deployment guide. |
| [**TESTING.md**](./TESTING.md) | Testing strategies, tools, and commands. |
| [**CONTRIBUTING.md**](./CONTRIBUTING.md) | Guidelines for contributing to the codebase. |
| [**CODE_OF_CONDUCT.md**](./CODE_OF_CONDUCT.md) | Community standards and expectations. |
| [**CHANGELOG.md**](./CHANGELOG.md) | Version history and release notes. |
| [**ROADMAP.md**](./ROADMAP.md) | Future features and development plans. |
| [**SUPPORT.md**](./SUPPORT.md) | How to get help and report issues. |
| [**DISCLAIMER.md**](./DISCLAIMER.md) | Legal disclaimers and liability limitations. |
| [**LICENSE**](./LICENSE) | MIT License details. |

## 🤝 Contribution Guide

We welcome contributions! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

## ✍️ Author

**Dumbmerch Team**
*Building the future of e-commerce.*
