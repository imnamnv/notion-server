const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("@notionhq/client");

const { config } = require("dotenv");
const { getText } = require("./getTextFromBlock");
var cors = require("cors");

config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const app = express();
const port = 5001;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const store = await getText();
    res.status(200).send(store);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
