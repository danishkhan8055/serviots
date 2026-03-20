# MERN Todo App with Authentication

This repository contains a full-stack MERN sample app with authentication and task management.

- Backend: Node.js + Express + MongoDB
- Frontend: React + Vite + Redux Toolkit Query

## Features implemented

- User registration with hashed password
- User login with JWT token
- Protected task APIs (create, list, update, delete)
- Task ownership check by user id
- Frontend pages: Register, Login, Task list + CRUD, Logout
- Token saved in `sessionStorage`

## Backend API routes

- `POST /auth/register` - register user (multipart/form-data with profile image)
- `POST /auth/login` - login user, returns bearer token
- `POST /tasks` - create task (authenticated)
- `GET /tasks` - get tasks of logged-in user
- `PUT /tasks/:id` - update task (authenticated owner)
- `DELETE /tasks/:id` - delete task (authenticated owner)

## Backend setup

1. Go to `backend` folder:
   - `cd backend`
2. Install packages:
   - `npm install`
3. Copy environment file:
   - `cp .env.example .env` (Windows: `copy .env.example .env`)
4. Update `.env` values
5. Start server:
   - `npm run dev`

## Frontend setup

1. Go to `frontend` folder:
   - `cd frontend`
2. Install packages:
   - `npm install`
3. Copy environment file:
   - `cp .env.example .env` (Windows: `copy .env.example .env`)
4. Ensure `.env` has correct backend base URL:
   - `VITE_BASE_URL=http://localhost:5000/auth`
5. Start app:
   - `npm run dev`

## Notes

- The backend script was adjusted to run `index.js` (internally it loads server config).
- JWT errors return `401` and no security leak.
- Task operations require valid JWT and are scoped to authenticated user.