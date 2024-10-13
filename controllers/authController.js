const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new student
exports.register = async (req, res) => {
  const { class: studentClass, section, rollNumber, password } = req.body;

  try {
    let user = await User.findOne({ rollNumber });
    if (user) return res.status(400).json({ msg: 'Student already exists' });

    user = new User({
      class: studentClass,
      section,
      rollNumber,
      password,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Login user
exports.login = async (req, res) => {
  const { rollNumber, password } = req.body;

  try {
    const user = await User.findOne({ rollNumber });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
