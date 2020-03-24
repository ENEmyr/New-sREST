# New-sREST
RESTful api services written in Node.js that used for communicate with News summarized database.

## Setup
- Run `npm i`
- Create a `configDB.json` and define the structure like this
``` javascript
{
    "connectionURI": "mongodb://[host[:port]]/[Database]?authSource=[authDB]",
    "username"     : "database_username",
    "password"     : "database_password"
}
```
- Dump it to `./server/config` 
- Run `npm run dev` or `node ./server/server.js`

## API Documentation
![Example](https://i.imgur.com/pG5ytGS.png "API Documentation example 1")

**Local:** [localhost:3000/api](http://localhost:3000/api)

**Public:** [SwaggerHub](https://app.swaggerhub.com/apis-docs/Untesler/New-sREST/1.0.0)

### Swagger.yaml
``` yaml
openapi: 3.0.0
servers:
# Added by API Auto Mocking Plugin
  - description: SwaggerHub API Auto Mocking
    url: https://virtserver.swaggerhub.com/Untesler/New-sREST/1.0.0
  - description: API path
    url: 'http://localhost:3000/api'
info:
  description: This a API for communicate with News summarized database.
  version: 1.0.0
  title: New-s API
  contact:
    email: keypgphysics@outlook.com
  license:
    name: Apache 2.0
    url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
paths:
  /docs:
    get:
      description: Generate a API document and return in json format
      summary: generate a API document and return in json format
      tags:
        - Users
      responses:
        '200':
          description: A successful response
  /rawnews:
    post:
      security:
        - bearerAuth: []
      description: Submit new raw news
      summary: submit new raw news
      tags:
        - Developers
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RawNews'
      responses:
        '201':
          description: Raw News has been submitted on database
        '401':
          description: Access token is missing or invalid
        '500':
          description: Can't connect to the server right now
    get:
      security:
        - bearerAuth: []
      description: List raw news
      summary: list raw news
      tags:
        - Developers
      parameters:
        - name: from
          description: 'List raw news from <date-time>, while <date-time> according to RFC3339'
          in: query
          required: false
          schema:
            type: string
            format: date-time
            example: '2016-08-29T09:12:33.001Z'
        - name: to
          description: 'List raw news to <date-time>, while <date-time> according to RFC3339'
          in: query
          required: false
          schema:
            type: string
            format: date-time
            example: '2016-08-29T09:12:33.001Z'
        - name: limit
          description: Raw news limit
          in: query
          required: false
          schema:
            type: integer
            format: int32
            minimum: 0
            example: 50
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RawNewsGet'
        '401':
          description: Access token is missing or invalid
        '500':
          description: Can't connect to the server right now
  '/rawnews/{id}':
    put:
      security:
        - bearerAuth: []
      description: Update raw news
      summary: update raw news
      tags:
        - Developers
      parameters:
        - name: id
          description: RawNews id
          in: path
          required: true
          schema:
            type: string
            example: 507f191e810c19729de860ea
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RawNews'
      responses:
        '201':
          description: Raw News has been updated
        '401':
          description: Access token is missing or invalid
        '500':
          description: Can't connect to the server right now
    delete:
      security:
        - bearerAuth: []
      description: Delete raw news
      summary: delete raw news
      tags:
        - Developers
      parameters:
        - name: id
          description: RawNews id
          in: path
          required: true
          schema:
            type: string
            example: 507f191e810c19729de860ea
      responses:
        '204':
          description: Resource deleted successfully
        '401':
          description: Access token is missing or invalid
        '500':
          description: Can't connect to the server right now
  /summarizednews:
    post:
      security:
        - bearerAuth: []
      summary: submit new summarized news
      tags:
        - Developers
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SummarizedNews'
      responses:
        '201':
          description: Raw News has been submitted on database
        '401':
          description: Access token is missing or invalid
        '500':
          description: Can't connect to the server right now
    get:
      description: List summarized news
      summary: list summarized news
      tags:
        - Users
      parameters:
        - name: from
          description: 'List summarized news from <date-time>, while <date-time> according to RFC3339'
          in: query
          required: false
          schema:
            type: string
            format: date-time
            example: '2016-08-29T09:12:33.001Z'
        - name: to
          description: 'List summarized news to <date-time>, while <date-time> according to RFC3339'
          in: query
          required: false
          schema:
            type: string
            format: date-time
            example: '2016-08-29T09:12:33.001Z'
        - name: limit
          description: Summarized news limit
          in: query
          required: false
          schema:
            type: integer
            format: int32
            minimum: 0
            example: 50
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SummarizedNewsGet'
        '500':
          description: Can't connect to the server right now
  '/summarizednews/{id}':
    put:
      security:
        - bearerAuth: []
      description: Update summarized news
      summary: update summarized news
      tags:
        - Developers
      parameters:
        - name: id
          description: SummarizedNews id
          in: path
          required: true
          schema:
            type: string
            example: 507f191e810c19729de860ea
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SummarizedNews'
      responses:
        '200':
          description: Resource updated successfully
        '401':
          description: Access token is missing or invalid
        '500':
          description: Can't connect to the server right now
    delete:
      security:
        - bearerAuth: []
      description: Delete summarized news
      summary: delete summarized news
      tags:
        - Developers
      parameters:
        - name: id
          description: SummarizedNews id
          in: path
          required: true
          schema:
            type: string
            example: 507f191e810c19729de860ea
      responses:
        '204':
          description: Resource deleted successfully
        '401':
          description: Access token is missing or invalid
        '500':
          description: Can't connect to the server right now
  /token/verify:
    post:
      security:
        - bearerAuth: []
      description: Verify access token
      summary: verify access token
      tags:
        - Developers
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required:
                - accessToken
              properties:
                accessToken:
                  type: string
                  description: Access token
                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3c3NlcnZlciIsImR0IjoxNTE2MjM5MDIyfQ.gtq1HMmeN7mnYdKfAHhXXwfrLYsaEox92rh79Gc3OiQ
      responses:
        '200':
          description: Verification complete
          content:
            application/json:
              schema:
                required:
                  - result
                properties:
                  result:
                    type: string
                    example: Valid token
        '401':
          description: Access token is missing or invalid
  /token:
    post:
      security:
        - bearerAuth: []
      description: Generate a permanent access token
      summary: generate a permanent access token
      tags:
        - Developers
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/payload'
      responses:
        '200':
          description: Generate complete
          content:
            application/json:
              schema:
                required:
                  - token
                properties:
                  token:
                    type: string
                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3c3NlcnZlciIsImR0IjoxNTE2MjM5MDIyfQ.gtq1HMmeN7mnYdKfAHhXXwfrLYsaEox92rh79Gc3OiQ
        '400':
          description: Invalid payload
        '401':
          description: Access token is missing or invalid
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    RawNews:
      type: object
      required:
        - title
        - content
        - sourceUrl
        - imageUrl
        - author
        - publishAt
      properties:
        title:
          type: string
          description: News title
          example: Some News title
        content:
          type: string
          description: News content
          example: Some News content...
        sourceUrl:
          type: string
          description: News source url
          example: 'https://www.aichanserv.com'
        imageUrl:
          type: string
          description: News cover image url
          example: 'https://www.aichanserv.com/api/covers/default.jpg'
        author:
          type: string
          description: Author name or publisher name
          example: ENEmy
        publisher:
          type: string
          description: Publisher name
          example: ABC Company
        category:
          type: string
          description: Category of the News
          example: crime
        tags:
          type: array
          description: News tags
          items:
            type: string
          example:
            - stab
            - kill
        language:
          type: array
          description: The language that used in News content
          items:
            type: string
          example:
            - th
            - en
        publishAt:
          type: string
          description: Publish date time
          format: date-time
          example: '2016-08-29T09:12:33.001Z'
    RawNewsGet:
      type: array
      description: RawNews Object
      items:
        allOf:
          - $ref: '#/components/schemas/RawNews'
          - required:
              - insertDt
              - _id
              - __v
          - properties:
              insertDt:
                type: string
                description: Insert date time
                format: date-time
                example: '2016-08-29T09:12:33.001Z'
              _id:
                type: string
                description: News ID
                example: 5e76c826c7d33c4f902fbb61
              __v:
                type: number
                example: 0
    SummarizedNews:
      type: object
      required:
        - title
        - content
        - sourceUrl
        - imageUrl
        - author
        - publishAt
      properties:
        title:
          type: string
          description: News title
          example: Some News title
        content:
          type: string
          description: News content
          example: Some News content...
        sourceUrl:
          type: string
          description: News source url
          example: 'https://www.aichanserv.com'
        imageUrl:
          type: string
          description: News cover image url
          example: 'https://www.aichanserv.com/api/covers/default.jpg'
        author:
          type: string
          description: Author name or publisher name
          example: ENEmy
        publisher:
          type: string
          description: Publisher name
          example: ABC Company
        category:
          type: string
          description: Category of the News
          example: crime
        tags:
          type: array
          description: News tags
          items:
            type: string
          example:
            - stab
            - kill
        language:
          type: array
          description: The language that used in News content
          items:
            type: string
          example:
            - th
            - en
        publishAt:
          type: string
          description: Publish date time
          format: date-time
          example: '2016-08-29T09:12:33.001Z'
    SummarizedNewsGet:
      type: array
      description: SummaraizedNews Object
      items:
        allOf:
          - $ref: '#/components/schemas/SummarizedNews'
          - required:
              - insertDt
              - _id
              - __v
          - properties:
              insertDt:
                type: string
                description: Insert date time
                format: date-time
                example: '2016-08-29T09:12:33.001Z'
              _id:
                type: string
                description: News Id
                example: 5e76c826c7d33c4f902fbb61
              __v:
                type: number
                example: 0
    payload:
      type: object
      required:
        - name
        - dt
      properties:
        name:
          type: string
          description: Requestor name
          example: summarizeServer
        dt:
          type: string
          description: Created date time
          format: date-time
          example: '2016-08-29T09:12:33.001Z'
tags: []
```
