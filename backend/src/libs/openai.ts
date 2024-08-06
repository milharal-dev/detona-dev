import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// This is the OpenAI client, it is used to call the API. We pass the API KEY here from the environment variables.
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});
