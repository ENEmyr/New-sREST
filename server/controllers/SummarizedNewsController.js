const model            = require('../models/SummarizedNewsModel'),
      MongooseConnect  = require('./MongooseConnect'),
      validator        = require('validator')

const cSummarizedNews = async (req, res) => {
    const connector      = new MongooseConnect(),
          connection     = await connector.connect(),
          summarizedNews = req.body

    if (!connection) return res.sendStatus(500)
    if (
      !(
        summarizedNews.title || summarizedNews.content ||
        summarizedNews.sourceUrl || summarizedNews.imageUrl ||
        summarizedNews.author || summarizedNews.publishAt
      )
    ) { return res.sendStatus(400) }
    else {
        delete summarizedNews.dt
        delete summarizedNews.name
        if (!validator.isRFC3339(summarizedNews.publishAt)) return res.sendStatus(400)
        try {
            await model.create(summarizedNews)
            return res.sendStatus(201)
        } catch (error) {
            console.error(`Error occur while trying insert summarizedNews : ${error.message}`)
            return res.sendStatus(500)
        } finally {
            connector.disconnect()
        }
    }
}

const rSummarizedNews = async (req, res) => {
    const fromDt     = typeof req.query.from !== 'undefined' ? new Date(req.query.from) : new Date('1970-1-1'),
          toDt       = typeof req.query.to !== 'undefined' ? new Date(req.query.to) : new Date(),
          limit      = parseInt(req.query.limit),
          connector  = new MongooseConnect(),
          connection = await connector.connect()
    let result;
    if (!connection) return res.sendStatus(500)
    try {
        if (typeof limit !== 'undefined' && isNaN(limit) !== true) {
            result = await model.find({
                "publishAt": {"$gte": fromDt, "$lt": toDt}
            })
            .limit(limit)
            .sort({ insertDt: -1 })
        } else {
            result = await model.find({
                "publishAt": {"$gte": fromDt, "$lt": toDt}
            })
            .sort({ insertDt: -1 })
        }
        return res.status(200).json(result)
    } catch (error) {
        console.error(`Error occurs while trying to find SummarizedNews: ${error.message}`)
        return res.sendStatus(500)
    } finally {
        connector.disconnect()
    }
}

const uSummarizedNews = async (req, res) => {
    const connector        = new MongooseConnect(),
          connection       = await connector.connect(),
          summarizedNewsId = req.params.id,
          summarizedNews   = req.body

    if (!connection) return res.sendStatus(500)
    delete summarizedNews.dt
    delete summarizedNews.name
    if (typeof summarizedNews.publishAt !== 'undefined' && !validator.isRFC3339(summarizedNews.publishAt)) return res.sendStatus(400)
    if (Object.entries(summarizedNews).length === 0 && summarizedNews.constructor === Object) return res.sendStatus(200)
    try {
        await model.updateOne({ _id: summarizedNewsId }, summarizedNews)
        return res.sendStatus(200)
    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed')){
            return res.sendStatus(400)
        }
        console.error(`Error occur while trying to update summarizedNews : ${error.message}`)
        return res.sendStatus(500)
    } finally {
        connector.disconnect()
    }
}

const dSummarizedNews = async (req, res) => {
    const connector        = new MongooseConnect(),
          connection       = await connector.connect(),
          summarizedNewsId = req.params.id
    
    if (!connection) return res.sendStatus(500)
    try {
        await model.deleteOne({ _id: summarizedNewsId })
        return res.sendStatus(204)
    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed')){
            return res.sendStatus(400)
        }
        console.error(`Error occur while trying to delete summarizedNews : ${error.message}`)
        return res.sendStatus(500)
    } finally {
        connector.disconnect()
    }
}

module.exports = {
    cSummarizedNews,
    rSummarizedNews,
    uSummarizedNews,
    dSummarizedNews
}