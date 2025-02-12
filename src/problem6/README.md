
# Live Scoreboard Module Specification

This module manages a real-time scoreboard system that update scores in real-time while preventing unauthorized score manipulations, and displays the top 10 users based on their scores.




## Diagram

[Mermaid Diagram Link](https://mermaid.ink/img/pako:eNptk9ty2jAQhl9lR1ftDAl22zSML9oJhpADEw6GZFqbCyEv2AO2GElOoTbvXluygczUV5L223_1a9c5YTxE4pDVlv9hERUKZr0ghfK7891tjKlawNXVj2KACoZIQxRLTkVYQNcf9GfQpru4LRkX2N6eowuj0NWZboRsAy5lERbg5noBuI-lkj-PBnQ1-AtlAT1_iioTqUkIYcZ3YFuLS-6FF9D3JxmKA_SooksqsQb6FQD3vikyRZltlaxj9zpWmqvtaa35LqQKwascFDDwxyPvg6lMx2uFgU55pdu4OizgIQ-IcXeXqQg-rQRPQPENptAGGa9TWjrBzwGpbT7o_Mf0vVIo4LGx6iHLRKwO0BeCi7rYZcqrSXjKTbVpdeVhnMSqFn7SVH_PEEMswedG-Uz-R9tkjZ4LGPr1O8wlCvMYNTnUjzZq4vpdP4iMNDCub2a6BW5E0zWGTXvHp7ZNTpYzxlA2rRmf-z_133DpcbYp560rOA0ZlarGprrWpOmgd4FejqrL0xSZKmDmv3nQTGf83lx8pmXmvpctJRPxEsuegTEoLysV40xGdaCAOWmRBEVC47D8XfKKC4iKMMGAOOUyxBUtpy0gQXosUZop7h1SRhwlMmwRwbN1RJwV3cpyZ8aqF9O1oMnpdEfT35wnTUq5JU5O9sT5cmtff_12a3fszo1lfe_ctMiBONaxRf5q3r62zGdbVkXZneM_YEo1mw?type=png)


## Core Requirements

1. Update a real-time top 10 scoreboard
2. Process secure score updates from authenticated users
3. Prevent unauthorized score modifications


## Data Model

User Score Entity

```typescript
{
    userId: string          // Unique identifier for the user
    displayName: string     // Display name
    score: number           // Current total score
    lastUpdated: bigint     // Timestamp of last score update in ms
}
```
## API Endpoints

#### 1. Get Top Scores

```http
    GET /api/score/leaderboard
```
Retrieves the array of top 10 user scores

| Response      | Type     | Description                                    |
| :--------     | :------- | :-------------------------                     |
| `userId`      | `string` | The id of user             |
| `displayName` | `string` | The display name of user on leaderboard    |
| `score`       | `integer`| The score of user on leaderboard   |

**Cache:** We can cache the leaderboard until there is a score updates


#### 2. Update User Score

```http
    POST /api/score/update
```
Updates a user’s score when they complete an action

**Authorization**:

| Request Params    | Type      | Description                   |
| :--------         | :-------  | :-------------------------    |
| `authToken`       | `string`  | The JWT token                 |

JWT token:  used to ensure only authorized users can update scores. Use when users update score on website / app.

| Request Params    | Type      | Description                                               |
| :--------         | :-------  | :-------------------------                                |
| `signature`       | `string`  | **Required**. HMAC signature of the action for sercurity  |
| `timestamp`       | `bigint`  | **Required**. UTC timestamp in ms                         |

The signature and timestamp used to authentication the request when user use API to send the request.

**Rate Limiting:** Depend on the logic how can a user done an action to achieve scores. If it a fast game and finish in 10 secs, can set limit 10 requests / minute / user. If it a slow game which only finish in hour, can set limit 10 requests / hour / user.

| Request Body      | Type      | Description                                               |
| :--------         | :-------  | :-------------------------                                |
| `userId`          | `string`  | **Required**. The id of user                              |
| `additionalScore` | `integer` | **Required**. The additional score which will add to user |

| Response  | Type      | Description                                   |
| :-------- | :-------  | :-------------------------                    |
| `success` | `boolean` | The result of update score successful or not  |
| `userId`  | `string`  | The user id                                   |
| `score`   | `integer` | The updated score of user                     |

**Cache:** We can cache the user's score until there is an update


## WebSocket Events

Endpoint

```url
    ws://api.99techinterview.com/score/live
```
Provide a webSocket connection to push live score updates to the scoreboard.

Response data is similar  to GET /api/score/leaderboard, get top user scores.

When update the score, calculate to check the top 10, if there are any change in leaderboard, call to websocker to update leaderboard.