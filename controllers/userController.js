const User = require('../models/User');

// Update user profile (avatar and bio)
const updateProfile = async (req, res) => {
  const { avatar, bio } = req.body;

  const updateFields = {};
  if (avatar) updateFields.avatar = avatar;
  if (bio !== undefined) updateFields.bio = bio;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateFields },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.json(user);
};

module.exports = {
  updateProfile,
};
