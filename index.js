"use strict";

const bot = require("./src/bot");

const tweetInterval = 3 * 60 * 60 * 1000;

bot.postRandomQuote();

setInterval(bot.postRandomQuote, tweetInterval);