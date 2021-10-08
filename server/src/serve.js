import templates from "../templates/templates.json";
import { buildMeme, getTemplate } from "./utils";
import express from "express";
import path from "path";
import cors from "cors";
const app = express();
const port = 3042;

app.use(express.static(path.join(__dirname, "..", "..", "build")));

app.use(cors());

app.get("/templates", (req, res) => {
  res.json(templates);
});

app.get("/:template/:first/:second?", async (req, res) => {
  const { template, first, second } = req.params;

  const foundTemplate = await getTemplate(template);
  if (!foundTemplate) {
    res.status(404);
    res.end();
  } else {
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
  }
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`zé bardi http://localhost:${port}`);
});
