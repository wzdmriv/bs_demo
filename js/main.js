$(function($) {
    var $nav   = $('#navArea');
    var $btn   = $('.toggle_btn');
    var $mask  = $('#mask');
    var open   = 'open'; // class
    // menu open close
    $btn.on( 'click', function() {
      if ( ! $nav.hasClass( open ) ) {
        $nav.addClass( open );
      } else {
        $nav.removeClass( open );
      }
    });
    // mask close
    $mask.on('click', function() {
      $nav.removeClass( open );
    });
});

$(function () {
  $('#modalBg').click(function(){
    $('#start_modalArea').fadeOut();
  });
});

function close_startmodal(){
  var noSleep = new NoSleep();
  noSleep.enable();
  $('#start_modalArea').fadeOut();
}

function layout(){
  var ww = window.innerWidth;
  var hh = window.innerHeight;
  var data_size = parseInt(Math.min(ww,hh)*0.3);
  $('#data_text').css({'font-size':data_size+'px'});
}