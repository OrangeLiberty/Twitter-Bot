"use strict";
//Module Import
require("dotenv").config();

//Create a config for the Twit instance
module.exports = {
    consumer_key: process.env.APPKEY,
    consumer_secret: process.env.APPSECRET,
    access_token: process.env.ACCESSTOKEN,
    access_token_secret: process.env.ACCESSSECRET,
    character_limit: 240,
};