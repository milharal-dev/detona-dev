import Twit from "twit";
import dotenv from "dotenv";

dotenv.config();

// This is the Twitter client, it is used to call the Twitter API. We pass the keys here from the environment variables.
export const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token: process.env.TWITTER_ACCESS_TOKEN as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});
