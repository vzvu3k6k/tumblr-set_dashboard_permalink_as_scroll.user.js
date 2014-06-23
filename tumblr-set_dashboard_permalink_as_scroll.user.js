// ==UserScript==
// @name           Tumblr: Set dashboard permalink as scroll
// @description    Sets dashboard permalink to location bar as you scroll
// @version        1.0
// @author         vzvu3k6k
// @match          https://www.tumblr.com/dashboard*
// @namespace      http://vzvu3k6k.tk/
// @license        CC0
// ==/UserScript==

location.href = 'javascript:(' + function(){
  function replaceState(){
    /* `Tumblr.fastDashboard.attached` has post nodes in and around visible area. */
    var posts = Tumblr.fastDashboard.attached;

    var visiblePosts = _.chain(posts).select(function(i){
      /* Check if the post is not `display: none` (for filtering userscript users) */
      return i.offsetParent;
    });

    var nearestPost = visiblePosts.min(function(i){
      var post = i.querySelector('.post');
      if(post){
        return Math.abs(post.getBoundingClientRect().top);
      }else{
        return Infinity;
      }
    }).value();

    if(nearestPost){
      var postID = nearestPost.querySelector('.post').dataset.postId;
      history.replaceState(null, null, '/dashboard/100/' + (+postID + 1));
    }else{
      history.replaceState(null, null, '/dashboard/');
    }
  }

  /* j/k animated scroll takes `Tumblr.KeyCommands.scroll_speed` milliseconds */
  var delay = ((window.Tumblr && Tumblr.KeyCommands && Tumblr.KeyCommands.scroll_speed) + 10) || 110;
  document.addEventListener('scroll', _.debounce(replaceState, delay));
} + ')()';
