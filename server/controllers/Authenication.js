const dbc         = require("../controllers/MongooseConnect");
const model       = require("../models/UserModel");
const jwt         = require("jsonwebtoken");
const path        = require("path");
const fs          = require("fs");
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "../config/private.key")
);

const authenicate = async (token) => {
  const decode = jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      console.error(`Authenicate : Verify token failed becase (${err}).`)
      return false;
    } else {
      if (dbc.connect()) {
        if (
          model.findOne(
            { uid: decoded.uid, username: decoded.username },
            (err, result) => {
              if (err) {
                console.error(`Database : findOne failed because (${err}).`)
                return false;
              } else {
                if (result) {
                  console.info(`Authenicate : Uid[${decoded.uid}] accept access.`)
                  return true;
                } else {
                  console.info(`Authenicate : Malicious attempt to loggen in is detected.`)
                  return false;
                }
              }
            }
          )
        )
          return decoded;
      } else {
        console.error("Connection : Can't make a connection ( authenicate ).");
        return false;
      }
    }
  });
  return decode;
};

module.exports = { authenicate };
