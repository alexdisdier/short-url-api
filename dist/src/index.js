"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app = require("./app");
const { PORT, PRIVATE_PORT } = process.env;
/*
 * SERVER
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
app.listen(PORT || PRIVATE_PORT, () => {
    console.log(`server started, Express GraphQL now running on http://localhost:${PRIVATE_PORT}/graphiql`);
});
