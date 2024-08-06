console.log("INFO: Starting the app...");

console.log("INFO: Instantiating the OpenAI client...");
import { openai } from "./libs/openai.js";
// console.log("INFO: Instantiating the Twit client...");
// import { twitterClient } from "./libs/twit.js";
console.log("INFO: Instantiating the Octokit client...");
import { octokit } from "./libs/octokit.js";

// Made this function that does basically everything in a simple way to get all the tweets we need, the repos, and just work with the repo names for now until we figure out how to get the code from the repo
async function generateRoast(
  // twitterHandle: string,
  githubHandle: string
): Promise<string | null> {
  console.log("INFO: Starting roast generation function...");

  // ⚠️ - (OUTDATED AND UNUSABLE) Through this client we get the tweets from the user, sadly no typings for this so we have to use any and read the lib's code to figure out what we need and how to get it
  // console.log("INFO: Fetching tweets...");
  // const tweets: any = await twitterClient
  //   .get("users/:id/tweets", {
  //     screen_name: twitterHandle,
  //     count: 50,
  //   })
  //   .then((res) => res.data);

  // Through this client we get the repos from the user, it is generically typed, so we can at least see what there is... kinda.
  console.log("INFO: Fetching GitHub repositories...");
  const repos = await octokit.repos
    .listForUser({
      username: githubHandle,
      sort: "updated",
      per_page: 5,
    })
    .then((res) => res.data);

  console.log("INFO: Mapping repo names...");
  const repoNames = repos.map((repo) => repo.name);
  console.log("INFO - repoNames:", repoNames);

  // We now need to get the content from these repos.
  const repoReadmes = await getAllReadmes(repoNames).then((res) => res);

  async function getAllReadmes(repoNames: string[]) {
    const repoReadmes: any[] = [];

    for (const repoName of repoNames) {
      console.log(`INFO: Processing ${repoName}`);
      await octokit
        .request(`GET /repos/${githubHandle}/${repoName}/readme`, {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
          },
        })
        .then(async (res) => {
          const data = res.data;

          const fileType = data.type;
          const fileContent = data.content;

          const byteCharacters = atob(fileContent);

          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);

          const blob = new Blob([byteArray], { type: fileType });

          const readmeContent = await blob.text().then((res) => res);

          repoReadmes.push({
            repo: repoName,
            readme: readmeContent,
          });
        })
        .catch((err) => {
          if (err.status === 404) {
            console.warn(`WARN: No README found for repository ${repoName}`);
          } else {
            console.error(
              `ERROR: Failed to fetch README for repository ${repoName}`
            );
          }
        });
    }

    return repoReadmes;
  }

  // ⚠️ - (OUTDATED AND UNUSABLE) Very shit way to list the tweets, but it works for now.
  // console.log("INFO: Mapping tweets...");
  // const tweetTexts = tweets.map((tweet: any) => tweet.text).join("\n");

  // This is where the magic happens, AI call! GPT-4o-mini is the best model for this, 128k tokens context, affordable price, and it is a lot faster than GPT-3.5-turbo or davinci.
  console.log("INFO: Now generating roast with AI...");
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.5,
    messages: [
      {
        role: "user",
        content: `Você agora é um programador sênior com um senso de humor cínico. Você deve fazer uma crítica sarcástica a nível stand-up cômico, detonando de forma humorística a reputação de ${githubHandle}. Use as informações do JSON a seguir para embasar suas piadas:

      ${JSON.stringify(repoReadmes, null, 2)}`,
      },
    ],
  });

  // We just return the content of the first choice, which is the most likely to be the best one.
  return response.choices[0].message.content;
}

// This is the main function that will be called when the app is started with yarn start, or your favorite package manager. (could be bun if you're insane)
async function main() {
  // ⚠️ - (OUTDATED AND UNUSABLE) This is just an example, you can change it to your own twitter handle.
  // const twitterHandle = "amasterofart";

  // This is just an example, you can change it to your own github handle.
  const githubHandle = "VictorTaelin";

  // This is the main function that does everything, it is async so we can await the result.
  console.log("INFO: Calling the generateRoast function...");
  const roast = await generateRoast(githubHandle);

  // This is the roast, we just log it to the console for now.
  console.log(roast);
}

// Entrypoint.
main().catch(console.error);
