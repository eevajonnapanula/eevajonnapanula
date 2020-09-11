"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const index_1 = require("./helpers/index");
const regex_1 = require("./helpers/regex");
const helpers_1 = require("./helpers/helpers");
const main = () => {
    readFile();
};
const readFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = helpers_1.getStatus();
        const cat = yield helpers_1.getCat(status.imageId);
        fs_1.default.readFile("./README.md", "utf8", (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            const catImage = `<img src=${cat.data.url} alt="cat" width=300 />`;
            const level = data.match(regex_1.levelRegex)
                ? parseInt(data.match(regex_1.levelRegex)[1])
                : 0;
            const happinessText = process.env.EVENT_ISSUE_NUMBER
                ? index_1.petCat(level)
                : index_1.updateCat(level);
            const edited = data.replace(regex_1.widgetRegex, helpers_1.getResultText(catImage, status.text, yield happinessText));
            fs_1.default.writeFile("./README.md", edited, "utf8", (err) => {
                if (err)
                    throw err;
            });
        }));
    }
    catch (e) {
        console.log(e);
    }
});
main();
//# sourceMappingURL=index.js.map