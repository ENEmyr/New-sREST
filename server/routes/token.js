const express             = require('express'),
      router              = express.Router(),
      controller          = require('../controllers/TokenController'),
      { authMiddernware } = require('../controllers/Authenication')

/**
 * @swagger
 *
 * definitions:
 *   payload:
 *     type: object
 *     required:
 *       - name
 *       - dt
 *     properties:
 *       name:
 *         type: string
 *         description: Requestor name
 *         example: 'summarizeServer'
 *       dt:
 *          type: string
 *          description: Created date time
 *          format: date-time
 *          example: '2016-08-29T09:12:33.001Z'
 */

/**
 * @swagger
 * /token:
 *  get:
 *      security:
 *          - bearerauth: []
 *      description: Verify access token
 *      summary: verify access token
 *      produces:
 *          - application/json
 *      tags:
 *          - Developers
 *      parameters:
 *          - name: accessToken
 *            description: Access token that use to access the api
 *            in: body
 *            required: true
 *            type: string
 *            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3c3NlcnZlciIsImR0IjoxNTE2MjM5MDIyfQ.gtq1HMmeN7mnYdKfAHhXXwfrLYsaEox92rh79Gc3OiQ'
 *      responses:
 *          200:
 *              description: Verification complete
 *              content:
 *                  application/json:
 *                      type: object
 *                      schema:
 *                          required:
 *                              - result
 *                          properties:
 *                              result:
 *                                  type: string
 *                                  example: 'Valid token'
 *          401:
 *              description: Access token is missing or invalid
 */
router.get('/', authMiddernware, controller.verifyToken)

/**
 * @swagger
 * /token:
 *  post:
 *   security:
 *       - bearerauth: []
 *   description: Generate a permanent access token
 *   summary: generate a permanent access token
 *   produces:
 *       - application/json
 *   tags:
 *       - Developers
 *   parameters:
 *       - in: body
 *         name: payload
 *         description: Payload object
 *         required: true
 *         type: object
 *         schema:
 *          $ref: '#/definitions/payload'
 *   responses:
 *       200:
 *           description: Generate complete
 *           content:
 *               application/json:
 *                   type: object
 *                   schema:
 *                      required:
 *                        - token
 *                      properties:
 *                          token:
 *                              type: string
 *                              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3c3NlcnZlciIsImR0IjoxNTE2MjM5MDIyfQ.gtq1HMmeN7mnYdKfAHhXXwfrLYsaEox92rh79Gc3OiQ'
 *       400:
 *           description: Invalid payload 
 *       401:
 *           description: Access token is missing or invalid
 */
router.post('/', authMiddernware, controller.genToken)

module.exports = router