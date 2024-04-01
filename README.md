<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Installation

```bash
$ yarn install
$ npx prisma migrate dev  (mandatory)
```

## Running the app

```bash
# development
$ yarn run start

On Start, the app will seed the database with some data.

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migrations

```bash
# create migration
$ npx migrate create <migration-name>

# run migrations
$ npx migrate dev

# revert migrations
$ npx migrate revert
```

## Docs

```bash
Folder structure:

This project follows the Clean Architecture principles, so the folder structure is divided into three layers: Application, Domain, and Infrastructure.

SOLID principles are also followed, so the code is organized in a way that is easy to maintain and test.

DDD (Domain-Driven Design) is also used to separate the business rules from the infrastructure.


```

```
src
├── app (Application layer)
│   ├── entities (DTOs)
│   ├── errors (Custom errors)
│   ├── use-cases (Business rules)
│
├── domain (Domain layer)
│   ├── domain-repositories (Interfaces)
│   ├── models (Entities)

├── infra (Infrastructure layer)
│   ├── database (Database connection)
│      ├── prisma (Prisma client)
│      ├── repositories (Repositories)
│   ├── models (Entities)
│   ├── http  (HTTP layer)
│      ├── controllers (Controllers)

```

### API

- [Swagger](http://localhost:8000/api)

- ![image](https://github.com/AndreyElyan/golden-raspberry-api/assets/46023665/abad6417-b7de-4af0-9290-58c1e7ba4988)


## Documentation for Movie Endpoints

### Get All Movies
- **Endpoint:** `/movies/all`
- **Method:** GET
- **Response:**
  ```json
  [
    {
      "id": 1,
      "year": "year",
      "title": "title",
      "studios": "studios",
      "producers": "producers",
      "winner": "winner",
      "urlImage": "imageUrl"
    }
  ]
  ```

### Get Awards Range
- **Endpoint:** `/movies/awards-range`
- **Method:** GET
- **Response:**
  ```json
  {
    "min": [
      {
        "producer": "Joel Silver",
        "interval": 1,
        "previousWin": 1990,
        "followingWin": 1991
      }
    ],
    "max": [
      {
        "producer": "Matthew Vaughn",
        "interval": 13,
        "previousWin": 2002,
        "followingWin": 2015
      }
    ]
  }
  ```

### Add Movie
- **Endpoint:** `/movies`
- **Method:** POST
- **Request:**
  ```json
  {
    "year": "2017",
    "title": "Transformers",
    "studio": "Paramount Pictures",
    "producer": "Don Murphy, Tom DeSanto",
    "winner": true,
    "page": 1
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": 197,
      "year": "2017",
      "title": "Transformers: The Last Knight",
      "studios": "Paramount Pictures",
      "producers": "Don Murphy, Tom DeSanto, Lorenzo di Bonaventura and Ian Bryce",
      "winner": "",
      "urlImage": "https://upload.wikimedia.org/wikipedia/en/2/26/Transformers_The_Last_Knight_poster.jpg"
    }
  ]
  ```

### Search Movies By Text
- **Endpoint:** `/movies/search/{text}`
- **Method:** GET
- **Response:**
  ```json
  [
    {
      "id": 203,
      "year": "2019",
      "title": "Cats",
      "studios": "Universal Pictures",
      "producers": "Debra Hayward, Tim Bevan, Eric Fellner, and Tom Hooper",
      "winner": "yes",
      "urlImage": "https://upload.wikimedia.org/wikipedia/en/c/cf/Cats_2019_poster.jpg"
    }
  ]
  ```

### Get Years With Multiple Winners
- **Endpoint:** `/movies/years-with-multiple-winners`
- **Method:** GET
- **Response:**
  ```json
  [
    {
      "year": "1986",
      "winners": [
        {
          "id": 37,
          "year": "1986",
          "title": "Howard the Duck",
          "studios": "Universal Studios",
          "producers": "Gloria Katz",
          "winner": "yes",
          "urlImage": "https://upload.wikimedia.org/wikipedia/en/7/7f/Howard_the_Duck_%281986%29.jpg"
        },
        {
          "id": 38,
          "year": "1986",
          "title": "Under the Cherry Moon",
          "studios": "Warner Bros.",
          "producers": "Bob Cavallo, Joe Ruffalo and Steve Fargnoli",
          "winner": "yes",
          "urlImage": "https://upload.wikimedia.org/wikipedia/en/b/b4/Under_the_cherry_moon.jpg"
        }
      ]
    },
    ...
  ]
  ```

### Get Studios With Most Victories
- **Endpoint:** `/movies/studios-with-most-victories`
- **Method:** GET
- **Response:**
  ```json
  [
    {
      "studio": "Columbia Pictures",
      "numberOfVictories": 7,
      "winners": [
        {
          "title": "Rambo: First Blood Part II",
          "year": "1985",
          "producers": [
            "Buzz Feitshans"
          ]
        },
        ...
      ]
    },
    ...
  ]
  ```

### Get Winners By Year
- **Endpoint:** `/movies/winners-by-year/{year}`
- **Method:** GET
- **Response:**
  ```json
  [
    {
      "id": 1,
      "year": "year",
      "title": "title",
      "studios": "studios",
      "producers": "producers",
      "winner": "winner",
      "urlImage": "imageUrl"
    }
  ]
  ```

### TESTS

We have 100% dude!

![image](https://github.com/AndreyElyan/golden-raspberry-api/assets/46023665/98b7afdf-cdd1-43d9-a24c-609503e2ecb8)
