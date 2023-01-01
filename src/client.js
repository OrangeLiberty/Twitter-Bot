//Module Import
require("dotenv").config();

//Create a config for the Twit instance
module.exports = {
  twitterKeys: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    character_limit: 240,
  },
  query: "#bitcoin",
  result_type: "recent",
  lang: "en",
  twitterConfig: {
    language: process.env.TWITTER_LANG,
    username: process.env.TWITTER_USERNAME,
  },
};
