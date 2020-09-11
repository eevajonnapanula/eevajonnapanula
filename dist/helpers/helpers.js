"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getCat = exports.getStatus = exports.getIssues = exports.getComment = exports.getTextForHappiness = exports.getProgress = exports.getResultText = exports.getLastPersonTable = void 0;
const format_1 = __importDefault(require("date-fns/format"));
const axios_1 = __importDefault(require("axios"));
const github = __importStar(require("@actions/github"));
const statuses_1 = require("./statuses");
/* Texts */
exports.getLastPersonTable = (issues) => `Last times she's been petted: 

Date | User
------- | ---------
 ${issues
    .filter((issue) => issue.title === "pet-cat")
    .map((issue) => `${format_1.default(new Date(issue.created_at), "dd/LL/yyyy")} | ${`[@${issue.user.login}](https://github.com/${issue.user.login})`}`)
    .slice(0, 5)
    .join("\n")}`;
exports.getResultText = (image, statusText, happinessText) => `<!-- Cat Widget Start -->
## Mau :cat:

There's a (virtual) cat living in this repo! Right now she's ${statusText}

${image}
  
${happinessText}

*The pictures are from [the Cat Api](https://thecatapi.com/)*
<!-- Cat Widget End -->`;
exports.getProgress = (times) => `${":sparkling_heart: ".repeat(times)}${":black_heart: ".repeat(10 - times)}`;
exports.getTextForHappiness = (happinessLevel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const persons = yield getLastPersonsToPet();
        return `### Happiness
  She loves hooomans, and petting. This is how happy she is right now: 
  
  ${exports.getProgress(happinessLevel / 10)}
  
  Happiness level: ${happinessLevel}/100
   
  **If you want to pet her, you can do it by [clicking this link.](https://github.com/${process.env.REPOSITORY}/issues/new?title=pet-cat&body=Just+submit+the+issue+-+that%27s+all+you+have+to+do+%3Acat%3A)**
  
  ${persons}
  `;
    }
    catch (e) {
        throw e;
    }
});
exports.getComment = (userLogin) => `Purrrrr! :cat: Thanks @${userLogin}`;
/* Helpers */
const getLastPersonsToPet = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const issues = yield exports.getIssues();
        return exports.getLastPersonTable(issues);
    }
    catch (e) {
        throw e;
    }
});
exports.getIssues = () => __awaiter(void 0, void 0, void 0, function* () {
    const [owner, repo] = process.env.REPOSITORY.split("/");
    const octokit = yield github.getOctokit(process.env.GITHUB_TOKEN);
    const issues = yield octokit.issues.listForRepo({
        owner,
        repo,
        state: "closed",
    });
    return issues.data || [];
});
exports.getStatus = () => {
    const keys = Object.keys(statuses_1.statuses);
    return statuses_1.statuses[keys[(keys.length * Math.random()) << 0]];
};
exports.getCat = (imageId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.get(`https://api.thecatapi.com/v1/images/${imageId}?api_key=${process.env.API_KEY}`);
});
//# sourceMappingURL=helpers.js.map