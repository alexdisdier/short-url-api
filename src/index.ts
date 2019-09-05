const app = require("./app");

import { Request, Response } from "express";

/*
  SERVER
*/

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Page not found");
});

app.use((err: any, req: Request, res: Response, next: any) => {
  if (res.statusCode === 200) res.status(400);
  console.log(err);
  res.json({ error: err });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    "server started, Express GraphQL now running on http://localhost:3001/graphiql"
  );
});
