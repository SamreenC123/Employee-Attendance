import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-attendance');
    console.log('✅ Connected to MongoDB\n');

    console.log('🔄 Clearing existing users...');
    await User.deleteMany({ email: { $in: ['samreen@gmail.com', 'sam22@gmail.com'] } });
    console.log('✅ Old accounts cleared\n');

    console.log('📝 Creating new accounts...\n');

    const employee = new User({
      name: 'Samreen',
      email: 'samreen@gmail.com',
      password: '123456',
      role: 'employee',
      employeeId: 'EMP001',
      department: 'IT'
    });
    await employee.save();
    console.log('✅ Employee account created');
    console.log('   Email: samreen@gmail.com');
    console.log('   Password: 123456');
    console.log('   Role: Employee\n');

    const manager = new User({
      name: 'Sam Manager',
      email: 'sam22@gmail.com',
      password: '123456',
      role: 'manager',
      employeeId: 'MGR001',
      department: 'Management'
    });
    await manager.save();
    console.log('✅ Manager account created');
    console.log('   Email: sam22@gmail.com');
    console.log('   Password: 123456');
    console.log('   Role: Manager\n');

    console.log('🔍 Verifying accounts...\n');

    const verifyEmployee = await User.findOne({ email: 'samreen@gmail.com' });
    const verifyManager = await User.findOne({ email: 'sam22@gmail.com' });

    if (verifyEmployee) {
      const isMatch = await verifyEmployee.comparePassword('123456');
      console.log(`✅ Employee verification: ${isMatch ? 'Password correct' : 'Password INCORRECT'}`);
    }

    if (verifyManager) {
      const isMatch = await verifyManager.comparePassword('123456');
      console.log(`✅ Manager verification: ${isMatch ? 'Password correct' : 'Password INCORRECT'}`);
    }

    console.log('\n' + '='.repeat(50));
    console.log('📋 DEFAULT LOGIN CREDENTIALS');
    console.log('='.repeat(50));
    console.log('\n👤 EMPLOYEE ACCOUNT:');
    console.log('   Email:    samreen@gmail.com');
    console.log('   Password: 123456');
    console.log('   Role:     Employee\n');
    console.log('👔 MANAGER ACCOUNT:');
    console.log('   Email:    sam22@gmail.com');
    console.log('   Password: 123456');
    console.log('   Role:     Manager\n');
    console.log('='.repeat(50));
    console.log('✅ Seeding completed successfully!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    process.exit(1);
  }
};

seedUsers();

