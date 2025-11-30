import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const verifyCredentials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-attendance');
    console.log('✅ Connected to MongoDB\n');

    console.log('🔍 Checking credentials in database...\n');

    const employees = [
      { email: 'samreen@gmail.com', password: '123456' },
      { email: 'sam22@gmail.com', password: '123456' }
    ];

    for (const cred of employees) {
      console.log(`Checking: ${cred.email}`);
      const user = await User.findOne({ email: cred.email });
      
      if (!user) {
        console.log(`  ❌ NOT FOUND in database\n`);
        continue;
      }

      console.log(`  ✅ Found in database`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Employee ID: ${user.employeeId}`);
      
      try {
        const isMatch = await user.comparePassword(cred.password);
        console.log(`  Password '${cred.password}': ${isMatch ? '✅ CORRECT' : '❌ WRONG'}`);
      } catch (err) {
        console.log(`  ❌ Password comparison error: ${err.message}`);
      }
      console.log();
    }

    console.log('📋 All users in database:');
    const allUsers = await User.find().select('email role name employeeId -password');
    if (allUsers.length === 0) {
      console.log('  (No users found)');
    } else {
      allUsers.forEach(u => {
        console.log(`  - ${u.email} (${u.role}) - ${u.name}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

verifyCredentials();
