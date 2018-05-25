"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to mongoDB
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
    },

    // Get all tweets in mongoDB, sorted by newest first
    getTweets: function(callback) {
        let arr = db.collection("tweets").find().toArray(callback);
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    }

  };
};
