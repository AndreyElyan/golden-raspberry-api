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

### TESTS

We have 100% dude!

![image](https://github.com/AndreyElyan/golden-raspberry-api/assets/46023665/98b7afdf-cdd1-43d9-a24c-609503e2ecb8)
