const express             = require('express'),
      router              = express.Router(),
      controller          = require('../controllers/RawNewsController'),
      { authMiddernware } = require('../controllers/Authenication')


/**
 * @swagger
 *
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *     RawNews:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - sourceUrl
 *         - imageUrl
 *         - author
 *         - publishAt
 *       properties:
 *         title:
 *           type: string
 *           description: News title
 *           example: 'Some News title'
 *         content:
 *           type: string
 *           description: News content
 *           example: 'Some News content...'
 *         sourceUrl:
 *            type: string
 *            description: News source url
 *            example: 'https://www.aichanserv.com' 
 *         imageUrl:
 *            type: string
 *            description: News cover image url
 *            example: 'https://www.aichanserv.com/api/covers/default.jpg' 
 *         author:
 *            type: string
 *            description: Author name or publisher name
 *            example: 'ENEmy'
 *         publisher:
 *            type: string
 *            description: Publisher name
 *            example: 'ABC Company'
 *         category:
 *            type: string
 *            description: Category of the News
 *            example: 'crime'
 *         tags:
 *            type: array
 *            description: News tags
 *            items:
 *                type: string
 *            example: ['stab', 'kill']
 *         language:
 *            type: array
 *            description: The language that used in News content
 *            items:
 *                type: string
 *            example: ['th', 'en']
 *         publishAt:
 *            type: string
 *            description: Publish date time
 *            format: date-time
 *            example: '2016-08-29T09:12:33.001Z'
 *     RawNewsGet:
 *        type: array
 *        description: RawNews Object
 *        items:
 *            allOf:
 *                - $ref: '#/components/schemas/RawNews'
 *                - required:
 *                    - insertDt
 *                    - _id
 *                    - __v
 *                - properties:
 *                    insertDt:
 *                        type: string
 *                        description: Insert date time
 *                        format: date-time
 *                        example: '2016-08-29T09:12:33.001Z'
 *                    _id:
 *                        type: string
 *                        description: News ID
 *                        example: '5e76c826c7d33c4f902fbb61'
 *                    __v:
 *                        type: number
 *                        example: 0
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
 *      tags:
 *          - Developers
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RawNews'
 *      responses:
 *          201:
 *              description: Raw News has been submitted on database
 *          401:
 *              description: Access token is missing or invalid
 *          500:
 *              description: Can't connect to the server right now
 */
router.post('/', authMiddernware, controller.cRawNews)

/**
 * @swagger
 * 
 * /rawnews:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      description: List raw news
 *      summary: list raw news
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: from
 *            description: List raw news from <date-time>, while <date-time> according to RFC3339
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *              format: date-time
 *              example: '2016-08-29T09:12:33.001Z'
 *          - name: to
 *            description: List raw news to <date-time>, while <date-time> according to RFC3339
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *              format: date-time
 *              example: '2016-08-29T09:12:33.001Z'
 *          - name: limit
 *            description: Raw news limit
 *            in: query
 *            required: false
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
 *                          $ref: '#/components/schemas/RawNewsGet'
 *          401:
 *              description: Access token is missing or invalid
 *          500:
 *              description: Can't connect to the server right now
 */
router.get('/', authMiddernware, controller.rRawNews)

/**
 * @swagger
 * 
 * /rawnews/{id}:
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
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *              example: '507f191e810c19729de860ea'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RawNews'
 *      responses:
 *          201:
 *              description: Raw News has been updated
 *          401:
 *              description: Access token is missing or invalid
 *          500:
 *              description: Can't connect to the server right now
 */
router.put('/:id', authMiddernware, controller.uRawNews)

/**
 * @swagger
 * 
 * /rawnews/{id}:
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
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *              example: '507f191e810c19729de860ea'
 *      responses:
 *          204:
 *              description: Resource deleted successfully
 *          401:
 *              description: Access token is missing or invalid
 *          500:
 *              description: Can't connect to the server right now
 */
router.delete('/:id', authMiddernware, controller.dRawNews)

module.exports = router