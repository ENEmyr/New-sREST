const model = require('../models/SummarizedNewsModel')

const cSummarizedNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

const rSummarizedNews = async (req, res) => {
    res.status(200).json({
        success: true
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