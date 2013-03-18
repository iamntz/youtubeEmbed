### What is this?
A very light jQuery plugin for easily embed youtube videos. The plugin will auto embed youtube videos for all `.custom-youtube-embed` elements.

#### Very Basic Usage:

```html
<div id="my-embed" class="custom-youtube-embed" style="width:640px;height:360px;" data-youtube-id="PSX2iTnN4hg"></div>
```

#### Parameters

You can basically use every parameters described [here](https://developers.google.com/youtube/player_parameters) as a data attribute:
```html
<div id="my-embed" class="custom-youtube-embed" style="width:640px;height:360px;" 
  data-youtube-id="PSX2iTnN4hg"
  data-autoplay="1"
  data-controls="2"
  data-autohide="0"></div>
```



#### API
```javascript
$('#my-embed').trigger('player-pause'); // OR
$('#my-embed').trigger('player-stop'); // OR
$('#my-embed').trigger('player-toggle-state');
```

#### Events
```javascript
$('#my-embed').on('player-ready', function( e, player ){
  // player.target is the player object
});

$('#my-embed').on('player-state-change', function( e, player ){
  // player.target is the player object
  // player.data contain current state
});

```
