# Testing endpoints

## Getting all rides information

GET <http://localhost:5000/rides/>

## Getting one ride based on its id

GET <http://localhost:5000/rides/62fbd64ca38d8584eb8af325>

Response:

```json
{
    "_id": "62fbd64ca38d8584eb8af325",
    "event": "Coup de fourchette",
    "visitor": "000000000012d5d8",
    "timestamp": "2019-01-01T06:17:47.461Z"
}
```

## Getting all events visited by one visitor id

GET <http://localhost:5000/visitors/000000000012d5d8>

Response:

```json
[
    {
        "event": "Coup de fourchette"
    },
    {
        "event": "la Tour de l'Array"
    },
    {
        "event": "Eventropico"
    },
    {
        "event": "le Manoir des Vieux Clous"
    }
]
```

## Inserting a new ride in database

POST <http://localhost:5000/rides>
Content-Type: application/json
{
    "event": "Le train de la mine",
    "visitorId": "000000000012d5d8"
}

Response:

```json
{
    "event": "Le train de la mine",
    "visitor": "000000000012d5d8",
    "_id": "62fc9384515f9489d31586b7",
    "timestamp": "2022-08-17T07:06:44.674Z",
    "__v": 0
}
```

## Editing a ride

PUT <http://localhost:5000/rides/62fc8905e3f96824a1c7f69e>
Content-Type: application/json
{
    "eventName": "Le train"
}

Response:

```json
{
    "_id": "62fc8905e3f96824a1c7f69e",
    "event": "Le train",
    "visitor": "000000000012d5d8",
    "timestamp": "2022-08-17T06:21:57.635Z",
    "__v": 0
}
```

## Deleting a ride

DELETE <http://localhost:5000/rides/62fc9384515f9489d31586b7>
Content-Type: application/json

Response:

```json
{
    "message": "Ride successfully deleted"
}
```

## Insights: events by visitor

DELETE <http://localhost:5000/insights/visitor>
Content-Type: application/json

Response:

```json
[
    {
        "_id": "000000000012d5da",
        "events": [
            {
                "event": "le Node Express",
                "timestamp": "2019-01-01T13:42:20.155873+01:00"
            },
            {
                "event": "l'EJS Palace",
                "timestamp": "2019-01-01T11:53:34.608729+01:00"
            },
            {
                "event": "Eventropico",
                "timestamp": "2019-01-01T06:11:33.049631+01:00"
            }
        ]
    },
    {
        "_id": "000000000012d5f0",
        "events": [
            {
                "event": "l'EJS Palace",
                "timestamp": "2019-01-02T00:50:52.656747+01:00"
            },
            {
                "event": "le Node Express",
                "timestamp": "2019-01-01T12:00:09.377821+01:00"
            },
            {
                "event": "la Tour de l'Array",
                "timestamp": "2019-01-02T05:23:03.172274+01:00"
            },
            {
                "event": "les auto-DOMponneuses",
                "timestamp": "2019-01-01T10:07:32.643679+01:00"
            },
            {
                "event": "Eventropico",
                "timestamp": "2019-01-03T08:29:19.159492+01:00"
            },
            {
                "event": "ES6 Tycoon",
                "timestamp": "2019-01-02T04:32:12.753575+01:00"
            },
            {
                "event": "Coup de fourchette",
                "timestamp": "2019-01-01T08:36:49.253772+01:00"
            }
        ]
    },
    ...
```

## Insights: total visits per event (attraction)

GET <http://localhost:5000/insights/event>
Content-Type: application/json

Response:

```json
[
    {
        "_id": "les auto-DOMponneuses",
        "count": 50536
    },
    {
        "_id": "ES6 Tycoon",
        "count": 50676
    },
    {
        "_id": "l'EJS Palace",
        "count": 50557
    },
    {
        "_id": "Eventropico",
        "count": 50796
    },
    {
        "_id": "le Manoir des Vieux Clous",
        "count": 50969
    },
    {
        "_id": "Sequelizigzag",
        "count": 50680
    },
    {
        "_id": "Coup de fourchette",
        "count": 50507
    },
    {
        "_id": "la Tour de l'Array",
        "count": 50898
    },
    {
        "_id": "APIttoresque",
        "count": 50803
    },
    {
        "_id": "Promise cuitée",
        "count": 50594
    },
    {
        "_id": "le Node Express",
        "count": 50727
    }
]
```

## Insights: popular events (above 50,700 total visits)

GET <http://localhost:5000/insights/popular>
Content-Type: application/json

Response:

```json
[
    {
        "_id": "le Manoir des Vieux Clous",
        "count": 50969
    },
    {
        "_id": "la Tour de l'Array",
        "count": 50898
    },
    {
        "_id": "APIttoresque",
        "count": 50803
    },
    {
        "_id": "Eventropico",
        "count": 50796
    },
    {
        "_id": "le Node Express",
        "count": 50727
    }
]
```

## Insights: getting total visits for a specific month of a specific year

GET <http://localhost:5000/insights/2019/8>
Content-Type: application/json

Response:

```json
[
    {
        "count": 43780,
        "year": "2019",
        "month": "Aug"
    }
]
```
