import format from "date-fns/format";
import axios from "axios";
import * as github from "@actions/github";
import { statuses } from "./statuses";

/* Texts */
export const getLastPersonTable = (issues) => `Last times she's been petted: 

Date | User
------- | ---------
 ${issues
   .map(
     (issue) =>
       `${format(
         new Date(issue.created_at),
         "dd/LL/yyyy"
       )} | ${`[@${issue.user.login}](https://github.com/${issue.user.login})`}`
   )
   .slice(0, 5)
   .join("\n")}`;

export const getResultText = (
  image: string,
  statusText: string,
  happinessText: string
) => `<!-- Cat Widget Start -->
## Mau :cat:

There's a (virtual) cat living in this repo! Right now she's ${statusText}

${image}
  
${happinessText}
  
<!-- Cat Widget End -->`;

export const getProgress = (times: number) =>
  `${":sparkling_heart: ".repeat(times)}${":black_heart: ".repeat(10 - times)}`;

export const getTextForHappiness = async (happinessLevel?: number) => {
  try {
    const persons = await getLastPersonsToPet();
    return `### Happiness
  She loves hooomans, and petting. This is how happy she is right now: 
  
  ${getProgress(happinessLevel / 10)}
  
  Happiness level: ${happinessLevel}/100
   
  **If you want to pet her, you can do it by [clicking this link.](https://github.com/${
    process.env.REPOSITORY
  }/issues/new?title=pet-cat&body=Just+submit+the+issue+-+that%27s+all+you+have+to+do+%3Acat%3A)**
  
  ${persons}
  `;
  } catch (e) {
    throw e;
  }
};

export const getComment = (userLogin: string) =>
  `Purrrrr! :cat: Thanks @${userLogin}`;

/* Helpers */

const getLastPersonsToPet = async () => {
  try {
    const issues = await getIssues();
    return getLastPersonTable(issues);
  } catch (e) {
    throw e;
  }
};

export const getIssues = async () => {
  const [owner, repo] = process.env.REPOSITORY.split("/");
  const octokit = await github.getOctokit(process.env.GITHUB_TOKEN);
  const issues = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "closed",
  });

  return issues.data || [];
};

export const getStatus = () => {
  const keys = Object.keys(statuses);
  return statuses[keys[(keys.length * Math.random()) << 0]];
};

export const getCat = async (imageId: string) =>
  await axios.get(
    `https://api.thecatapi.com/v1/images/${imageId}?api_key=${process.env.API_KEY}`
  );
