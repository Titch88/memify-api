const express = require("express");
const sizeOf = require("image-size");
import { readdir } from "fs/promises";
const Jimp = require("jimp");
const app = express();
const port = 3000;

const templateFolder = "./templates";

app.get("/:template/:first/:second?", async (req, res) => {
  const { template, first, second } = req.params;
  const files = await readdir(templateFolder);
  console.log(files);
  const file = files[0];
  const path = `${templateFolder}/${file}`;
  const dimensions = sizeOf(path);
  const image = await Jimp.read(path);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const imageText = await image
    .print(
      font,
      0,
      0,
      {
        text: first,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
      },
      dimensions.width,
      dimensions.height
    )
    .print(
      font,
      0,
      90,
      {
        text: second,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
      },
      dimensions.width,
      dimensions.height
    );
  console.log(imageText);
  const buffer = await imageText.getBufferAsync(Jimp.MIME_PNG);
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length
  });
  res.end(buffer);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
