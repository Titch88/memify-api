const express = require("express");
import { buildMeme, getTemplate } from "./utils";
const app = express();
const port = 3042;

app.get("/:template/:first/:second?", async (req, res) => {
  const { template, first, second } = req.params;

  const foundTemplate = await getTemplate(template);
  if (!foundTemplate) {
    res.status(400).end();
  }
  const imageBuffer = await buildMeme({
    foundTemplate,
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
  console.log(`zé bardi http://localhost:${port}`);
});
