import isThisHour from "date-fns/isThisHour";
import * as github from "@actions/github";
import { getTextForHappiness, getIssues, getComment } from "./helpers";

export const petCat = async (level: number) => {
  const {
    GITHUB_TOKEN,
    REPOSITORY,
    EVENT_ISSUE_NUMBER,
    EVENT_USER_LOGIN,
  } = process.env;

  const octokit = github.getOctokit(GITHUB_TOKEN);
  const [owner, repo] = REPOSITORY.split("/");

  try {
    console.log("Sending message");
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: parseInt(EVENT_ISSUE_NUMBER),
      body: getComment(EVENT_USER_LOGIN),
    });
    console.log("Closing the issue");
    await octokit.issues.update({
      owner: owner,
      repo: repo,
      issue_number: parseInt(EVENT_ISSUE_NUMBER),
      state: "closed",
    });
  } catch (e) {
    console.log(e);
  }
  const happiness = Math.min(level + 10, 100);
  return await getTextForHappiness(happiness);
};

export const updateCat = async (level: number) => {
  // Check if text for happiness should have smaller level
  try {
    const issues = await getIssues();
    if (issues && !isThisHour(new Date(issues[0].created_at))) {
      return await getTextForHappiness(Math.max(level - 5, 10));
    }
    return await getTextForHappiness(level);
  } catch (e) {
    throw e;
  }
};
