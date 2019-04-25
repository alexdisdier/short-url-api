# Synopsis

This is an APi for my shorten url open source web app. I built it using NodeJS.

You will find three branches:

- **master** using Typescript and jest (converted initial javascript project)
- **javascript** first verions of this project
- **GraphQL** converting REST API into GraphQL

🚧 IN PROGRESS

- jest testing validation errors and creating a short url.
- converting REST API into GraphQL

- See source code of front-end built with React - https://github.com/alexdisdier/short-url

## ✅ Functionalities

- Route to shorten url (Create)
  - Checking if it's a valid URL
  - Checking if it's missing http - https
  - Creating in MongoDB new URL object

```javascript
const url = new Url({
  original: inputUrl,
  short: shortUrl,
  visits: 0
});
```

- Route to get all the url (Read)
  - Find all urls
  - Add a count

```javascript
res.json({
  count: count,
  urls
});
```

- Route to redirect the short url
  - Find the short url
  - redirect to original url
- Route to update the number of visits to a url (Update)
  - Find by id the url
  - Increment + 1 the number of visits

## Directory Structure

```bash

short-url-api
├── .gitignore
├── package.json
├── README.md
├── server.js
└── url.js

```

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
