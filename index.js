"use strict";
require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.PORT;

const bot = require("./src/bot");

const tweetInterval = 3 * 60 * 60 * 1000;

app.all("/", (req, res) => {
    console.log("Just a request");
    res.send("placeholder");
});

bot.postRandomQuote();

setInterval(bot.postRandomQuote, tweetInterval);

app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});