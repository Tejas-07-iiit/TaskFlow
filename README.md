# Task Manager Application

A modern, full-stack task management application designed for productivity. This application allows users to create, manage, and track tasks with role-based access control, ensuring a secure and organized workflow.

## 🚀 Features

- **User Authentication**: Secure register and login system using JWT and bcrypt password hashing.
- **Role-Based Access Control (RBAC)**:
  - **User**: Manage personal tasks (Create, Read, Update, Delete).
  - **Admin**: Oversight over all system users and their respective tasks via a dedicated dashboard.
- **Task Management**: Full CRUD operations for tasks with title and description.
- **State Management**: Robust frontend state handling using Redux Toolkit.
- **Protected Routes**: Secure navigation ensuring only authorized users access specific sections.
- **Responsive UI**: Sleek, modern design that works across various devices.
- **Automated Testing**: Integrated unit and integration tests for both client and server components.

## 🛠️ Tech Stack

### Frontend
- **React**: Library for building user interfaces.
- **Redux Toolkit**: Efficient global state management.
- **Axios**: Promised-based HTTP client for API communication.
- **React Router**: Declarative routing for React applications.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated web framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: Elegant mongodb object modeling for node.js.
- **JWT**: JSON Web Token for secure authentication.
- **bcrypt**: Library for hashing and securing passwords.

### Testing
- **Jest**: JavaScript testing framework.
- **React Testing Library**: Purpose-built utilities for testing React components.

## 📋 API Endpoints

### Authentication
- `POST /api/register` - Create a new user account.
- `POST /api/login` - Authenticate user and receive token.

### Tasks
- `GET /api/tasks` - Fetch all tasks for the logged-in user.
- `POST /api/tasks` - Create a new task.
- `PUT /api/tasks/:id` - Update an existing task.
- `DELETE /api/tasks/:id` - Remove a task.

### Admin
- `GET /api/admin/users-tasks` - Fetch all users and their tasks (Admin only).

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB instance running (locally or Atlas)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd taskflow
```

### 2. Server Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
API_BASE_URL=http://localhost:5000
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password
```

### 3. Client Setup
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Start Backend
```bash
cd server
npm run dev
```

### Start Frontend
```bash
cd client
npm start
```

## 🧪 Running Tests

### Server Tests
```bash
cd server
npm test
```

### Client Tests
```bash
cd client
npm test
```

## 📁 Folder Structure

```text
taskflow/
├── client/              # React frontend
│   ├── public/          # Static assets
│   └── src/             # Source files
│       ├── __tests__/   # Frontend test cases
│       ├── components/  # React components
│       ├── redux/       # Redux slices and store
│       └── utils/       # Utility functions
├── server/              # Node.js/Express backend
│   ├── __tests__/       # Backend API tests
│   ├── config/          # Database configuration
│   ├── controller/      # API logic controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose models
│   └── routes/          # Express routes
└── README.md            # Project documentation
```

## 📸 Screenshots
*(Add screenshots of your application here)*

---
Developed with ❤️ by Tejas Ambaliya
