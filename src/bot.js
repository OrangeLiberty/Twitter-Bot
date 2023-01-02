console.log("The Bot is running");
//Module import
require("dotenv").config();
//Twit
const Twit = require("twit");
//Client Config
const client = require("./client");
//node-schedule
// const schedule = require("node-schedule");
//Quotes from Satoshi
const quotes = require("./quotes.json");
//New Twitter Bot
const bot = new Twit(client.twitterKeys);

const express = require("express");

const app = express();

const port = process.env.PORT;

async function postRandomQuote() {
    const params = {
        q: client.query,
        result_type: client.result_type,
        lang: client.lang,
        tweet_mode: "extended",
        count: 5,
    };

    bot.get("search/tweets", params, (err, data, res) => {
        if (!err) {
            console.log(`Data: ${data}`);
            console.log(`Response: ${res}`);

            //Get a random quote
            var quote = quotes[Math.floor(Math.random() * quotes.length)];

            //Get date
            var quoteDate = quote.date + "\n" + "#bitcoin";

            //replace the satoshi-whitespace-oddness
            var cleanQuote = cleanFunction(quote);

            //Cut the quote to fit
            var shortedQuote = shortFunction(cleanQuote);

            //Match the quote and the quotedate
            var quoteRdy = shortedQuote + quoteDate;

            //Post to twitter
            postQuote(quoteRdy);
        } else {
            console.log(`ERROR: ${err}`);
        }
    });
}
//Clean whitespace
function cleanFunction(quote) {
    return quote.text.replace(/  /g, " ");
}

//Cut the quote to fit post
function shortFunction(quote) {
    if (quote.length < client.twitterKeys.character_limit) {
        return quote + "\n" + "Satoshi Nakamoto, ";
    }

    var shortQuote = quote;
    var quoteSentence = quote.match(/[^\.!\?]+[\.!\?]+/g);
    //console.log(quoteSentence);

    if (quoteSentence) {
        var index = quoteSentence.length;
        while (index--) {
            if (quoteSentence.join("").length > client.twitterKeys.character_limit) {
                quoteSentence.splice(index, 1);
            }
            shortQuote = quoteSentence.join("");
        }
    }

    if (
        shortQuote.length > client.twitterKeys.character_limit ||
        shortQuote === ""
    ) {
        return (
            quote.substring(0, client.twitterKeys.character_limit) +
            "..." +
            "\n" +
            "Satoshi Nakamoto, "
        );
    }

    return shortQuote + "\n" + "Satoshi Nakamoto, ";
}

//Post the quote to twitter
async function postQuote(quote) {
    try {
        bot.post(
            "statuses/update", { status: quote },
            function(err, data, response) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    console.log("SUCCESS: Quote sent");
                }
            }
        );
    } catch (error) {
        console.log(error);
        console.log("FAILED");
    }
}

app.get("/", (req, res) => {
    console.log("Just a request");
    res.location(`https: //twitter.com/${client.twitterConfig.username}`);
    res.end();
});

postRandomQuote();
setInterval(postRandomQuote, 5400000);

// Use cron-job to schedule tweet
// const rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = [0, new schedule.Range(6, 21, 3)];
// rule.minute = 0;

// schedule.scheduleJob(rule, () => {
//     console.log("Cron Job runs successfully");
//     postRandomQuote();
// });

app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});