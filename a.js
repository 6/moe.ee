var Video = Backbone.Model.extend({});
var Videos = Backbone.Collection.extend({
  model: Video,
  index: 0,

  initialize: function() {
    this.setPlaylist(0);
  },

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

  playlists: function() {
    return _.keys(window.videoIds);
  },

  setPlaylist: function(playlistIndex) {
    if(playlistIndex < 0 || playlistIndex > this.playlists().length - 1) return;
    var newPlaylist = this.playlists()[playlistIndex];
    this.reset();
    this.add(_.map(window.videoIds[newPlaylist], function(videoId) {
      return new Video({videoId: videoId});
    }));
  },
});

var Player = Backbone.View.extend({
  el: 'body',
  events: {
    'keydown': 'onKeyDown',
  },

  initialize: function(options) {
    this.player = options['player'];
  },

  playCurrentVideo: function() {
    this.player.loadVideoById(this.collection.currentVideoId());
  },

  playNextVideo: function() {
    this.collection.changeVideoIndex(1);
    this.playCurrentVideo();
  },

  playPreviousVideo: function() {
    this.collection.changeVideoIndex(-1);
    this.playCurrentVideo();
  },

  playPause: function() {
    if(this.player.getPlayerState() === 1)
      this.player.pauseVideo();
    else
      this.player.playVideo();
  },

  onPlayStateChange: function(newState) {
    if(newState === 0) this.playNextVideo();
  },

  onKeyDown: function(e) {
    switch(e.keyCode) {
      case 37: this.playPreviousVideo(); break;
      case 39: this.playNextVideo(); break;
      case 32: this.playPause(); break;
    }
  },
});

var playerId = "youtube_player";

window.onYouTubePlayerReady = function(playerApiId) {
  var videos = new Videos();
  var player = document.getElementById(playerId);
  var playerView = new Player({
    player: player,
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
