const express = require("express");
import { readdir } from "fs/promises";
import { buildMeme, getTemplate } from "./utils";
const app = express();
const port = 3000;

const templateFolder = "./templates";

app.get("/:template/:first/:second?", async (req, res) => {
  const { template, first, second } = req.params;
  const files = await readdir(templateFolder);

  const file = getTemplate(template, files);
  if (!file) {
    res.status(400).end();
  }
  const imagePath = `${templateFolder}/${file}`;
  const imageBuffer = await buildMeme({
    imagePath,
    firstText: first,
    secondText: second
  });
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": imageBuffer.length
  });
  res.end(imageBuffer);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
