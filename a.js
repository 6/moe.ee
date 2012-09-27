var Video = Backbone.Model.extend({});
var Videos = Backbone.Collection.extend({
  model: Video,
  index: 0,

  currentVideoId: function() {
    return this.at(this.index).get('videoId');
  },

  changeVideoIndex: function(offset) {
    var newIndex = this.index + offset;
    if(newIndex < 0) {
      newIndex = this.length - 1;
    }
    else if(newIndex > this.length - 1) {
      newIndex = 0;
    }
    this.index = newIndex;
  },
});

var Player = Backbone.View.extend({
  playCurrentVideo: function() {
    this.el.loadVideoById(this.collection.currentVideoId());
  },

  playNextVideo: function() {
    this.collection.changeVideoIndex(1);
    this.playCurrentVideo();
  },

  onPlayStateChange: function(newState) {
    if(newState === 0) this.playNextVideo();
  },
});

var playerId = "youtube_player";

window.onYouTubePlayerReady = function(playerApiId) {
  var videos = new Videos(_.map(window.videoIds, function(videoId) {
    return new Video({videoId: videoId});
  }));
  var player = document.getElementById(playerId);
  var playerView = new Player({
    el: player,
    collection: videos,
  });
  // TODO - better way to do this?
  window.onPlayStateChange = function(newState) {
    playerView.onPlayStateChange(newState);
  };
  player.addEventListener("onStateChange", "onPlayStateChange");
  playerView.playCurrentVideo();
};

(function() {
  swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&playerapiid=player1&version=3", "yt-replaces-me", "100%", "100%", "9", null, null, {allowScriptAccess: "always", wmode: "opaque"}, {id: playerId});
})();
