# New-sREST
RESTful api services written in Node.js that used for communicate with News summarized database.

## Version: 1.0.0

**Contact information:**  
keypgphysics@outlook.com  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /docs

#### GET
##### Summary:

generate a API document and return in json format

##### Description:

Generate a API document and return in json format

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | A successful response |

### /rawnews

#### POST
##### Summary:

submit new raw news

##### Description:

Submit new raw news

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been submitted on database |
| 401 | Access token is missing or invalid |
| 500 | Can't connect to the server right now |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### GET
##### Summary:

list raw news

##### Description:

List raw news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| from | query | List raw news from <date-time>, while <date-time> according to RFC3339 | No | dateTime |
| to | query | List raw news to <date-time>, while <date-time> according to RFC3339 | No | dateTime |
| limit | query | Raw news limit | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | A successful response |
| 401 | Access token is missing or invalid |
| 500 | Can't connect to the server right now |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /rawnews/{id}

#### PUT
##### Summary:

update raw news

##### Description:

Update raw news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | RawNews id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been updated |
| 401 | Access token is missing or invalid |
| 500 | Can't connect to the server right now |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### DELETE
##### Summary:

delete raw news

##### Description:

Delete raw news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | RawNews id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been deleted |
| 401 | Access token is missing or invalid |
| 500 | Can't connect to the server right now |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /summarizednews

#### POST
##### Summary:

submit new summarized news

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been submitted on database |
| 401 | Access token is missing or invalid |
| 500 | Can't connect to the server right now |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### GET
##### Summary:

list summarized news

##### Description:

List summarized news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| from | query | List summarized news from <date-time>, while <date-time> according to RFC3339 | No | dateTime |
| to | query | List summarized news to <date-time>, while <date-time> according to RFC3339 | No | dateTime |
| limit | query | Summarized news limit | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | A successful response |
| 500 | Can't connect to the server right now |

### /summarizednews/{id}

#### PUT
##### Summary:

update summarized news

##### Description:

Update summarized news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | SummarizedNews id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Resource updated successfully |
| 401 | Access token is missing or invalid |
| 500 | Can't connect to the server right now |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### DELETE
##### Summary:

delete summarized news

##### Description:

Delete summarized news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | SummarizedNews id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | Resource deleted successfully |
| 401 | Access token is missing or invalid |
| 500 | Can't connect to the server right now |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /token

#### GET
##### Summary:

verify access token

##### Description:

Verify access token

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| accessToken | body | Access token that use to access the api | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Verification complete |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerauth | |

#### POST
##### Summary:

generate a permanent access token

##### Description:

Generate a permanent access token

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | Payload object | Yes | [payload](#payload) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Generate complete |
| 400 | Invalid payload |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerauth | |

### Models


#### RawNews

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string | News title | Yes |
| content | string | News content | Yes |
| sourceUrl | string | News source url | Yes |
| imageUrl | string | News cover image url | Yes |
| author | string | Author name or publisher name | Yes |
| publisher | string | Publisher name | No |
| category | string | Category of the News | No |
| tags | [ string ] | News tags | No |
| language | [ string ] | The language that used in News content | No |
| publishAt | dateTime | Publish date time | Yes |

#### RawNewsGet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| RawNewsGet | array |  |  |

#### SummarizedNews

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string | News title | Yes |
| content | string | News content | Yes |
| sourceUrl | string | News source url | Yes |
| imageUrl | string | News cover image url | Yes |
| author | string | Author name or publisher name | Yes |
| publisher | string | Publisher name | No |
| category | string | Category of the News | No |
| tags | [ string ] | News tags | No |
| language | [ string ] | The language that used in News content | No |
| publishAt | dateTime | Publish date time | Yes |

#### SummarizedNewsGet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| SummarizedNewsGet | array |  |  |

#### payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | Requestor name | Yes |
| dt | dateTime | Created date time | Yes |