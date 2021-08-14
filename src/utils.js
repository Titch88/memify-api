const Jimp = require("jimp");

const DEFAULT_WIDTH = 500;

export const getTemplate = (templateString, files) => {
  // todo
  console.log(files);
  return files[0];
};

export const buildMeme = async ({ imagePath, firstText, secondText }) => {
  const image = await Jimp.read(imagePath);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

  const resizedImage = image.resize(DEFAULT_WIDTH, Jimp.AUTO);
  const imageText = await resizedImage
    .print(
      font,
      0,
      0,
      {
        text: firstText,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
      },
      DEFAULT_WIDTH
    )
    .print(
      font,
      0,
      90,
      {
        text: secondText || " ",
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
      },
      DEFAULT_WIDTH
    );

  const buffer = await imageText.getBufferAsync(Jimp.MIME_PNG);

  return buffer;
};
