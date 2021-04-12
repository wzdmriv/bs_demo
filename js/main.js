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
  $('#start_modalBg').click(function(){
    $('#start_modalArea').fadeOut();
  });
  $('#startcalib_modalBg').click(function(){
    $('#startcalib_modalArea').fadeOut();
  });
});

function close_startmodal(){
  var noSleep = new NoSleep();
  noSleep.enable();
  $('#start_modalArea').fadeOut();
  startNotify();
}

function open_calib(){
  $('#navArea').removeClass( "open" );
  document.getElementById("startcalib_Content").innerHTML = "Please take a deep breath for 10 sec";
  $('#startcalib_modalArea').fadeIn();
}

function start_calib(){
  calib_flag = 1;
  var calib = function(){
    calib_flag = 0;
    const aryMax = function (a, b) {return Math.max(a, b);}
    const aryMin = function (a, b) {return Math.min(a, b);}
    if (sens_value_calib.length === 0){
      document.getElementById("startcalib_Content").innerHTML = "Error!";
    }else{
      max_sens = sens_value_calib.reduce(aryMax);
      min_sens = sens_value_calib.reduce(aryMin);
      sens_value_calib = []
      $('#startcalib_modalArea').fadeOut();
    }
  };
  setTimeout(calib, 10000);
  document.getElementById("startcalib_Content").innerHTML = "Calibrating…";
}

function layout(){
  var ww = window.innerWidth;
  var hh = window.innerHeight;
  var data_size = parseInt(Math.min(ww,hh)*0.3);
  var circle_size = parseInt(Math.min(ww,hh)*0.8);
  $('#data_text').css({'font-size':data_size+'px'});
  $('#data_circle').css({'width':circle_size+'px','height':circle_size+'px'});
}