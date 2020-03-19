const model = require('../models/SummarizedNewsModel')

const cSummarizedNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

const rSummarizedNews = async (req, res) => {
    const from  = new Date(req.query.from),
          to    = new Date(req.query.to),
          limit = req.query.limit
    res.status(200).json({
        from: from,
        to: to,
        limit: limit
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