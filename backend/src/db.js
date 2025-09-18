const mongoose = require('mongoose');
async function connectDB(){
  try {
    const uri = process.env.DB_CONNECTION;
    if(!uri) throw new Error('DB_CONNECTION not set');
    await mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true });
    console.log('✅ MongoDB connected to', uri);
  } catch(err){
    console.error('❌ MongoDB connection error', err.message || err);
    process.exit(1);
  }
}
module.exports = connectDB;
