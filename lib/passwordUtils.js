const bcrypt = require('bcrypt');

const isValidPassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);

  return isValid;
};

module.exports = {
  isValidPassword,
};
