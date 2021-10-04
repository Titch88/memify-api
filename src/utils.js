const Jimp = require("jimp");

const DEFAULT_WIDTH = 500;

export const getTemplate = files => {
  // todo
  return files[0];
};

export const buildMeme = async ({ imagePath, nick }) => {
  const image = await Jimp.read(imagePath);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  const resizedImage = image.resize(DEFAULT_WIDTH, Jimp.AUTO);
  const imageText = await resizedImage.print(
    font,
    135,
    248,
    {
      text: nick,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
    },
    DEFAULT_WIDTH
  );

  const buffer = await imageText.getBufferAsync(Jimp.MIME_PNG);

  return buffer;
};
