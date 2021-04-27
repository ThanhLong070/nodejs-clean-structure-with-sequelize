const authService = require('../services/auth');

exports.signup = async (req, res) => {
  const user = await authService.signup(req.body);

  return res.status(200).json({ success: true, user });
};
