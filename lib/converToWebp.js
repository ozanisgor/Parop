const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputDir = path.join(__dirname, "../public/images/btc");
const outputDir = path.join(__dirname, "../public/images/btc/webp");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

for (let i = 1; i <= 100; i++) {
  const inputFile = path.join(inputDir, `btc-${i}.jpeg`);
  const outputFile = path.join(outputDir, `btc-${i}.webp`);

  sharp(inputFile)
    .resize(1200, 630)
    .toFormat("webp")
    .toFile(outputFile, (err, info) => {
      if (err) throw err;
      console.log(`Image converted successfully: ${outputFile}`, info);
    });
}
