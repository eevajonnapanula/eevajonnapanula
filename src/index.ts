import fs from "fs";
import { petCat, updateCat } from "./helpers/index";
import { levelRegex, widgetRegex } from "./helpers/regex";
import { getStatus, getCat, getResultText } from "./helpers/helpers";

const main = () => {
  readFile();
};

const readFile = async () => {
  try {
    const status = getStatus();
    const cat = await getCat(status.imageId);
    fs.readFile("./README.md", "utf8", async (err, data) => {
      if (err) throw err;

      const catImage = `<img src=${cat.data.url} alt="cat" width=300 />`;

      const level = data.match(levelRegex)
        ? parseInt(data.match(levelRegex)[1])
        : 0;

      const happinessText = process.env.EVENT_ISSUE_NUMBER
        ? petCat(level)
        : updateCat(level);

      const edited = data.replace(
        widgetRegex,
        getResultText(catImage, status.text, await happinessText)
      );

      fs.writeFile("./README.md", edited, "utf8", (err) => {
        if (err) throw err;
      });
    });
  } catch (e) {
    console.log(e);
  }
};

main();
