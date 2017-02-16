var $quote = $('#quote-body'),
  $author = $('#quote-author'),
  $left = $('#arrow-left'),
  $right = $('#arrow-right'),
  $twitter = $('#twitter-box'),
  currentQuote, currentAuthor, quoteStorage = [],
  n = 0;

function getQuote() {
  var q = {};
  $.ajax({
    headers: {
      "X-Mashape-Key": "mhD8FS0wFCmsheIDQQnfrKnihcAAp1cRwZ9jsnsyOoyeeMOK1L",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    success: function (response) {
      var r = JSON.parse(response);
      quoteStorage.unshift(r);
      currentQuote = r.quote;
      currentAuthor = r.author;
      $quote.html('"' + r.quote + '"');
      $author.html('- ' + r.author);
    }
  });
};

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function openURL(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

$(document).ready(function () {
  getQuote();
  var n = 2;

  $right.on('click', function () {
    next();
  });

  $left.on('click', function () {
    prev();
  });

  $twitter.on('click', function () {
    if (!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  })
});

function next() {
  if (n > 0) {
    n--;
    post();
  } else {
    getQuote();
  }
}

function prev() {
  n++;
  post();
}

function post() {
  currentQuote = quoteStorage[n].quote;
  currentAuthor = quoteStorage[n].author;
  $quote.html('"' + currentQuote + '"');
  $author.html('- ' + currentAuthor);
}