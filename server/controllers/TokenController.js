const jwt = require('jsonwebtoken')

const verifyToken = async (req, res) => {
    res.status(200).json({
        result: 'invalid token'
    })
}

const genToken = async (req, res) => {
    res.status(200).json({
        token: 'TOKEN_HERE'
    })
}

module.exports = {
    verifyToken,
    genToken
}