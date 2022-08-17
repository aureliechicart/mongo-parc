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

## Getting all visitors who visited a specific ride

GET <http://localhost:5000/visitors/>
Content-Type: application/json
{
    "rideName": "Eventropico"
}

Response:

```json
[
    {
        "visitor": "000000000012d5d8"
    },
    {
        "visitor": "000000000012d5da"
    },
    {
        "visitor": "000000000012d5f0"
    },
    {
        "visitor": "000000000012d5d7"
    },
    {
        "visitor": "000000000012d613"
    },
    {
        "visitor": "000000000012d62e"
    },
    {
        "visitor": "000000000012d65b"
    },
    ...
```
