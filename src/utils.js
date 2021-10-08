const Jimp = require("jimp");
import templates from "../templates/templates.json";

const DEFAULT_WIDTH = 1000;
const templateFolder = "./templates";

export const getTemplate = async templateString => {
  const found = templates.find(({ adress }) => adress === templateString);
  // todo
  return found
    ? {
        ...found,
        file: `${templateFolder}/${found.file}`,
        font: `fonts/${found.font}`
      }
    : null;
};

export const buildMeme = async ({ foundTemplate, firstText, secondText }) => {
  console.log(foundTemplate);
  const image = await Jimp.read(foundTemplate.file);
  const font = await Jimp.loadFont(foundTemplate.font);

  const resizedImage = image.resize(DEFAULT_WIDTH, Jimp.AUTO);
  const imageText = await resizedImage
    .print(
      font,
      foundTemplate.texts[0]["X"],
      foundTemplate.texts[0]["Y"],
      {
        text: firstText.toUpperCase()
      },
      DEFAULT_WIDTH
    )
    .print(
      font,
      foundTemplate.texts[1] ? foundTemplate.texts[1]["X"] : 0,
      foundTemplate.texts[1] ? foundTemplate.texts[1]["Y"] : 0,
      {
        text: secondText || " "
      },
      DEFAULT_WIDTH
    );

  const buffer = await imageText.getBufferAsync(Jimp.MIME_PNG);

  return buffer;
};
