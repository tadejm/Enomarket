$(document).ready(function() {
  var nav = location.pathname.substr(1).split('/', 2)[0] || '/';
  if (nav)
    $('ul#navigation > li > a[href$="' + nav + '"]').parent().addClass('active');

  $('div#ponudba > div > h3').click(function() {
    if ($.browser.msie)
      $("ul#" + this.nextSibling.id).toggle();
    else
      $("ul#" + this.nextElementSibling.id).toggle();

    $(this.parentNode).toggleClass('active');
  });

  var images = $('div.slike').length;
  if (images) {
    $('div.slike > img').click(function() {
      $('div.velika-slika > img')[0].src = this.src.replace('thumbs', 'full');
      location.href = '#slike';
    });
  };
});

// tumblrBadge by Robert Nyman, http://www.robertnyman.com/, http://code.google.com/p/tumblrbadge/
var tumblrBadge = function () {
  // User settings
  var settings = {
    userName : "enomarket", // Your Tumblr user name
    itemsToShow : 10, // Number of Tumblr posts to retrieve
    itemToAddBadgeTo : "news", // Id of HTML element to put badge code into
    imageSize : 100, // Values can be 75, 100, 250, 400 or 500
    shortPublishDate : true, // Whether the publishing date should be cut shorter
    timeToWait : 2000 // Milliseconds, 1000 = 1 second
  };
  
  // Badge functionality
  var head = document.getElementsByTagName("head")[0];
  var badgeContainer = document.getElementById(settings.itemToAddBadgeTo);
  if (head && badgeContainer) {
    var badgeJSON = document.createElement("script");
    badgeJSON.type = "text/javascript";
    badgeJSON.src = "http://" + settings.userName + ".tumblr.com/api/read/json?callback=tumblrBadge.listItems&num=" + settings.itemsToShow;
    head.appendChild(badgeJSON);
    
    var wait = setTimeout(function () {
      badgeJSON.onload = null;
      badgeJSON.parentNode.removeChild(badgeJSON);
      badgeJSON = null;
    }, settings.timeToWait);
    
    listItems = function (json) {
      var posts = json.posts,
        list = document.createElement("div"), 
        post,
        listItem,
        title,
        text,
        link,
        img,
        conversation,
        postLink;
      list.className = "tumblr_news";
      for (var i=0, il=posts.length; i<il; i=i+1) {
        post = posts[i];
        if (/<!--[if !supportLists]-->/) {};
        // Only get content for text, photo, quote and link posts
        if (/regular|photo|quote|link|conversation/.test(post.type)) {
          listItem = document.createElement("div");
          title = document.createElement("h2");
          title.innerHTML = post["regular-title"];
          listItem.appendChild(title);

          publishedDate = document.createElement("p");
          publishedDate.className = "tumblr-post-date";
          publishedDate.innerHTML = (settings.shortPublishDate)? post["date"].replace(/(^\w{3},\s)|(:\d{2}$)/g, "") : post["date"];
          listItem.appendChild(publishedDate);

          text = post["regular-body"] || post["photo-caption"] || post["quote-source"] || post["link-text"] || post["link-url"] || "";
          text = text.replace(/<\!--\[if \!supportLists\]-->/mg, "");
          text = text.replace(/<\!--\[endif\]-->/mg, "");
          
          if (post.type === "photo") {
            link = document.createElement("a");
            link.href = post.url;
            img = document.createElement("img");

            // To avoid a creeping page
            img.width = settings.imageSize;
            img.src = post["photo-url-" + settings.imageSize];
            link.appendChild(img);
            listItem.appendChild(link);
            text = "<em>" + text + "</em>";
          }
          else if (post.type === "quote") {
            text = post["quote-text"] + "<em>" + text + "</em>";
          }
          else if (post.type === "link") {
            text = '<a href="' + post["link-url"] + '">' + text + '</a>';
          }
          
          else if (post.type === "conversation") {
            conversation = post["conversation-lines"];
            for (var j=0, jl=conversation.length; j<jl; j=j+1) {
              text += conversation[j].label + " " + conversation[j].phrase + ((j === (jl -1))? "" : "<br>");
            }
          }
          listItem.innerHTML += text;
          
          // Create a link to Tumblr post
          // postLink = document.createElement("a");
          // postLink.className = "tumblr-post-date";
          // postLink.href = post.url;
          // postLink.innerHTML = (settings.shortPublishDate)? post["date"].replace(/(^\w{3},\s)|(:\d{2}$)/g, "") : post["date"];
          // listItem.appendChild(postLink);

          // Apply list item to list
          list.appendChild(listItem);
        }
      }
      
      // Apply list to container element
      badgeContainer.innerHTML = "";
      badgeContainer.appendChild(list);
    };
    
    return {
      listItems : listItems
    };
  }
}();