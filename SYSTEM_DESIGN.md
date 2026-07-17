# Securify Authentication Module: System Design & Architecture

This document outlines the architectural decisions and strategies required to scale this Authentication Module to handle **1 million concurrent users** while preventing edge cases like race conditions.

---

## 1. Frontend Architecture & Optimization

### Framework
- **Next.js (App Router)**: Utilizing React Server Components (RSC) to reduce the client-side JavaScript bundle size. The landing page and static UI elements are statically generated at build time (SSG), ensuring lightning-fast load times.
- **State Management**: React Context API (`AuthContext`) is used for global authentication state. For a larger app, this could be migrated to Zustand or Redux Toolkit, but Context is sufficient and highly optimized for purely auth-related state.

### Scaling the Frontend (1M Users)
- **CDN (Content Delivery Network)**: All static assets (CSS, JS bundles) and statically generated pages are cached at the edge via Vercel's Edge Network or Cloudflare. This means hitting the landing page does not consume backend compute resources.
- **Debouncing & Throttling**: Form inputs (like checking if an email is available during signup) are debounced to prevent spamming the backend with API requests on every keystroke.

---

## 2. Backend Scalability Strategy (Theoretical)

To support 1 million concurrent users, the backend must be highly distributed.

- **Load Balancer**: An API Gateway (e.g., AWS API Gateway or NGINX) distributes incoming authentication requests across horizontally scaled microservices (e.g., Node.js or Go containers running on Kubernetes).
- **Database**: 
  - **Writes**: A highly available distributed SQL database (e.g., PostgreSQL with active-passive failover or CockroachDB) handles user creation.
  - **Reads**: Read Replicas are used to verify credentials during login.
- **Caching Layer**: Redis is utilized to cache session metadata, rate limit counters, and temporary blacklisted JWT tokens.

---

## 3. Handling Race Conditions

In high-concurrency environments, race conditions can occur (e.g., two requests attempting to register the same email address at the exact same millisecond). 

### Signup Race Conditions
1. **Database Constraints**: The absolute source of truth is the database schema. The `email` column must have a `UNIQUE` index constraint. If a race condition occurs, the database will throw a constraint violation error for the second transaction, which the API cleanly catches and returns as a `409 Conflict`.
2. **Distributed Locking**: For highly complex operations (e.g., allocating a limited promo code during signup), we use Redis-based distributed locks (Redlock algorithm) to ensure only one process mutates the resource at a time.

### Token Refresh Race Conditions
If a client fires multiple requests simultaneously when an access token expires, it can trigger multiple refresh token requests, potentially invalidating tokens and logging the user out.
- **Solution**: The frontend implements a **Request Queue** or a **Promise Latch** in the Axios/Fetch interceptor. When a 401 Unauthorized is detected, the first request triggers the refresh flow, while subsequent requests are paused and queued until the new token is received, then retried with the new token.

---

## 4. Security & JWT Best Practices

- **Token Storage**: Access tokens should not be stored in `localStorage` (to prevent XSS attacks). They should be stored in memory or in short-lived HTTP-only, secure cookies.
- **Token Expiry**: Access tokens have a short lifespan (e.g., 15 minutes). Refresh tokens are stored securely in HttpOnly cookies and use **Refresh Token Rotation** (a new refresh token is issued every time it is used) to detect and prevent token theft.
- **Rate Limiting**: Redis-backed rate limiting ensures endpoints like `/api/login` and `/api/forgot-password` cannot be brute-forced (e.g., max 5 attempts per IP per 15 minutes).
- **Email Verification (Implemented)**: To prevent bot registrations and ensure data integrity, a real 6-digit OTP verification flow is integrated using Next.js API routes and the Resend API. Accounts remain locked (`verified: false`) until the exact code delivered to their inbox is validated.
