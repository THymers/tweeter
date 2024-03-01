/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {
  const timeAgo = timeago.format(tweet.posted);

  const $tweet = $(`
        <article class="tweet">
            <header>
                <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
                <h2 class="name">${tweet.user.name}</h2>
                <span class="handle">${tweet.user.handle}</span>
            </header>
            <div class="content">
                <p>${tweet.content.text}</p>
            </div>
            <footer>
             <span class="timestamp">${timeAgo}</span>
                <div class="icons">
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                </div>
            </footer>
        </article>
    `);

  return $tweet;
}

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweet-container").prepend($tweet);
  }
};

//ajax to listen, prevent, serialize and post
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", submitTweet);
});

const submitTweet = (event) => {
  event.preventDefault();
  const formData = $(event.target).serialize();
  const tweetText = $(event.target)
    .find("textarea[name='tweet_content']")
    .val();

  if (!tweetText || tweetText.trim() === "") {
    alert("No tweet content.");
    return;
  }

  if (tweetText.trim().length > 140) {
    alert("Too many characters.");
    return;
  }

  $.ajax({
    url: "/tweets",
    type: "POST",
    data: formData,
    success: function (response) {
      renderTweets(response);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
};

// AJAX GET request to fetch tweets
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: function (response) {
      renderTweets(response);
    },
    error: function (xhr, status, error) {
      console.error("No tweets:", error);
    },
  });
};

$(document).ready(function () {
  loadTweets();
});
