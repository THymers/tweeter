/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetInfo = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

function createTweetElement(tweet) {
  // Creating elements using jQuery
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
    $("#tweets-container").prepend($tweet);
  }
};
