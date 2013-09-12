var app = (function() {
 /** 
    * global vars
    */
  var _request, 
      _context, 
      _source, 
      _buffer, 
      _gainNode;
 /** 
    * methods
    */
  var _init, 
      _load,
      _change,
      _play, 
      _pause, 
      _stop, 
      _volume,
      _duration,
      _currentTime; 
  
  _init = function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    _context = new AudioContext();
    _source = null;
    /* Create gain and panner nodes. */
    if (!_context.createGain) {
      _context.gainNode = _context.createGainNode();
    }
    _gainNode = _context.createGain(); // createGain()
  };

  _load = function(url) {
    /** 
      * methods
      */
    var requestLoad, 
        requestError, 
        requestDecodeSuccess, 
        requestDecodeError,
        duration,
        isLoaded = (_buffer) ? true : false; // (var != null) => (var)

    requestLoad = function() {
      _context.decodeAudioData(_request.response, 
                                requestDecodeSuccess, 
                                requestDecodeError);
    };

    requestError = function() {
      console.log('XMLHttpRequest Error');
    };

    requestDecodeSuccess = function(buffer) {
      if ( !buffer) {
          console.log('Error decoding file data.');
          return;
      }

      _source = _context.createBufferSource(); /* Create SourceNode. */
      _buffer = buffer; /* buffer variable is data of AudioBuffer type from the decodeAudioData() function. */
      _source.buffer = _buffer; /* buffer variable is data of AudioBuffer type from the decodeAudioData() function. */
      _source.connect(_gainNode); /* connect SourceNode with GainNodeSource */
      _gainNode.connect(_context.destination); /* connect GainNodeSource with ContextDestination */
      _source.start(0);
    };

    requestDecodeError = function() {
      console.log('Error decoding file data.');
    };

    if (!isLoaded)
    {
      /** 
      * load code
      */
      _request = new XMLHttpRequest(); /* instance XHR */
      _request.open('GET', url, true); /* GET */
      _request.responseType = 'arraybuffer'; /* declare response type to GET */
      _request.onload = requestLoad; /* set function onload */
      _request.onerror = requestError; /* set function onerror */
      _request.send(); /* request send */
    }
  };

  _change = function(url) {
    _stop();
    _buffer = null;
    _load(url); 
  };

  _play = function() {
     /* Check whether any sound is being played. */
    if (_source && _source.playbackState === _source.PLAYING_STATE) {
        _source.noteOff(0); // stop()
        _source = null; /* initialize */
    }

    _source = _context.createBufferSource(); /* Create SourceNode. */
    _source.buffer = _buffer; /* buffer variable is data of AudioBuffer type from the decodeAudioData() function. */
    _source.connect(_context.destination); /* Connect SourceNode to DestinationNode. */
    _source.start(0); /* Play sound. */
  };

  _pause = _stop = function() {
    if (_buffer){
      _source.stop(0); /* Play sound. */
    }
  };

  _volume = function(value) {
    _source.connect(_gainNode);
    _gainNode.connect(_context.destination);
    _gainNode.gain.value = value;
  };

  _duration =  function() {
    return _buffer.duration;
  };

  _currentTime = function() {
    return _context.currentTime;
  };

  return {
    init: _init,
    load: _load,
    change: _change,
    play: _play,
    pause: _pause,
    stop: _stop,
    volume: _volume,
    duration: _duration,
    currentTime: _currentTime
  }
}());

// init app
window.onload = app.init;
// handlers
var btnLoad = document.getElementById('btnLoad'),
    btnPlay = document.getElementById('btnPlay'),
    btnPause = document.getElementById('btnPause'),
    btnChange = document.getElementById('btnChange'),
    volume = document.getElementById('volume'),
    duration = document.getElementById('duration'),
    currentTime = document.getElementById('currentTime');

var time;
btnLoad.onclick = function() { 
  app.load('./audio.mp3');
  time = setInterval(function() {
    currentTime.value = parseFloat(app.currentTime() / 60).toFixed(2);
  }, 100);
}; 
btnPlay.onclick = app.play;
btnPause.onclick = function() {
  app.pause();
  clearInterval(time);
};
volume.onchange = function() {
  app.volume(this.value);
};
duration.onclick = function() {
  this.value = parseFloat(app.duration() / 60).toFixed(2);
};
currentTime.onclick = function() {
  this.value = app.currentTime();
};
btnChange.onclick = function() {
  app.change('./audio2.mp3');
};