import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Attendance from './models/Attendance.js';
import User from './models/User.js';

dotenv.config();

const testPerformance = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-attendance');
    console.log('✅ Connected to MongoDB\n');

    console.log('📊 Performance Test Starting...\n');

    // Test 1: User query by email
    console.log('Test 1: Find user by email');
    let start = Date.now();
    const user = await User.findOne({ email: 'samreen@gmail.com' }).lean();
    let duration = Date.now() - start;
    console.log(`   Time: ${duration}ms`);
    console.log(`   Result: Found ${user ? user.name : 'none'}\n`);

    // Test 2: Count employees
    console.log('Test 2: Count employees');
    start = Date.now();
    const count = await User.countDocuments({ role: 'employee' }).lean();
    duration = Date.now() - start;
    console.log(`   Time: ${duration}ms`);
    console.log(`   Result: ${count} employees\n`);

    // Test 3: Attendance for today
    console.log('Test 3: Attendance for today');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    start = Date.now();
    const todayAttendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow }
    }).lean();
    duration = Date.now() - start;
    console.log(`   Time: ${duration}ms`);
    console.log(`   Result: ${todayAttendance.length} records\n`);

    // Test 4: Monthly attendance summary
    console.log('Test 4: Monthly attendance aggregation');
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    start = Date.now();
    const monthlySummary = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    duration = Date.now() - start;
    console.log(`   Time: ${duration}ms`);
    console.log(`   Result:`, monthlySummary.map(s => `${s._id}: ${s.count}`).join(', '), '\n');

    // Test 5: Check indexes
    console.log('Test 5: Checking database indexes');
    const userIndexes = await User.collection.getIndexes();
    const attendanceIndexes = await Attendance.collection.getIndexes();
    
    console.log(`   User indexes: ${Object.keys(userIndexes).length}`);
    Object.keys(userIndexes).forEach(idx => {
      console.log(`     - ${idx}`);
    });
    
    console.log(`\n   Attendance indexes: ${Object.keys(attendanceIndexes).length}`);
    Object.keys(attendanceIndexes).forEach(idx => {
      console.log(`     - ${idx}`);
    });

    console.log('\n✅ Performance test completed!');
    console.log('\n📈 Expected times:');
    console.log('   - User query: < 50ms');
    console.log('   - Count query: < 100ms');
    console.log('   - Attendance query: < 200ms');
    console.log('   - Aggregation: < 500ms');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testPerformance();
