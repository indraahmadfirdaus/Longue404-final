const mongoose = require('mongoose');
const { hashPassword } = require('../helper/hash');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
  updated_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

// middleware yang akan berjalan sebelum menyimpan atau update user
userSchema.pre('save', function (next) {
  this.avatar = `https://avatars.dicebear.com/api/miniavs/${this.username}.svg`;

  // assign hashed password ke payload password
  this.password = hashPassword(this.password);

  next();
});

module.exports = mongoose.model('User', userSchema);
