# Securify Authentication Module

**Candidate**: Mayank  
**Role**: Frontend Developer  

## Project Overview

Welcome to the **Securify VPN Authentication Module**. This project was built to fulfill the DevLy Hiring Assignment requirements for a Frontend Developer role. It is a modern, highly optimized, and fully responsive authentication flow built using Next.js, TypeScript, and Tailwind CSS.

The application simulates a premium cybersecurity platform, featuring a dark, glassmorphic aesthetic with robust client-side validation and secure edge-case handling.

## Features

This project successfully implements 100% of the required and bonus features:

### Core Requirements
- **Login & Signup Pages**: Beautiful, responsive interfaces with strict form validation.
- **Forgot & Reset Password Pages**: Complete flows for account recovery simulation.
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
Since this utilizes a mock backend, you can test the authentication flow easily:
1. Try signing up with a new account.
2. The mock API will simulate a 1.5-second network request and automatically log you in, redirecting you to the protected `/profile` page.
3. Try navigating back to the home page (`/`) while logged in; the main CTA button will dynamically change to "Dashboard".
4. Log out and try testing the form validation by entering invalid emails or short passwords.

Thank you for reviewing my submission!
