"use strict";
//CronJob
const CronJob = require("cron").CronJob;

var bot = require("./src/bot");

const job = new CronJob("0 8,12,16,20 * * 1-7", () => {
    bot.postRandomQuote();
});

job.start();