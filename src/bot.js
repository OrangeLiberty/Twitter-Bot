"use strict";
console.log("The Bot is running");

//Module import
//Twit
const Twit = require("twit");
//Client Config
const client = require("./client");

//Quotes from Satoshi
const quotes = require("./quotes.json");
//New Twitter Bot
const bot = new Twit(client);

function postRandomQuote() {
    //Get a random quote
    var quote = quotes[Math.floor(Math.random() * quotes.length)];

    //Get date
    var quoteDate = quote.date;

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
            }
        }
    );
}

module.exports = postRandomQuote;