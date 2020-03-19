const express    = require('express'),
      router     = express.Router(),
      controller = require('../controllers/SummarizedNewsController')


/**
 * @swagger
 *
 * definitions:
 *   SummarizedNews:
 *     type: object
 *     required:
 *       - title
 *       - content
 *       - sourceUrl
 *       - imageUrl
 *       - author
 *       - publishAt
 *     properties:
 *       title:
 *         type: string
 *         example: 'Some News title'
 *       content:
 *         type: string
 *         example: 'Some News content...'
 *       sourceUrl:
 *          type: string
 *          example: 'https://www.aichanserv.com' 
 *       imageUrl:
 *          type: string
 *          example: 'https://www.aichanserv.com/api/covers/default.jpg' 
 *       author:
 *          type: string
 *          example: 'ENEmy'
 *       publisher:
 *          type: string
 *          example: 'ABC Company'
 *       category:
 *          type: string
 *          example: 'crime'
 *       tags:
 *          type: array
 *          items:
 *              type: string
 *          example: ['stab', 'kill']
 *       language:
 *          type: array
 *          items:
 *              type: string
 *          example: ['th', 'en']
 *       publishAt:
 *          type: string
 *          format: date-time
 *          example: '2016-08-29T09:12:33.001Z'
 *   SummarizedNewsGet:
 *      type: array
 *      items:
 *          allOf:
 *              - $ref: '#/definitions/SummarizedNews'
 *              - required:
 *                  - insertDt
 *              - properties:
 *                  insertDt:
 *                      type: string
 *                      format: date-time
 *                      example: '2016-08-29T09:12:33.001Z'
 */

/**
 * @swagger
 * 
 * /summarizednews:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      description: Submit new summarized news
 *      summary: submit new summarized news
 *      produces:
 *          - application/json
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: summarizednews
 *            description: SummarizedNews object
 *            in: body
 *            required: true
 *            type: object
 *            schema:
 *              $ref: '#/definitions/SummarizedNews'
 *      responses:
 *          201:
 *              description: Raw News has been submitted on database
 *          401:
 *              description: Access token is missing or invalid
 */
router.post('/', controller.cSummarizedNews)

/**
 * @swagger
 * 
 * /summarizednews:
 *  get:
 *      description: List summarized news
 *      summary: list summarized news
 *      produces:
 *          - application/json
 *      tags:
 *          - Users
 *      parameters:
 *          - name: from
 *            description: List summarized news from <full-date>T<full-time>
 *            in: query
 *            required: true
 *            type: object
 *            schema:
 *              type: string
 *              format: date-time
 *              example: '2016-08-29T09:12:33.001Z'
 *          - name: to
 *            description: List summarized news to <full-date>T<full-time>
 *            in: query
 *            required: true
 *            type: object
 *            schema:
 *              type: string
 *              format: date-time
 *              example: '2016-08-29T09:12:33.001Z'
 *          - name: limit
 *            description: Summarized news limit
 *            in: query
 *            required: true
 *            type: object
 *            schema:
 *              type: integer
 *              format: int32
 *              minimum: 0
 *              example: 50
 *      responses:
 *          200:
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/SummarizedNewsGet'
 */
router.get('/', controller.rSummarizedNews)

/**
 * @swagger
 * 
 * /summarizednews:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      description: Update summarized news
 *      summary: update summarized news
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: id
 *            description: SummarizedNews id
 *            in: query
 *            required: true
 *            type: string
 *            example: '507f191e810c19729de860ea'
 *          - name: summarizednew
 *            description: SummarizedNews object
 *            in: body
 *            required: true
 *            type: object
 *            schema:
 *              $ref: '#/definitions/SummarizedNews'
 *      responses:
 *          201:
 *              description: Raw News has been updated
 *          401:
 *              description: Access token is missing or invalid
 */
router.post('/', controller.uSummarizedNews)

/**
 * @swagger
 * 
 * /summarizednews:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      description: Delete summarized news
 *      summary: delete summarized news
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: id
 *            description: SummarizedNews id
 *            in: query
 *            required: true
 *            type: string
 *            example: '507f191e810c19729de860ea'
 *      responses:
 *          201:
 *              description: Raw News has been deleted 
 *          401:
 *              description: Access token is missing or invalid
 */
router.post('/', controller.dSummarizedNews)

module.exports = router