import { Request, Response, Router } from "express";
import { octokit } from "../libs/octokit.js";
import { openai } from "../libs/openai.js";

const roasterRouter = Router();

async function getAllReadmes(repoNames: string[], username: string) {
  const repoReadmes: any[] = [];

  for (const repoName of repoNames) {
    console.log(`INFO: Processing ${repoName}`);
    await octokit
      .request(`GET /repos/${username}/${repoName}/readme`, {
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

roasterRouter.post("/generate-roaster", async (req: Request, res: Response) => {
  // Through this client we get the repos from the user, it is generically typed, so we can at least see what there is... kinda.
  console.log("INFO: Fetching GitHub repositories...");
  const repos = await octokit.repos
    .listForUser({
      username: req.body.username,
      sort: "updated",
      per_page: 5,
    })
    .then((res) => res.data);

  console.log("INFO: Mapping repo names...");
  const repoNames = repos.map((repo) => repo.name);
  console.log("INFO - repoNames:", repoNames);

  // We now need to get the content from these repos.
  const repoReadmes = await getAllReadmes(repoNames, req.body.username).then(
    (res) => res
  );

  // This is where the magic happens, AI call! GPT-4o-mini is the best model for this, 128k tokens context, affordable price, and it is a lot faster than GPT-3.5-turbo or davinci.
  console.log("INFO: Now generating roast with AI...");
  const openApiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.5,
    messages: [
      {
        role: "user",
        content: `Você agora é um programador sênior com um senso de humor cínico. Caso você leia readmes que pareçam gerados de forma padrão por frameworks, faça uma crítica sobre isto também. Você deve fazer uma crítica sarcástica a nível stand-up cômico, detonando de forma humorística a reputação de ${
          req.body.username
        }. Use as informações do JSON a seguir para embasar suas piadas:

      ${JSON.stringify(repoReadmes, null, 2)}`,
      },
    ],
  });

  // We just return the content of the first choice, which is the most likely to be the best one.

  res.send({
    username: req.body.username,
    content: openApiResponse.choices[0].message.content,
  });
});

export default roasterRouter;
