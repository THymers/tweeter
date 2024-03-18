/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const createTweetElement = function (tweet) {
    const timeAgo = timeago.format(tweet.created_at);

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(`
    <article class="tweet-container">
    <header>
    <div class = "avatar-username">
    <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
    <h3 class="name">${tweet.user.name}</h3>
    </div>
    <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="content">
     <p>${escape(tweet.content.text)}</p>
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
  };

  const renderTweets = function (tweets) {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  $("#tweet-error-message").hide();
  function showAlert(message) {
    const errorMessage = $("#tweet-error-message");
    errorMessage.text(message);
    errorMessage.slideDown();
  }

  $("#tweet-text").keyup(function () {
    $("#tweet-error-message").slideUp();
  });

  $("form").submit(function (event) {
    event.preventDefault();
    const formData = $("form").serialize();
    console.log(formData);
    const tweetText = $("#tweet-text").val();

    if (!tweetText || tweetText.trim() === "") {
      showAlert("No tweet content.");
      return;
    }

    if (tweetText.trim().length > 140) {
      showAlert("Too many characters.");
      return;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
    })
      .then(loadTweets)
      .catch((error) => {
        console.log("Error: ", error);
      });
  });

  // AJAX GET request to fetch tweets
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (response) {
        renderTweets(response);
      },
    });
  };

  loadTweets();
});
