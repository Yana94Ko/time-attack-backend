import bodyParser from "body-parser";
import Express from "express";
import controllers from "./domain";
import authMiddleware from "./middlewares/auth.middleware";

const app = Express();
const port = 5050;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(authMiddleware);
app.use(controllers);

app.get("/health-check", (_, res) => {
  res.send("OK");
});

app.listen(port, () =>
  console.log(`XX Backend server is running at port No.${port}`)
);
