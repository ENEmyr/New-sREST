const model = require('../models/RawNewModel')

const cRawNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

const rRawNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

const uRawNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

const dRawNews = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

module.exports = {
    cRawNews,
    rRawNews,
    uRawNews,
    dRawNews
}