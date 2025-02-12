
# Question 5 99Tech Interview

This is a RESTful API built with Express.js and TypeScript, I had experience in NestJS so I was following a modular architecture similar to NestJS. The API provides CRUD operations for managing resources.


## Installation

1. Clone the repository

2. Install dependencies

```bash
    npm install
```


## Configuration

Create a `.env` file in the root directory. Then copy the content in `.env.example` file


## Running the Application

Run the application in development mode

```bash
    npm run start:dev
```

## API Endpoints

#### a. Create a resource

```http
    POST /resources
```

| Body Parameter    | Type     | Description                                    |
| :--------         | :------- | :-------------------------                     |
| `name`            | `string` | **Required**. The name of resource             |
| `description`     | `string` | **Optional**. The description of resource      |
| `isActive`        | `boolean`| **Optional, default TRUE**. The status of resource active / inactive  |

#### b. List resources with basic filters

```http
    GET /resources
```

| Query Parameter  | Type     | Description                                    |
| :--------  | :------- | :-------------------------                     |
| `keyword`  | `string` | **Optional**. The keyword for search resources |
| `isActive` | `string` | **Optional, enum ACTIVE, INACTIVE, ALL**. Use to filter return resources   |

#### c. Get details of a resource

```http
    GET /resources/${id}
```

| Path Parameter | Type     | Description                       |
| :-------- | :------- | :--------------------------------      |
| `id`      | `string` | **Required**. Id of resource to fetch  |

#### d. Update resource details

```http
    PUT /resources/${id}
```

| Path Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------       |
| `id`      | `string` | **Required**. Id of resource to update  |


| Body Parameter    | Type     | Description                                    |
| :--------         | :------- | :-------------------------                     |
| `name`            | `string` | **Optional**. The updated name of resource             |
| `description`     | `string` | **Optional**. The updated description of resource      |
| `isActive`        | `boolean`| **Optional**. The updated status of resource active / inactive  |

#### e. Delete a resource

```http
    DELETE /resources/${id}
```

| Path Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------       |
| `id`      | `string` | **Required**. Id of resource to delete  |


## Request Examples

Create resource

```
    curl --location 'localhost:3001/resources' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "Test",
    }'
```

List resources

```
    curl --location 'localhost:3001/resources?keyword=t&isActive=ACTIVE'
```

Get details of a resource

```
    curl --location 'localhost:3001/resources/4'
```

Update resource details

```
    curl --location --request PUT 'localhost:3001/resources/21' \
    --header 'Content-Type: application/json' \
    --data '{
        "isActive": true
    }'
```

Delete a resource

```
    curl --location --request DELETE 'localhost:3001/resources/19'
```