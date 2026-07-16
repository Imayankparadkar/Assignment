# DevLy Auth Module

A modern Authentication Module built for the DevLy Hiring Assignment.

## Features

- **Modern Tech Stack**: Built with Next.js (App Router), React, TypeScript, and Tailwind CSS (v4).
- **Comprehensive Auth Flow**: Includes Login, Signup, Forgot Password, Reset Password, and a protected Profile page.
- **Robust Validation**: Form validation handled using `react-hook-form` and `zod` schemas.
- **Mock Authentication**: Simulates a backend with `AuthContext` and uses `localStorage` for maintaining session state across refreshes.
- **Premium UI/UX**: Sleek dark mode design with glassmorphism effects, smooth animations, and responsive layouts.
- **Bonus Features**:
  - Google Sign-In UI mock
  - "Remember Me" checkbox
  - Password visibility toggle

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Testing the Auth Flow

1. You will be redirected to `/login` if not authenticated.
2. Enter any valid email (e.g., `test@example.com`) and a password (min 6 characters) to sign in. 
   *(Note: For demonstration purposes, entering `error@demo.com` simulates a failed login)*
3. Alternatively, test the **Sign Up** page with form validation.
4. Test the **Forgot Password** and **Reset Password** flows.
5. Upon successful login, you will be redirected to the `/profile` page (Protected Route).
6. Click **Sign out** to clear the mock session and return to the login screen.

## Architecture & Code Quality

- **Component-Driven**: Reusable UI components (`Input`, `Button`, `Card`, `Label`) located in `src/components/ui/`.
- **State Management**: Centralized in `src/context/AuthContext.tsx` using React Context.
- **Styling**: Leverages Tailwind CSS v4's new `@theme` configuration in `globals.css` with custom utility classes like `.glass-card`.
- **Type Safety**: Fully typed with TypeScript interfaces and strict Zod validation schemas.
