import bodyParser from "body-parser";
import Express from "express";

const app = Express();
const port = 5050;
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get("/health-check", (_, res) => {
  res.send("OK");
});

app.listen(port, () =>
  console.log(`XX Backend server is running at port No.${port}`)
);
