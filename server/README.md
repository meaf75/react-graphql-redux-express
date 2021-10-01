## Initialization
- This backend service requires a '.env' file to work in local, you can use the [env.example](./env.example) located in this folder to configurate the service env variables.

- Make sure you have the mongodb service running in your machine, you can install it with the following guide [Mongodb manual installation](https://docs.mongodb.com/manual/installation/)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# run build
$ yarn run start

# development 
$ yarn run start:dev
```

## Endpoints

| METHOD | ENDPOINT | DESCRIPTION | REQUIRE AUTHORIZATION
| --- | --- | --- | --- |
| GET | api/current_user | Get user based on authorization token | YES
| POST | api/user | Create a new user | NO
| POST | api/login | Login, returns authorization token and user | NO

you can also check [the postman collection](../Hello-Collection.postman_collection.json)

## License
[MIT licensed](LICENSE).
