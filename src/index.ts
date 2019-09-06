require("dotenv").config();
import { Request, Response } from "express";

const app = require("./app");

const { PORT, PRIVATE_PORT } = process.env;

/*
 * SERVER
 */

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Page not found");
});

app.use((err: any, req: Request, res: Response, next: any) => {
  if (res.statusCode === 200) res.status(400);
  console.log(err);
  res.json({ error: err });
});

app.listen(PORT || PRIVATE_PORT, () => {
  console.log(
    `server started, Express GraphQL now running on http://localhost:${PRIVATE_PORT}/graphiql`
  );
});
