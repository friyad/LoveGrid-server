# Love Grid Server

![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?logo=mongoose&logoColor=white) ![Helmet](https://img.shields.io/badge/Helmet-7.x-000000) ![CORS](https://img.shields.io/badge/CORS-2.x-000000) ![Docker](https://img.shields.io/badge/Docker-24.x-2496ED?logo=docker&logoColor=white)

LoveGrid is a full-stack donation platform built with Next.js (frontend) and Express.js (backend), designed to help people discover, support, and manage fundraising campaigns. The app includes role-based access control, campaign creation with image upload, donations tracking, and an admin dashboard for actionable campaign insights.

## Important Links

| Link name       | Link                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| Live site       | [love-grid-client.vercel.app](https://love-grid-client.vercel.app)                                          |
| Frontend repo   | [LoveGrid-client](https://github.com/friyad/LoveGrid-client)                                                |
| Backend API     | [love-grid-server-backend API](https://love-grid-server-backend.onrender.com/api/v1)                        |
| Docker Hub repo | [friyad/love-grid-server-backend](https://hub.docker.com/repository/docker/friyad/love-grid-server-backend) |

Read More about the project [HERE](https://github.com/friyad/LoveGrid-client/tree/main#features-fullstack)

# Get Started

### Clone the Repository

```bash
git clone https://github.com/friyad/LoveGrid-server.git

cd love-grid-server
```

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

| Environment Variable | Example Value                                 | Description                                                                      |
| -------------------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| `PORT`               | `5000`                                        | Server port number (default: 5000)                                               |
| `DB_URL`             | `mongodb://localhost:27017/love-grid`         | MongoDB connection string (local or remote)                                      |
| `ALLOWED_ORIGINS`    | `http://localhost:3000,http://localhost:5000` | Comma-separated list of allowed CORS origins for frontend requests               |
| `JWT_SECRET`         | `your_jwt_secret_key_here`                    | Secret key for JWT token generation and verification (keep it secure and random) |
| `NODE_ENV`           | `development`                                 | Environment mode: `development` or `production`                                  |

## Running the Project

### Option 1: Development Mode Without Docker

#### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000` with **hot-reload** enabled (auto-restart on file changes).

---

### Option 2: Development Mode With Docker

#### Prerequisites

- **Docker Desktop** must be installed - [Download](https://www.docker.com/products/docker-desktop/)

#### Step 1: Build and Run with Docker Compose

```bash
npm run docker:dev
```

This command:

- Builds the development Docker image using `Dockerfile.dev`
- Starts the backend container on port 5000
- Mounts your local source code for live file sync (hot-reload)
- Streams logs to your terminal

#### Step 2: Stop the Container

```bash
docker compose --profile dev down
```

---

### Option 3: Production Mode With Docker

#### Step 1: Build and Run Production Container

```bash
npm run docker:build
```

This command:

- Builds the optimized production image using `Dockerfile` (multi-stage build)
- Starts the backend container on port 5000
- Compiles TypeScript to JavaScript for optimal performance

#### Step 2: Stop the Container

```bash
docker compose --profile prod down
```

## npm Scripts Explained

| Script         | Command                                                                                  | Purpose                                                                              |
| -------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `build`        | `rimraf build && npx tsc`                                                                | Removes old build directory and compiles TypeScript to JavaScript in `build/` folder |
| `start`        | `node build/index.js`                                                                    | Runs the compiled production build (requires `npm run build` first)                  |
| `dev`          | `nodemon -L src/index.ts`                                                                | Starts development server with hot-reload using nodemon                              |
| `docker:dev`   | `docker compose --profile dev up -d && docker compose --profile dev logs -f backend-dev` | Runs development container with Docker Compose and streams logs                      |
| `docker:build` | `docker compose --profile prod up -d --build`                                            | Builds and runs production container with Docker Compose                             |
| `docker:push`  | `bash -c "..."`                                                                          | Tags and pushes the Docker image to Docker Hub (requires version input)              |

## Project Architecture

- `src/index.ts`
  - Main Express server setup with CORS, helmet, cookie-parser, and error handling.
  - Connects to MongoDB database.
  - Routes prefixed with `/api/v1`.
- `src/config/dbConfig.ts`
  - MongoDB connection using Mongoose.
- `src/models/userModel.ts` & `src/models/campaignModel.ts`
  - Mongoose schemas for User and Campaign (running and successful) collections.
- `src/controllers/userController.ts` & `src/controllers/campaignController.ts`
  - Business logic for user authentication and campaign CRUD operations.
- `src/routes/userRoutes.ts` & `src/routes/campaignRoutes.ts`
  - Express routes for user and campaign endpoints.
- `src/middlewares/validateRequest.ts`, `src/middlewares/verifyUser.ts`, `src/middlewares/verifyAdmin.ts`
  - Request validation with Yup, JWT token verification, and role-based authorization.
- `src/validations/userValidations.ts` & `src/validations/campaignValidations.ts`
  - Yup schemas for input validation.
- `src/types/globalTypes.ts`
  - TypeScript interfaces for User, Campaign, and request extensions.

### Backend Project Structure

- `src/`
  - `index.ts` (main server file)
  - `config/`
    - `dbConfig.ts`
  - `controllers/`
    - `campaignController.ts`
    - `userController.ts`
  - `helpers/` (empty)
  - `middlewares/`
    - `validateRequest.ts`
    - `verifyAdmin.ts`
    - `verifyUser.ts`
  - `models/`
    - `campaignModel.ts`
    - `userModel.ts`
  - `routes/`
    - `campaignRoutes.ts`
    - `userRoutes.ts`
  - `types/`
    - `globalTypes.ts`
  - `validations/`
    - `campaignValidations.ts`
    - `userValidations.ts`

## API Endpoints

### User Routes (`/api/v1`)

- `POST /signup` - User registration
- `POST /signin` - User login
- `POST /oauth-signup` - OAuth user registration/login

### Campaign Routes (`/api/v1`)

- `GET /campaigns` - Get all campaigns (paginated, 8 per page)
- `GET /campaign/:id` - Get single campaign (query `type=success` for successful campaigns)
- `POST /campaign` - Create new campaign (admin only)
- `PUT /campaign/:id` - Update campaign (admin only)
- `DELETE /campaign/:id` - Delete campaign (not implemented)

> Note: Some features like donations, user donations, successful campaigns list, admin statistics, and make-admin are planned but not yet implemented in the backend.
