const sizeOf = require("image-size");
const Jimp = require("jimp");

export const getTemplate = (templateString, files) => {
  // todo
  console.log(files);
  return files[0];
};

export const buildMeme = async ({ imagePath, firstText, secondText }) => {
  const dimensions = sizeOf(imagePath);
  const image = await Jimp.read(imagePath);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  console.log(secondText);
  const imageText = await image
    .print(
      font,
      0,
      0,
      {
        text: firstText,
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
        text: secondText || " ",
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
      },
      dimensions.width,
      dimensions.height
    );

  const buffer = await imageText.getBufferAsync(Jimp.MIME_PNG);

  return buffer;
};
