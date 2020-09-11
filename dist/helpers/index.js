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
exports.updateCat = exports.petCat = void 0;
const isThisHour_1 = __importDefault(require("date-fns/isThisHour"));
const github = __importStar(require("@actions/github"));
const helpers_1 = require("./helpers");
exports.petCat = (level) => __awaiter(void 0, void 0, void 0, function* () {
    const { GITHUB_TOKEN, REPOSITORY, EVENT_ISSUE_NUMBER, EVENT_USER_LOGIN, } = process.env;
    const octokit = github.getOctokit(GITHUB_TOKEN);
    const [owner, repo] = REPOSITORY.split("/");
    try {
        console.log("Sending message");
        yield octokit.issues.createComment({
            owner,
            repo,
            issue_number: parseInt(EVENT_ISSUE_NUMBER),
            body: helpers_1.getComment(EVENT_USER_LOGIN),
        });
        console.log("Closing the issue");
        yield octokit.issues.update({
            owner: owner,
            repo: repo,
            issue_number: parseInt(EVENT_ISSUE_NUMBER),
            state: "closed",
        });
    }
    catch (e) {
        console.log(e);
    }
    const happiness = Math.min(level + 10, 100);
    return yield helpers_1.getTextForHappiness(happiness);
});
exports.updateCat = (level) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if text for happiness should have smaller level
    try {
        const issues = yield helpers_1.getIssues();
        if (issues && !isThisHour_1.default(new Date(issues[0].created_at))) {
            return yield helpers_1.getTextForHappiness(Math.max(level - 5, 10));
        }
        return yield helpers_1.getTextForHappiness(level);
    }
    catch (e) {
        throw e;
    }
});
//# sourceMappingURL=index.js.map