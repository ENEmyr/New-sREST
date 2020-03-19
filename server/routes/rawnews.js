const express    = require('express'),
      router     = express.Router(),
      controller = require('../controllers/RawNewsController')


/**
 * @swagger
 *
 * definitions:
 *   RawNews:
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
 *   RawNewsGet:
 *      type: array
 *      items:
 *          allOf:
 *              - $ref: '#/definitions/RawNews'
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
 * /rawnews:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      description: Submit new raw news
 *      summary: submit new raw news
 *      produces:
 *          - application/json
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: rawnews
 *            description: RawNews object
 *            in: body
 *            required: true
 *            type: object
 *            schema:
 *              $ref: '#/definitions/RawNews'
 *      responses:
 *          201:
 *              description: Raw News has been submitted on database
 *          401:
 *              description: Access token is missing or invalid
 */
router.post('/', controller.cRawNews)

/**
 * @swagger
 * 
 * /rawnews:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      description: List raw news
 *      summary: list raw news
 *      produces:
 *          - application/json
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: from
 *            description: List raw news from <full-date>T<full-time>
 *            in: query
 *            required: true
 *            type: object
 *            schema:
 *              type: string
 *              format: date-time
 *              example: '2016-08-29T09:12:33.001Z'
 *          - name: to
 *            description: List raw news to <full-date>T<full-time>
 *            in: query
 *            required: true
 *            type: object
 *            schema:
 *              type: string
 *              format: date-time
 *              example: '2016-08-29T09:12:33.001Z'
 *          - name: limit
 *            description: Raw news limit
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
 *                          $ref: '#/definitions/RawNewsGet'
 *          401:
 *              description: Access token is missing or invalid
 */
router.get('/', controller.rRawNews)

/**
 * @swagger
 * 
 * /rawnews:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      description: Update raw news
 *      summary: update raw news
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: id
 *            description: RawNews id
 *            in: query
 *            required: true
 *            type: string
 *            example: '507f191e810c19729de860ea'
 *          - name: rawnew
 *            description: RawNews object
 *            in: body
 *            required: true
 *            type: object
 *            schema:
 *              $ref: '#/definitions/RawNews'
 *      responses:
 *          201:
 *              description: Raw News has been updated
 *          401:
 *              description: Access token is missing or invalid
 */
router.post('/', controller.uRawNews)

/**
 * @swagger
 * 
 * /rawnews:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      description: Delete raw news
 *      summary: delete raw news
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: id
 *            description: RawNews id
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
router.post('/', controller.dRawNews)

module.exports = router