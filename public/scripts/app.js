function renderTweets(tweets) {
  if (tweets instanceof Array) {
    tweets.forEach(function(user) {
    let $data = createTweetElement(user);
    $('.container').prepend($data).prepend($('.new-tweet'));
  });
  } else {
    let $data = createTweetElement(tweets);
    $('.container').prepend($data).prepend($('.new-tweet'));
  }
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function tweetDate (date) {
  const today = new Date();
  const dateMili = new Date(date);
  const timeDiff = Math.abs(dateMili.getTime() - today.getTime());
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  //checks if time is greater than one day
  if (timeDiff >= 86400000) {
    let result = `${daysDiff} days ago`;
    return result;
  //checks if time is less than a day and greater than or equal to one hour
  } else if (timeDiff >= 3600000 && timeDiff < 86400000) {
    let result = Math.floor(timeDiff/ (1000 * 60 * 60));
    return `${result} hours ago`;
  //checks if time is less than one hour and greater than or equal to one minute
  } else if (timeDiff >= 60000 && timeDiff < 3600000){
    let result = Math.floor(timeDiff / (1000 * 60));
    return `${result} minutes ago`;
  //checks if time is less than one minute
  } else if (timeDiff >= 0 && timeDiff < 60000) {
    let result = Math.floor(timeDiff/ 1000);
    return `${result} seconds ago`;
  }
}

function createTweetElement(tweet) {
  let $tweet = $('<section>').addClass('tweet-container');
  $($tweet).append(`<h2 class="user-name">${tweet.user.name}</h2>`);
  $($tweet).append(`<image id="profile-picture" src=${tweet.user.avatars.small} />`);
  $($tweet).append(`<span class="user-handle">${tweet.user.handle}</span>`);
  $($tweet).append(`<span class="tweet">${escape(tweet.content.text)}</span>`);
  $($tweet).append(`<p class="horizontal-line"></p>`);
  $($tweet).append(`<span class="age">${tweetDate(tweet.created_at)}</span>`);
  $($tweet).append(`<i id="like" class="fa fa-heart"></i>`);
  $($tweet).append(`<i id="retweet" class="fa fa-retweet"></i>`);
  $($tweet).append(`<i id="flag" class="fa fa-flag"></i>`);

  return $tweet;
}

//turns form data from submitted tweet into a query string
//and prevents page change when tweet is submitted
$(document).ready(function() {
  $( "#form" ).on( "submit", function( event ) {
    let tweet = $(".text").val();
    if (tweet === "" || tweet === null) {
        alert('you did not enter a tweet');
        event.preventDefault();
      } else if (tweet.length > 140) {
        alert('your tweet must under 140 characters');
        event.preventDefault();
    } else {
      event.preventDefault();
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).serialize(),
        success: function(tweets) {
          loadTweets();
          $('textarea').val('');
          return;
        }
      });
    }
  });

  $(".compose").click(function(){
      if ($('.new-tweet').is(":hidden")) {
        $(".new-tweet").slideToggle(200,'linear');
        $('.text').focus();
      }
      else {
        $(".new-tweet").slideToggle(200,'linear');
      }
  });

   function loadTweets() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function(tweets) {
          renderTweets(tweets);

        }
      });
    }
    loadTweets();
});