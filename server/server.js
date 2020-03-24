const express            = require('express'),
      cors               = require('cors'),
      bearertoken        = require('express-bearer-token'),
      path               = require('path'),
      mkdirp             = require('mkdirp'),
      validator          = require('validator'),
      swaggerJSDoc       = require('swagger-jsdoc'),
      swaggerUi          = require('swagger-ui-express'),
      SwaggerDefinition  = require('./assets/json/SwaggerDefinition.json'),
      AVAILABLE_JSON_KEY = [
        "title",
        "content",
        "sourceUrl",
        "imageUrl",
        "author",
        "publisher",
        "category",
        "tags",
        "language",
        "publishAt",
        "name",
        "dt",
        "accessToken",
        ""
      ]

const server     = express(),
      serverPort = process.env.PORT || 3000,
      swaggerDocs = swaggerJSDoc(SwaggerDefinition)

/* Initialize directories */
mkdirp(path.join(__dirname, "assets/logs"), {recursive:true}, err => {
    if (err) console.error(`Error occur when try to make a necessary folder (${err.message})`)
    else console.info('assets/logs folder is ready.')
})

function jsonFilter(key, value) {
  if (!AVAILABLE_JSON_KEY.includes(key) && !validator.isInt(key)) return undefined
  return value
}

/* Server configuration */
// Routes import
const rawnews        = require('./routes/rawnews'),
      summarizednews = require('./routes/summarizednews'),
      token          = require('./routes/token')

// Middernware 
server.use(express.json({ limit: '10mb', reviver: jsonFilter}))
server.use(express.urlencoded({ limit: '10mb', extended: true }))
server.use(bearertoken())
// used for set HTTP response header: Access-Control-Allow-Origin: *
server.use(cors())
// Handling error occurs in the middernware
server.use((error, req, res, next) => {
  return res.sendStatus(400)
})

// Routes
server.use("/api/rawnews", rawnews)
server.use("/api/summarizednews", summarizednews)
server.use("/api/token", token)

// Documentation
/**
 * @swagger
 * 
 * /docs:
 *  get:
 *      description: Generate a API document and return in json format
 *      summary: generate a API document and return in json format
 *      tags:
 *          - Users
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