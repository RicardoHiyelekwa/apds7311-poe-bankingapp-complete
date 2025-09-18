const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer','employee'], required: true }
});

// Método para verificar password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Método estático para criar utilizador já com hash
userSchema.statics.createUser = async function ({ fullName, email, password, role }) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const u = new this({ fullName, email, passwordHash: hash, role });
  return await u.save();
};

const User = mongoose.model('User', userSchema);

async function findByEmail(email) {
  return await User.findOne({ email });
}

module.exports = { User, findByEmail };
