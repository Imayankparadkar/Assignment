# Securify Authentication Module

## Project Overview

Welcome to the **Securify VPN Authentication Module**. This project was built to fulfill the DevLy Hiring Assignment requirements for a Frontend Developer role. It is a modern, highly optimized, and fully responsive authentication flow built using Next.js, TypeScript, and Tailwind CSS.

The application simulates a premium cybersecurity platform, featuring a dark, glassmorphic aesthetic with robust client-side validation and secure edge-case handling.

## Features

This project successfully implements 100% of the required and bonus features:

### Core Requirements
- **Login & Signup Pages**: Beautiful, responsive interfaces with strict form validation.
- **Email Verification**: Real 6-digit OTP email verification flow integrated with Resend API for new signups.
- **Forgot & Reset Password Pages**: Complete flows for account recovery simulation via real email delivery.
- **Profile Dashboard**: A protected route only accessible to authenticated users.
- **Form Validation**: Powered by `zod` and `react-hook-form` to ensure secure, correct data entry.
- **Mock JWT Authentication**: A simulated authentication flow managed globally via React Context.
- **Loading & Error States**: Comprehensive UI feedback during simulated API calls, including form-freezing to prevent race conditions.
- **Fully Responsive**: Flawless design execution across desktop, tablet, and mobile breakpoints.

### Bonus Features Included
- **Google Sign-In UI**: Mockup integration on the login page.
- **Remember Me Option**: Checkbox integration on the login page.
- **Password Visibility Toggle**: Interactive "eye" icons to hide/show passwords across all relevant forms.

## Enterprise-Grade Optimizations
- **Edge Case Protection**: Implemented `useEffect` cleanup functions on all mock API calls to prevent React memory leaks (state updates on unmounted components).
- **Race Condition Prevention**: Input fields are strictly disabled (`disabled={isLoading}`) during form submission to prevent concurrent data mutations.
- **System Design Ready**: Please refer to the `SYSTEM_DESIGN.md` file located in the root of this repository for documentation on how this application would scale to 1 million users and handle backend race conditions.

## Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Setup Instructions

Follow these simple steps to run the project locally on your machine.

### Prerequisites
- Node.js 18.x or later installed on your system.
- `npm` or `yarn` installed.

### 1. Clone the repository
```bash
git clone https://github.com/Imayankparadkar/Assignment.git
cd Assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

### 4. View the App
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## Testing the Auth Flow
To make this frontend assignment behave exactly like a real full-stack application, authentication is powered by a **Simulated Database** using `localStorage`.

1. **Sign Up & Email Verification**: When you sign up, your account is saved as `verified: false`. The app uses a Next.js API route and the **Resend API** to email you a real 6-digit OTP code to verify your account.
2. **Resend Sandbox Limitation**: *Note for Evaluators: Because this project uses a free Resend developer account, the API is in Sandbox mode and will only successfully send emails to my registered email address. In a production environment with a verified domain, this restriction is lifted.*
3. **Login**: You cannot log in unless you have created an account and verified it.
4. **Quick Test Account**: To bypass the signup/verification flow for quick UI testing, a default verified account is pre-seeded into the database:
   - **Email**: `test@example.com`
   - **Password**: `password123`

Thank you for reviewing my submission!
