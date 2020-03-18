const express           = require('express'),
      bodyparser        = require('body-parser'),
      cors              = require('cors'),
      bearertoken       = require('express-bearer-token'),
      path              = require('path'),
      mkdirp            = require('mkdirp'),
      swaggerJSDoc      = require('swagger-jsdoc'),
      swaggerUi         = require('swagger-ui-express'),
      SwaggerDefinition = require('./assets/json/SwaggerDefinition.json')

const server     = express(),
      serverPort = process.env.PORT || 3000,
      swaggerDocs = swaggerJSDoc(SwaggerDefinition)

/* Initialize directories */
mkdirp(path.join(__dirname, "assets/logs"), {recursive:true}, err => {
    if (err) console.error(`Error occur when try to make a necessary folder (${err.message})`)
    else console.info('assets/logs folder is ready.')
})

/* Server configuration */
// Routes import
const rawnews = require('./routes/rawnews')

// Middernware 
server.use(bodyparser.urlencoded({ limit: '10mb', extended: true }))
server.use(bodyparser.json({ limit: '10mb', extended: true }))
server.use(bearertoken())
server.use(cors())

// Routes
server.use("/api/rawnews", rawnews)

// Documentation
/**
 * @swagger
 * 
 * /docs:
 *  get:
 *      description: Generate a API document and return in json format
 *      tags:
 *          - Users
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: A successful response
 */
server.get('/api/docs', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});
server.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Run the server
server.listen(serverPort, err => {
    if (err) console.error("Error occur when trying to run the server.")
    else console.info(`Server started on port : ${serverPort}`)
})