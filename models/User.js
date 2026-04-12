const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    avatar: {
      type: String,
      default: 'https://i.ibb.co/vzmsf8v/naruto-avatar-default.png', // Default Naruto-style avatar
    },
    bio: {
      type: String,
      default: 'Architect of digital realms and curator of technical narratives. Specializing in brutalist design systems and high-fidelity interface logic.',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
