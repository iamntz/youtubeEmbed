(function($, document) {
  /*
    <div class="item-type-video" data-youtube-id="YOUTUBE-VIDEO-ID"></div>
   */

  var youtubeTag = document.createElement('script');
  youtubeTag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(youtubeTag, firstScriptTag);

  var ntzYoutubeEmbed = {
    init: function(el) {
      this.el = $(el);

      var ytTimer = window.setInterval(() => {
        if(typeof YT == 'object' && typeof YT.Player == 'function') {
          window.clearInterval(ytTimer);
          this.YTApiReady();
        }
      }, 10);
    },


    YTApiReady: function() {
      this.movieContainerID = 'video-' + Math.round(Math.random() * 1000000);

      $('<div class="youtube-iframe" />').attr({
        'id': this.movieContainerID
      }).appendTo(this.el);

      this.createPlayer();

      this.el.on('player-pause', () => {
        this.player.pauseVideo();
      });

      this.el.on('player-stop', () => {
        this.player.seekTo(0);
        this.player.stopVideo();
      });

      this.el.on('player-play', () => {
        this.player.playVideo();
      });

      this.el.on('player-toggle-state', () => {
        let state = this.player.getPlayerState();

        if(state == YT.PlayerState.PLAYING) {
          this.player.pauseVideo();
        }

        if(state == YT.PlayerState.PAUSED) {
          this.player.playVideo();
        }
      });
    },

    createPlayer: function() {
      var playerVars = $.extend({
        enablejsapi: 1,
        autohide: 2,
        iv_load_policy: 3,
        modestbranding: true,
        origin: window.location.origin,
        rel: 0,
        showinfo: 0,
        theme: 'light',
        color: 'white',
        controls: 0,
        autoplay: 0,
        volume: 100,
        loop: 0,
        poster: ""
      }, this.el.data());

      this.playerVars = playerVars;

      if(playerVars.poster) {
        var poster = $('<img class="player-poster" />').attr('src', playerVars.poster);
        poster.appendTo(this.el);
        this.el.addClass('player-has-poster');
        poster.on('click', function() {
          $(this).addClass('is-playing');
          this.el.trigger('player-play');
        });
      }

      this.player = new YT.Player(this.movieContainerID, {
        height: '100%',
        width: '100%',
        volume: 0,
        videoId: this.el.data('youtube-id'),
        playerVars: playerVars,
        events: {
          'onReady': $.proxy(this.movieReady, this),
          'onStateChange': $.proxy(this.stateChange, this)
        }
      });
    },


    movieReady: function(player) {
      player.target.setVolume(this.playerVars.volume);
      this.el.data('youtubePlayer', player.target).trigger('player-ready', player);
    },


    stateChange: function(state) {
      if (this.playerVars.loop && state.data === YT.PlayerState.ENDED) {
        this.player.playVideo();
      }
      this.el.data('video-state', state).trigger('player-state-change', state);
    } //stateChange
  };


  $.fn.ntzYoutubeEmbed = function() {
    return this.each(function() {
      var obj = Object.create(ntzYoutubeEmbed);
      obj.init(this);
    });
  };
})(jQuery, document);
