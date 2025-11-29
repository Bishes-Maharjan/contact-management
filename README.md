# Contact Management

![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-Express-green)
![MongoDB](https://img.shields.io/badge/database-MongoDB-brightgreen)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

A full-stack web application built with **TypeScript**, **React (Vite)** for the frontend, and **Express.js** with **MongoDB** for the backend.

---

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [License](#license)

---

## Technologies

- **Frontend:** React, Vite, TypeScript
- **Backend:** Express.js, TypeScript, MongoDB, Mongoose
- **Authentication:** JWT

---

## Features

- CRUD operations with MongoDB
- JWT-based authentication
- RESTful API
- Responsive UI with React and Vite

---

## Project Structure

### Backend

```
backend/
├─ src/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ middlewares/
│  └─ app.ts
├─ package.json
└─ tsconfig.json
```

### Frontend

```
frontend/
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ hooks/
│  ├─ services/
│  └─ main.tsx
├─ package.json
└─ tsconfig.json
```

---

## Environment Variables

### Backend (`.env`)

```env
PORT=3000
MONGO_URI="mongodb://localhost:27017/contactdb"
JWT_SECRET="uihfuihfugebrhjdbvcuy4r7873y490eyq374ytre9q82i3ulwefbqoewfvsERF{Q#oiwerf98gq2k3wrdiub,aeuykgrfd}"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (`.env`)

```env
VITE_API_URL="http://localhost:3000/api"
```

---

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Running the Project

### MongoDB

Ensure MongoDB is running locally and update the `MONGO_URI` in the `.env` file or use MongoDB Atlas.

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

The frontend will run at `http://localhost:5173` and communicate with the backend API at `http://localhost:3000/api`.

