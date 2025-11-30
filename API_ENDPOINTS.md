# API Endpoints Documentation

All endpoints are prefixed with `/api`

## Authentication Endpoints

### POST /api/auth/register
Register a new employee account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "employeeId": "EMP001",
  "department": "IT"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee",
    "employeeId": "EMP001",
    "department": "IT"
  }
}
```

### POST /api/auth/login
Login (Employee or Manager).

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": { ... }
}
```

### GET /api/auth/me
Get current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user": { ... }
}
```

## Attendance Endpoints

### POST /api/attendance/checkin
Check in for today (Employee only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Checked in successfully",
  "attendance": {
    "id": "attendance-id",
    "checkInTime": "2024-01-15T09:00:00.000Z",
    "status": "present"
  }
}
```

### POST /api/attendance/checkout
Check out for today (Employee only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Checked out successfully",
  "attendance": {
    "id": "attendance-id",
    "checkInTime": "2024-01-15T09:00:00.000Z",
    "checkOutTime": "2024-01-15T17:00:00.000Z",
    "totalHours": 8,
    "status": "present"
  }
}
```

### GET /api/attendance/my-history
Get personal attendance history (Employee only).

**Query Parameters:**
- `month` (optional): Month number (1-12)
- `year` (optional): Year

**Response:**
```json
{
  "attendance": [
    {
      "_id": "id",
      "date": "2024-01-15T00:00:00.000Z",
      "checkInTime": "2024-01-15T09:00:00.000Z",
      "checkOutTime": "2024-01-15T17:00:00.000Z",
      "status": "present",
      "totalHours": 8
    }
  ]
}
```

### GET /api/attendance/my-summary
Get monthly summary (Employee only).

**Query Parameters:**
- `month` (optional): Month number (1-12)
- `year` (optional): Year

**Response:**
```json
{
  "present": 20,
  "absent": 5,
  "late": 2,
  "halfDay": 1,
  "totalHours": 160,
  "totalDays": 25
}
```

### GET /api/attendance/today
Get today's attendance status (Employee only).

**Response:**
```json
{
  "attendance": {
    "checkInTime": "2024-01-15T09:00:00.000Z",
    "status": "present"
  },
  "canCheckIn": false,
  "canCheckOut": true
}
```

### GET /api/attendance/all
Get all employees' attendance (Manager only).

**Query Parameters:**
- `employeeId` (optional): Filter by employee ID
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)
- `status` (optional): Filter by status (present/absent/late/half-day)

**Response:**
```json
{
  "attendance": [
    {
      "_id": "id",
      "userId": {
        "name": "John Doe",
        "employeeId": "EMP001",
        "department": "IT"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "checkInTime": "2024-01-15T09:00:00.000Z",
      "checkOutTime": "2024-01-15T17:00:00.000Z",
      "status": "present",
      "totalHours": 8
    }
  ]
}
```

### GET /api/attendance/employee/:id
Get attendance for specific employee (Manager only).

**URL Parameters:**
- `id`: Employee ID (e.g., EMP001)

**Query Parameters:**
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Response:**
```json
{
  "attendance": [...],
  "employee": {
    "name": "John Doe",
    "employeeId": "EMP001",
    "department": "IT"
  }
}
```

### GET /api/attendance/summary
Get attendance summary (Manager only).

**Query Parameters:**
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Response:**
```json
{
  "present": 150,
  "absent": 20,
  "late": 10,
  "halfDay": 5,
  "totalHours": 1200,
  "totalRecords": 185
}
```

### GET /api/attendance/today-status
Get today's attendance status for all employees (Manager only).

**Response:**
```json
{
  "totalEmployees": 50,
  "present": 45,
  "absent": 5,
  "late": 3,
  "checkedIn": 45,
  "checkedOut": 40,
  "attendance": [...]
}
```

### GET /api/attendance/export
Export attendance data as CSV (Manager only).

**Query Parameters:**
- `employeeId` (optional): Filter by employee ID
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Response:** CSV file download

## Dashboard Endpoints

### GET /api/dashboard/employee
Get employee dashboard data (Employee only).

**Response:**
```json
{
  "todayStatus": {
    "attendance": {...},
    "canCheckIn": true,
    "canCheckOut": false
  },
  "monthSummary": {
    "present": 20,
    "absent": 5,
    "late": 2,
    "totalHours": 160
  },
  "recentAttendance": [
    {
      "date": "2024-01-15T00:00:00.000Z",
      "checkInTime": "2024-01-15T09:00:00.000Z",
      "checkOutTime": "2024-01-15T17:00:00.000Z",
      "status": "present",
      "totalHours": 8
    }
  ]
}
```

### GET /api/dashboard/manager
Get manager dashboard data (Manager only).

**Response:**
```json
{
  "totalEmployees": 50,
  "todayAttendance": {
    "present": 45,
    "absent": 5,
    "late": 3,
    "total": 45
  },
  "weeklyTrend": [
    {
      "date": "2024-01-15",
      "day": "Mon",
      "present": 45,
      "absent": 5,
      "late": 3
    }
  ],
  "departmentWise": [
    {
      "department": "IT",
      "total": 20,
      "present": 18,
      "absent": 2,
      "late": 1
    }
  ],
  "absentEmployees": [
    {
      "name": "John Doe",
      "employeeId": "EMP001",
      "department": "IT",
      "email": "john@example.com"
    }
  ]
}
```

## User Endpoints

### GET /api/users/employees
Get all employees (Manager only).

**Response:**
```json
{
  "employees": [
    {
      "_id": "id",
      "name": "John Doe",
      "email": "john@example.com",
      "employeeId": "EMP001",
      "department": "IT",
      "role": "employee"
    }
  ]
}
```

### GET /api/users/profile
Get user profile (requires auth).

**Response:**
```json
{
  "user": {
    "_id": "id",
    "name": "John Doe",
    "email": "john@example.com",
    "employeeId": "EMP001",
    "department": "IT",
    "role": "employee"
  }
}
```

### PUT /api/users/profile
Update user profile (requires auth).

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "department": "HR"
}
```

**Response:**
```json
{
  "user": {
    "id": "id",
    "name": "John Doe Updated",
    "email": "john@example.com",
    "employeeId": "EMP001",
    "department": "HR",
    "role": "employee"
  }
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "message": "Error message"
}
```

**Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

