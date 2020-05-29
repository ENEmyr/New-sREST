const model            = require('../models/RawNewsModel'),
      MongooseConnect  = require('./MongooseConnect'),
      validator        = require('validator')

const cRawNews = async (req, res) => {
    const connector  = new MongooseConnect(),
          connection = await connector.connect(),
          rawNews    = req.body

    if (!connection) return res.sendStatus(500)
    if (
      !(
        rawNews.title || rawNews.content ||
        rawNews.sourceUrl || rawNews.imageUrl ||
        rawNews.author || rawNews.publishAt
      )
    ) { return res.sendStatus(400) }
    else {
        delete rawNews.dt
        delete rawNews.name
        if (!validator.isRFC3339(rawNews.publishAt)) return res.sendStatus(400)
        try {
            await model.create(rawNews)
            return res.sendStatus(201)
        } catch (error) {
            console.error(`Error occur while trying insert rawNews : ${error.message}`)
            return res.sendStatus(500)
        } finally {
            connector.disconnect()
        }
    }
}

const rRawNews = async (req, res) => {
    const localOffset     = (new Date).getTimezoneOffset() * -60000,
          fromDt          = typeof req.query.from !== 'undefined' ? new Date(req.query.from) : new Date(localOffset),
          toDt            = typeof req.query.to !== 'undefined' ? new Date(req.query.to) : new Date(Date.now()+localOffset),
          summarizeStatus = typeof req.query.summarizeStatus !== 'undefined' ? req.query.summarizeStatus : false,
          limit           = parseInt(req.query.limit),
          connector       = new MongooseConnect(),
          connection      = await connector.connect()
    let result,
        findParams = {"publishAt": {"$gte": fromDt, "$lt": toDt}};
    if (!connection) return res.sendStatus(500)
    try {
        if (summarizeStatus) {
            if (typeof(summarizeStatus) === 'string'){
                if (summarizeStatus.toLowerCase() === 'true' || summarizeStatus.toLowerCase() === 'false'){
                    findParams['summarizeStatus'] = summarizeStatus.toLowerCase() === 'true' ? true : false
                }
            } else if (typeof(summarizeStatus) === 'boolean') {
                findParams['summarizeStatus'] = summarizeStatus
            }
        }
        if (typeof limit !== 'undefined' && isNaN(limit) !== true) {
            result = await model.find(findParams)
            .limit(limit)
            .sort({ insertDt: -1 })
        } else {
            result = await model.find(findParams)
            .sort({ insertDt: -1 })
        }
        return res.status(200).json(result)
    } catch (error) {
        console.error(`Error occurs while trying to find RawNews: ${error.message}`)
        return res.sendStatus(500)
    } finally {
        connector.disconnect()
    }
}

const uRawNews = async (req, res) => {
    const connector  = new MongooseConnect(),
          connection = await connector.connect(),
          rawNewsId  = req.params.id,
          rawNews    = req.body

    if (!connection) return res.sendStatus(500)
    delete rawNews.dt
    delete rawNews.name
    if (typeof rawNews.publishAt !== 'undefined' && !validator.isRFC3339(rawNews.publishAt)) return res.sendStatus(400)
    if (typeof rawNews.summarizeStatus !== 'undefined' && typeof rawNews.summarizeStatus === 'string' || 1===1) // bypass just for now
        rawNews.summarizeStatus = true //bypass just for now
        //rawNews.summarizeStatus = rawNews.summarizeStatus.toLowerCase() === 'true' ? true : false
    if (Object.entries(rawNews).length === 0 && rawNews.constructor === Object) return res.sendStatus(200)
    try {
        await model.updateOne({ _id: rawNewsId }, rawNews)
        return res.sendStatus(200)
    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed')){
            return res.sendStatus(400)
        }
        console.error(`Error occur while trying to update rawNews : ${error.message}`)
        return res.sendStatus(500)
    } finally {
        connector.disconnect()
    }
}

const dRawNews = async (req, res) => {
    const connector  = new MongooseConnect(),
          connection = await connector.connect(),
          rawNewsId  = req.params.id
    
    if (!connection) return res.sendStatus(500)
    try {
        await model.deleteOne({ _id: rawNewsId })
        return res.sendStatus(204)
    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed')){
            return res.sendStatus(400)
        }
        console.error(`Error occur while trying to delete rawNews : ${error.message}`)
        return res.sendStatus(500)
    } finally {
        connector.disconnect()
    }
}

module.exports = {
    cRawNews,
    rRawNews,
    uRawNews,
    dRawNews
}