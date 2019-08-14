import { Request, Response } from "express";
const { PORT } = process.env;
import * as express from "express";

const app: express.Application = express();

//server.js

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Page not found");
});

app.use((err: any, req: Request, res: Response, next: any) => {
  if (res.statusCode === 200) res.status(400);
  console.log(err);
  res.json({ error: err });
});

app.listen(PORT || 3001, () => {
  console.log("server started");
});
