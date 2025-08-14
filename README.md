# Wallet Management API

A secure wallet management backend built with **TypeScript**, **Zod**, and **Express**, deployed on **Vercel**.  
Provides authentication, wallet management, transactions, and role-based access control.

**Base URL:**  
- Live App: [https://walet-management.vercel.app](https://walet-management.vercel.app)  
- API: [https://walet-management.vercel.app/api/v1](https://walet-management.vercel.app/api/v1)

git link : https://github.com/parves2023/Ph-tour-management
---

## API Endpoints

### **Auth Routes** (`/auth`)
| Method | Endpoint          | Description |
|--------|-------------------|-------------|
| POST   | `/login`          | User login, returns access & refresh tokens |
| POST   | `/refresh-token`  | Refresh access token |
| POST   | `/logout`         | Logout user and clear tokens |

---

### **User Routes** (`/users`)
| Method | Endpoint            | Access | Description |
|--------|---------------------|--------|-------------|
| GET    | `/`                 | Admin  | Get all users |
| GET    | `/:id`              | Admin/User | Get user by ID |
| PATCH  | `/block/:id`        | Admin  | Block a user |
| PATCH  | `/unblock/:id`      | Admin  | Unblock a user |

---

### **Wallet Routes** (`/wallets`)
| Method | Endpoint            | Access | Description |
|--------|---------------------|--------|-------------|
| GET    | `/`                 | Admin  | Get all wallets (filter with `role=USER|AGENT`) |
| GET    | `/me`               | Agent/User | Get current user's wallet |
| PATCH  | `/block/:id`        | Admin  | Block a wallet |
| PATCH  | `/unblock/:id`      | Admin  | Unblock a wallet |

---

### **Transaction Routes** (`/transactions`)
| Method | Endpoint            | Access | Description |
|--------|---------------------|--------|-------------|
| POST   | `/add-money`        | User   | Add money to wallet |
| POST   | `/withdraw`         | User   | Withdraw money |
| POST   | `/send-money`       | User   | Send money to another wallet |
| GET    | `/me`               | User/Agent | Get own transaction history |
| GET    | `/`                 | Admin  | Get all transactions |
| POST   | `/cash-in`          | Agent  | Cash in money to a user wallet |
| POST   | `/cash-out`         | Agent  | Cash out money from a user wallet |

---

## Middleware
- **`checkAuth`** — Role-based JWT authentication & account status verification  
- **`zodValidateRequest`** — Request body validation using Zod schemas  
- **`globalErrorHandler`** — Central error handling for validation, auth, and database errors  
- **`notFound`** — 404 handler for undefined routes  

---

## Utilities
- **`calculateBySendMoneyFee`** — Calculates send money fee (default rate applied)  
- **`calculateTotalWithFee`** — Calculates total amount with customizable fee per thousand  
- **`catchAsync`** — Wraps async route handlers for error catching  
- **`sendResponse`** — Standardized API response format  
- **`setAuthCookie`** — Sets HTTP-only cookies for tokens  
- **`createUserTokens`** — Generates JWT access & refresh tokens  
- **`jwt` utility** — Token creation and verification helpers  

---

## Error Handling
The global error handler covers:
- MongoDB duplicate key errors  
- Cast errors (invalid ObjectIds)  
- Mongoose validation errors  
- Zod schema validation errors  
- Custom `AppError` exceptions  
- General server errors  

Errors are returned in **consistent JSON format** with HTTP status codes and clear messages.

---

## Deployment
The project is deployed on **Vercel** using the following configuration:

```json
{
  "version": 2,
  "builds": [
    { "src": "dist/server.js", "use": "@vercel/node" }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
