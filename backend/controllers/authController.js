const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (await User.findOne({ email })) return res.status(400).json("User exists");

  const hash = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hash, role });

  res.json("Registered");
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.role !== role) return res.status(400).json("Login error");

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});


  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });
};
