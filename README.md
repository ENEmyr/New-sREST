# New-sREST
RESTful api services written in Node.js that used for communicate with News summarized database.

## Version: 1.0.0

**Contact information:**  
keypgphysics@outlook.com  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /docs

#### GET
##### Description:

Generate a API document and return in json format

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | A successful response |

### /rawnews

#### POST
##### Description:

submit new raw news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| rawnews | body | RawNews object | Yes | [RawNews](#rawnews) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been submitted on database |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### GET
##### Description:

list raw news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| from | query | list raw news from <full-date>T<full-time> | Yes | dateTime |
| to | query | list raw news to <full-date>T<full-time> | Yes | dateTime |
| limit | query | raw news limit | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | A successful response |
| 401 | Access token is missing or invalid |

#### PUT
##### Description:

update raw news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | RawNews id | Yes | string |
| rawnew | body | RawNews object | Yes | [RawNews](#rawnews) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been updated |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### DELETE
##### Description:

delete raw news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | RawNews id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been deleted |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /summarizednews

#### POST
##### Description:

submit new summarized news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| summarizednews | body | SummarizedNews object | Yes | [SummarizedNews](#summarizednews) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been submitted on database |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### GET
##### Description:

list summarized news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| from | query | list summarized news from <full-date>T<full-time> | Yes | dateTime |
| to | query | list summarized news to <full-date>T<full-time> | Yes | dateTime |
| limit | query | summarized news limit | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | A successful response |

#### PUT
##### Description:

update summarized news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | SummarizedNews id | Yes | string |
| summarizednew | body | SummarizedNews object | Yes | [SummarizedNews](#summarizednews) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been updated |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### DELETE
##### Description:

delete summarized news

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | SummarizedNews id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Raw News has been deleted |
| 401 | Access token is missing or invalid |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### Models


#### RawNews

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string |  | Yes |
| content | string |  | Yes |
| sourceUrl | string |  | Yes |
| imageUrl | string |  | Yes |
| author | string |  | Yes |
| publisher | string |  | No |
| category | string |  | No |
| tags | [ string ] |  | No |
| language | [ string ] |  | No |
| publishAt | dateTime |  | Yes |

#### RawNewsGet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| RawNewsGet |  |  |  |

#### SummarizedNews

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string |  | Yes |
| content | string |  | Yes |
| sourceUrl | string |  | Yes |
| imageUrl | string |  | Yes |
| author | string |  | Yes |
| publisher | string |  | No |
| category | string |  | No |
| tags | [ string ] |  | No |
| language | [ string ] |  | No |
| publishAt | dateTime |  | Yes |

#### SummarizedNewsGet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| SummarizedNewsGet |  |  |  |
