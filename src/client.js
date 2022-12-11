"use strict";
//Module Import
require("dotenv").config();

//Create a config for the Twit instance
module.exports = {
    consumer_key: process.env.APPKEY,
    consumer_secret: process.env.APPSECRET,
    access_token: process.env.ACCESSTOKEN,
    access_token_secret: process.env.ACCESSSECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
    character_limit: 240,
};