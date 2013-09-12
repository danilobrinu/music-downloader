// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/*function loadMusic() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', './audio.mp3', true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    // Processing response data - xhr.response 
    // Decoding audio data.
    var context = new webkitAudioContext();
    context.decodeAudioData(xhr.response, function onSuccess (buffer) {
      if (! buffer) {
          alert('Error decoding file data.');
          return;
      }
      var source = context.createBufferSource(); // Create SourceNode. 
      source.buffer = buffer; // buffer variable is data of AudioBuffer type from the decodeAudioData() function. 
      source.connect(context.destination); // Connect SourceNode to DestinationNode. 
      source.start(0); // Play sound.
    }, function onError (error) {
        alert('Error decoding file data.');
    });
    
  };
  xhr.onerror = function () {
      // Handling errors
      console.log('error');
  };
  xhr.send();
}*/