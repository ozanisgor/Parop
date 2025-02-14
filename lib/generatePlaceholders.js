const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

async function generatePlaceholders() {
  const imagesDir = "./public/images/btc";
  const output = {};

  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    if (file.match(/btc-\d+\.webp/)) {
      const number = file.match(/btc-(\d+)\.webp/)[1];
      const imagePath = path.join(imagesDir, file);

      const buffer = await sharp(imagePath)
        .resize(10, 10, { fit: "inside" })
        .toBuffer();

      output[number] = `data:image/webp;base64,${buffer.toString("base64")}`;
    }
  }

  fs.writeFileSync(
    "./lib/blurPlaceholders.json",
    JSON.stringify(output, null, 2)
  );
}

generatePlaceholders();
