[![Build Status](https://semaphoreci.com/api/v1/alexdisdier/short-url-api/branches/master/shields_badge.svg)](https://semaphoreci.com/alexdisdier/short-url-api)

# Synopsis

This is an APi for my shorten url open source web app. I built it using NodeJS.

You will find three branches:

- **master** using Typescript and Jest
- **javascript** first version of this project
- **GraphQL** converting REST API into GraphQL

🚧 IN PROGRESS

- jest testing.
- converting REST API into GraphQL

- See source code of front-end built with React - https://github.com/alexdisdier/short-url

## ✅ Functionalities

- Route to shorten url

  - Checking if it's a valid URL
  - Checking if it's missing http - https
  - Creating in MongoDB new URL object

- Route to redirect the short url
  - Find the short url
  - redirect to original url
- Route to update the number of visits to a url
  - Find by id the url
  - Increment + 1 the number of visits

## Directory Structure

```bash

shorten-url-api
├── dist
├── src
│   ├── constant
│   ├── app.ts
│   ├── server.ts
│   └── url.ts
├── test
├── .gitignore
├── README.md
├── jest.config.js
├── package.json
└── tsconfig.json

```

## Running the project

Clone this repository :

```bash
git clone https://github.com/alexdisdier/short-url-api.git

cd shorten-url-api
```

Test different branches:

```bash
git checkout javascript
git checkout GraphQL
```

Start the server:

```bash
npm run dev
```

Test the api:

```bash
npm run test:unit
```

Build the app:

```bash
npm run build
```

Open Postman to test it out. Your data will be saved to MongoDB.

If you're on the graphQl branch, you can use graphiql.

## Built With

- [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Testing With

- [Postman](https://www.getpostman.com/)

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [compression](https://www.npmjs.com/package/compression)
- [helmet](https://www.npmjs.com/package/helmet)
- [cors](https://www.npmjs.com/package/cors)
- [uid2](https://www.npmjs.com/package/uid2?activeTab=versions)
- @types/...
