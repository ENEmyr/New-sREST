const jwt         = require("jsonwebtoken"),
      path        = require("path"),
      fs          = require("fs"),
      PRIVATE_KEY = fs.readFileSync(
        path.resolve(__dirname, "../config/private.key")
      )

const authenicate = async (token) => {
  const decode = jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      console.error(`Authenicate : Verify token failed becase (${err}).`)
      return false;
    } else {
      console.info('Authenticate success.')
      return true
    }
  });
  return decode;
};

module.exports = { authenicate };
