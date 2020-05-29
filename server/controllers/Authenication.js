const jwt         = require("jsonwebtoken"),
      path        = require("path"),
      fs          = require("fs"),
      PRIVATE_KEY = fs.readFileSync(
        path.resolve(__dirname, "../config/private.key")
      )

const authenticate = async (token) => {
  const decode = jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      console.error(`Authenicate : Verify token failed becase (${err}).`)
      return false;
    } else {
      //console.info('Authenticate success.')
      return true
    }
  });
  return decode;
};

const authMiddernware = async (req, res, next) => {
  const token = await authenticate(req.token)
  if (token) return next()
  else return res.sendStatus(401)
}

module.exports = { authenticate, authMiddernware };
