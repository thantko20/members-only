const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const isValidPassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);

  return isValid;
};

const genPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashPassword;
};

module.exports = {
  isValidPassword,
  genPassword,
};
