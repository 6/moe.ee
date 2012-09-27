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
    this.collection.on('add', this.playCurrentVideo, this);
    this.collection.setPlaylist(0);
  },

  playCurrentVideo: function() {
    this.player.clearVideo();
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
    var oneKeyCode = 49;
    if(e.keyCode <= oneKeyCode + 8 && oneKeyCode >= oneKeyCode) {
      this.collection.setPlaylist(e.keyCode - oneKeyCode);
    }
  },
});

window.onYouTubeIframeAPIReady = function() {
  var player;
  var videos = new Videos();

  onPlayerReady = function() {
    var playerView = new Player({
      player: player,
      collection: videos,
    });
    // TODO - better way to do this?
    window.onPlayStateChange = function(newState) {
      playerView.onPlayStateChange(newState);
    };
    player.addEventListener("onStateChange", "onPlayStateChange");
  };

  player = new YT.Player("yt-replaces-me", {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 0,
      showinfo: 0 ,
      modestbranding: 1,
      wmode: "opaque",
    },
    events: {
      'onReady': onPlayerReady,
    },
  });
}
