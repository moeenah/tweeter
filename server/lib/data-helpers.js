"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(dbArray, mongoDB) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        mongoDB.collection("tweets").insertOne(newTweet);
        callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, dbArray.sort(sortNewestFirst));
    }

  };
}
