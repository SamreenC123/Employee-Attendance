# Fix Login Issues - Complete Guide

## Problem
- Login showing "failed to login"
- Credentials not working: samreen@gmail.com / 123456 or sam22@gmail.com / 123456

## Root Causes
1. ❌ Users might not be properly seeded in database
2. ❌ Password hashing might have failed
3. ❌ Old corrupted user data exists

## Solution - 3 Simple Steps

### Step 1: Re-seed Database (CRITICAL)

```bash
cd backend
node seed.js
```

**You MUST see:**
```
✅ Connected to MongoDB

🔄 Clearing existing users...
✅ Old accounts cleared

📝 Creating new accounts...

✅ Employee account created
   Email: samreen@gmail.com
   Password: 123456
   Role: Employee

✅ Manager account created
   Email: sam22@gmail.com
   Password: 123456
   Role: Manager

🔍 Verifying accounts...

✅ Employee verification: Password correct
✅ Manager verification: Password correct

==================================================
📋 DEFAULT LOGIN CREDENTIALS
==================================================

👤 EMPLOYEE ACCOUNT:
   Email:    samreen@gmail.com
   Password: 123456
   Role:     Employee

👔 MANAGER ACCOUNT:
   Email:    sam22@gmail.com
   Password: 123456
   Role:     Manager

==================================================
✅ Seeding completed successfully!
```

**If you see password errors, something is wrong. Continue to Step 2.**

### Step 2: Verify Credentials in Database

```bash
cd backend
node verify-credentials.js
```

**Expected output:**
```
✅ Connected to MongoDB

🔍 Checking credentials in database...

Checking: samreen@gmail.com
  ✅ Found in database
  Name: Samreen
  Role: employee
  Employee ID: EMP001
  Password '123456': ✅ CORRECT

Checking: sam22@gmail.com
  ✅ Found in database
  Name: Sam Manager
  Role: manager
  Employee ID: MGR001
  Password '123456': ✅ CORRECT
```

**If passwords show ❌ WRONG or ❌ NOT FOUND:**
- Delete MongoDB data and re-seed:
  ```bash
  # In MongoDB
  mongosh
  use employee-attendance
  db.users.deleteMany({})
  exit
  
  # Then re-run seed
  node seed.js
  ```

### Step 3: Restart Backend and Test

```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend (new terminal)
cd frontend
npm start
```

**Then test login with:**
- Email: `samreen@gmail.com`
- Password: `123456`

## Default Credentials (Copy & Paste)

### Employee Login
```
Email:    samreen@gmail.com
Password: 123456
```

### Manager Login
```
Email:    sam22@gmail.com
Password: 123456
```

## Troubleshooting

### Issue: Seed script shows "Password INCORRECT"

**Solution:**
```bash
# Delete and recreate
mongosh
use employee-attendance
db.users.deleteMany({})
exit

node seed.js
```

Then verify:
```bash
node verify-credentials.js
```

### Issue: User not found in database

**Solution:**
```bash
# Check if MongoDB is running
mongosh
use employee-attendance
db.users.find()

# If empty, run seed
node seed.js
```

### Issue: Still can't login after seeding

**Solution:**
1. Clear browser localStorage:
   - DevTools (F12) → Application → Local Storage → Clear All
   - Refresh page

2. Check backend console for errors:
   - Look for 🔐 Login attempt message
   - Look for ❌ errors

3. Restart everything:
   ```bash
   # Kill all processes and restart
   npm start  # backend
   npm start  # frontend (in separate terminal)
   ```

## Verify Login Works

1. Open browser: http://localhost:3000
2. You should see login page
3. Enter email: `samreen@gmail.com`
4. Enter password: `123456`
5. Click Login
6. Should redirect to dashboard in 1-2 seconds

**If it shows error:**
- Check backend terminal for 🔐 messages
- Run `node verify-credentials.js`
- Look for ❌ errors in browser console (F12)

## What Changed

### Files Updated
- `backend/seed.js` - Better seeding with verification
- `backend/verify-credentials.js` - New credential checker tool
- `backend/routes/auth.js` - Better error logging

### New Features
✅ Automatically clears old accounts before seeding
✅ Verifies passwords after creating accounts
✅ Better error messages in console
✅ Can verify credentials anytime with `verify-credentials.js`

## Permanent Solution

Once verified:
1. ✅ Seed successful with password verification
2. ✅ Login works
3. ✅ Navigation works
4. ✅ Dashboard loads quickly

**That's it! Your credentials are now set and working! 🎉**

## Quick Reference

| Command | Purpose |
|---------|---------|
| `node seed.js` | Setup default credentials |
| `node verify-credentials.js` | Check if credentials work |
| `npm start` | Start backend |
| `npm start` | Start frontend |

## Common User Typos

❌ WRONG: `sam22@gamil.co`
✅ CORRECT: `sam22@gmail.com`

❌ WRONG: `samreen@gmail.cpm`
✅ CORRECT: `samreen@gmail.com`

Make sure you type the email **exactly as shown**.

---

**After following these steps, login should work perfectly! 🚀**
