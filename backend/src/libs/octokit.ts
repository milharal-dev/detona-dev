import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

// This is the Octokit client, it is used to call the GitHub API. We pass the GITHUB TOKEN here from the environment variables.
export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
