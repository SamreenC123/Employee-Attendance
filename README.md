# Backend API Documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-attendance
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

3. Start server:
```bash
npm run dev
```

## API Endpoints

All endpoints are prefixed with `/api`

### Authentication
- `POST /auth/register` - Register new employee
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user (requires auth)

### Attendance
- `POST /attendance/checkin` - Check in (Employee only)
- `POST /attendance/checkout` - Check out (Employee only)
- `GET /attendance/today` - Get today's attendance (Employee only)
- `GET /attendance/my-history` - Get personal history (Employee only)
- `GET /attendance/my-summary` - Get monthly summary (Employee only)
- `GET /attendance/all` - Get all attendance (Manager only)
- `GET /attendance/team-summary` - Get team summary (Manager only)
- `GET /attendance/export` - Export CSV (Manager only)

### Users
- `GET /users/employees` - Get all employees (Manager only)
- `GET /users/profile` - Get profile (requires auth)
- `PUT /users/profile` - Update profile (requires auth)

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

