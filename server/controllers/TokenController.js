const jwt             = require('jsonwebtoken'),
      { authenicate } = require('./Authenication'),
      fs              = require('fs'),
      path            = require('path'),
      PRIVATE_KEY     = fs.readFileSync(path.resolve(__dirname, '../config/private.key')),
      validator       = require('validator')

const verifyToken = async (req, res) => {
    const token       = await authenicate(req.token),
          accessToken = await authenicate(req.body.accessToken)
    let   result      = accessToken ? 'Valid token' : 'Invalid token'

    if (!token) return res.sendStatus(401)
    return res.status(200).json({
        result: result
    })
}

const genToken = async (req, res) => {
    const token     = await authenicate(req.token)
    let   signToken = '',
          payload   = req.body.payload
    if (!token) return res.sendStatus(401)
    try { payload = JSON.parse(payload) } 
    catch (error) { return res.sendStatus(400) }
    if (typeof payload !== 'undefined') {
        if (!(payload.name || payload.dt)) return res.sendStatus(400)
        else {
            if (!validator.isRFC3339(payload.dt)) return res.sendStatus(400)
            signToken = jwt.sign(payload, PRIVATE_KEY, {}) // Permanent access token
        }
    } else return res.sendStatus(400)

    return res.status(200).json({
        token: signToken
    })
}

module.exports = {
    verifyToken,
    genToken
}