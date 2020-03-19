const model           = require('../models/SummarizedNewsModel'),
      MongooseConnect = require('./MongooseConnect')

const cSummarizedNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

const rSummarizedNews = async (req, res) => {
    const from       = new Date(req.query.from),
          to         = new Date(req.query.to),
          limit      = req.query.limit,
          connector  = new MongooseConnect(),
          connection = await connector.connect()
    let result;
    if (connection) {
        result = await model.find({})
        connector.disconnect()
    } else {
        return res.sendStatus(500)
    }
    return res.status(200).json({
        result: result
    })
}

const uSummarizedNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

const dSummarizedNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

module.exports = {
    cSummarizedNews,
    rSummarizedNews,
    uSummarizedNews,
    dSummarizedNews
}