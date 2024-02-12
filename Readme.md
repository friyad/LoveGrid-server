# XenoGraft Mobiles Server

\
[Live Server Demo Link](https://xenograft-mobiles-server.vercel.app/)\
\
\
![image](https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-friyad/assets/86700138/d1023645-23cc-4cdb-850f-22b65eda89d0)

## Description

XenoGraft Mobiles Server is the backend component of the smartphone management dashboard, responsible for managing, selling, and tracking the sales of smartphones. It handles authentication, CRUD operations, sales management, and more.

## Features

### 1. Authentication

- Secure authentication using JWT.
- User Registration and Login.
- Single user role for managing the system.

### 2. Smartphone Management

#### CRUD Operations

- Add, delete, update smartphone details.
- Duplicate & Edit / Create Variant from existing smartphones.
- Supply smartphone list to view from the inventory.

### 3. Sales Management

- Handle smartphone sales.
- Update the inventory upon a successful sale.

### 4. Express Server Features

- Secured with Helmet for enhanced security.
- CORS enabled for cross-origin resource sharing.
- Cookie parsing for handling cookies.
- Use of bcrypt for password hashing.
- Dotenv for environment variable management.

### 5. Request Validation

- Input validation using Zod for enhanced security.

## Technologies

- Express.js
- TypeScript
- MongoDB with Mongoose
- Bcrypt
- Helmet
- JWT (JSON Web Tokens)
- Zod for validation
- Dotenv

## Dependencies

- List of dependencies mentioned in `package.json`.

## Setup

1. Clone the repository.

```
git clone <repo_url>
```

2. Run this command to install dependencies.

```
npm install
```

3. Use scripts mentioned above for various tasks.
