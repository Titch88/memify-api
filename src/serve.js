const express = require("express");
import { readdir } from "fs/promises";
import { buildMeme, getTemplate } from "./utils";
const app = express();
const port = 3042;

const templateFolder = "./templates";

app.get("/foutre/:nick", async (req, res) => {
  const { nick } = req.params;
  const files = await readdir(templateFolder);

  const file = getTemplate(files);
  if (!file) {
    res.status(400).end();
  }
  const imagePath = `${templateFolder}/${file}`;
  const imageBuffer = await buildMeme({
    imagePath,
    nick
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
