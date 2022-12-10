"use strict";
const express = require("express");
//CronJob
const CronJob = require("cron").CronJob;

const bot = require("./src/bot");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
});

const job = new CronJob("0 8,12,16,20 * * 0-6", () => {
    bot.postRandomQuote();
});

job.start();