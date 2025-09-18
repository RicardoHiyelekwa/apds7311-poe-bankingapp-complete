require('dotenv').config();
const connectDB = require('./db');
const bcrypt = require('bcrypt');
const { User } = require('./models/User');

async function seed() {
  await connectDB();
  try {
    const empEmail = 'employee1@example.com';
    let e = await User.findOne({ email: empEmail });
    if (!e) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('Employee@1234', salt);

      e = new User({
        fullName: 'Employee One',
        email: empEmail,
        passwordHash: hash,   // 👈 agora consistente
        role: 'employee'
      });

      await e.save();
      console.log('✅ Employee created:', empEmail);
    } else {
      console.log('Employee already exists');
    }
    console.log('Seeding complete');
  } catch (e) {
    console.error('Seed error', e);
  }
  process.exit();
}

seed();
