"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
/*
  SERVER
*/
app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});
app.use((err, req, res, next) => {
    if (res.statusCode === 200)
        res.status(400);
    console.log(err);
    res.json({ error: err });
});
app.listen(process.env.PORT || 3001, () => {
    console.log("server started, Express GraphQL now running on http://localhost:3001/graphiql");
});
