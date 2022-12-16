console.log("The Bot is running");
//Module import
require("dotenv").config();
//Twit
const Twit = require("twit");
//Client Config
const client = require("./client");
//node-schedule
const schedule = require("node-schedule");
//Quotes from Satoshi
const quotes = require("./quotes.json");
//New Twitter Bot
const bot = new Twit(client);

const express = require("express");

const app = express();

const port = process.env.PORT;

function postRandomQuote() {
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
}
//Clean whitespace
function cleanFunction(quote) {
    return quote.text.replace(/  /g, " ");
}

//Cut the quote to fit post
function shortFunction(quote) {
    if (quote.length < client.character_limit) {
        return quote + "\n" + "Satoshi Nakamoto, ";
    }

    var shortQuote = quote;
    var quoteSentence = quote.match(/[^\.!\?]+[\.!\?]+/g);
    //console.log(quoteSentence);

    if (quoteSentence) {
        var index = quoteSentence.length;
        while (index--) {
            if (quoteSentence.join("").length > client.character_limit) {
                quoteSentence.splice(index, 1);
            }
            shortQuote = quoteSentence.join("");
        }
    }

    if (shortQuote.length > client.character_limit || shortQuote === "") {
        return (
            quote.substring(0, client.character_limit) +
            "..." +
            "\n" +
            "Satoshi Nakamoto, "
        );
    }

    return shortQuote + "\n" + "Satoshi Nakamoto, ";
}

//Post the quote to twitter
function postQuote(quote) {
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
}

app.get("/", (req, res) => {
    console.log("Just a request");
    res.send("https: //twitter.com/satoshisquote");
});

postRandomQuote();

// Use cron-job to schedule tweet
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = [0, new schedule.Range(6, 21, 3)];
rule.minute = 0;

schedule.scheduleJob(rule, () => {
    console.log("Cron Job runs successfully");
    postRandomQuote();
});

app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});