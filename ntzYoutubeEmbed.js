;(function( $, document ){
  /*
    <div class="item-type-video" data-youtube-id="YOUTUBE-VIDEO-ID"></div>
   */
  if (!Object.create) { Object.create = function (o) { if (arguments.length > 1) { throw new Error('Object.create implementation only accepts the first parameter.'); } function F() {} F.prototype = o; return new F(); }; }

  var youtubeTag = document.createElement('script');
  youtubeTag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(youtubeTag, firstScriptTag);

  var ntzYoutubeEmbed = {
    init: function( el ){
      var $this = this;
      $this.el = $( el );

      this.movieContainerID = 'video-' + Math.round( Math.random() * 1000000 );

      $('<div class="youtube-iframe" />').attr({
        'id': this.movieContainerID
      }).appendTo( $this.el );

      this.createPlayer();

      this.el.on('player-pause', function(){ $this.player.pauseVideo(); });
      this.el.on('player-stop', function(){ $this.player.stopVideo(); });

      this.el.on('player-toggle-state', function(){
        var player = $this.player,
            state = player.getPlayerState();

        if( state == 1 ){
          player.pauseVideo();
        }

        if( state == 2 ){
          player.playVideo();
        }
      });
    } // init


    ,createPlayer: function(){
      var $this = this;

      var playerVars = $.extend({
          enablejsapi   : 1,
          autohide      : 2,
          iv_load_policy: 3,
          modestbranding: true,
          origin        : window.location.origin,
          rel           : 0,
          showinfo      : 0,
          theme         : 'light',
          color         : 'white',
          controls      : 0,
          autoplay      : 0
        }, $this.el.data() );

      this.player = new YT.Player( this.movieContainerID, {
        height    : '100%',
        width     : '100%',
        videoId   : this.el.data('youtube-id'),
        playerVars: playerVars,
        events    : {
          'onReady'      : $.proxy( $this.movieReady, $this ),
          'onStateChange': $.proxy( $this.stateChange, $this )
        }
      });
    }//createPlayer


    ,movieReady: function( player ){
      this.el.data('youtubePlayer', player.target ).trigger( 'player-ready', player );
    }//movieReady


    ,stateChange: function( state ){
      this.el.data('video-state', state).trigger('player-state-change', state);
    }//stateChange
  };


  $.fn.ntzYoutubeEmbed = function() {
    return this.each(function(){
      var obj = Object.create( ntzYoutubeEmbed );
      obj.init( this );
    });
  };
})( jQuery, document );

function onYouTubeIframeAPIReady() { jQuery('.custom-youtube-embed').ntzYoutubeEmbed(); }