$(function($) {
    var $nav   = $('#navArea');
    var $btn   = $('.toggle_btn');
    var $mask  = $('#mask');
    var open   = 'open';

    $btn.on( 'click', function() {
      if ( ! $nav.hasClass( open ) ) {
        $nav.addClass( open );
      } else {
        $nav.removeClass( open );
      }
    });

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
  $('#rec_modalBg').click(function(){
    $('#rec_modalArea').fadeOut();
  });
  $("#rec_button").on('click',function(){startRec();});
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
  sens_value_calib = []
  calib_flag = 1;
  document.getElementById("startcalib_button").value = "Restart";
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

function openRec(){
  $('#rec_modalArea').fadeIn();
}

function startRec(){
  console.log("rec_start")
  rec_time = [];
  rec_value = [];
  rec_flag = 1;
  $("#rec_button").off();
  $("#rec_button").click(function(){stopRec();});
  document.getElementById("rec_Content").innerHTML = "Stop Rec";
  $('#rec_modalArea').fadeOut();
}

function stopRec(){
  console.log("rec_stop")
  rec_flag = 0;
  $("#rec_button").off();
  $("#rec_button").click(function(){startRec();});
  document.getElementById("rec_Content").innerHTML = "Start Rec";
  $('#rec_modalArea').fadeOut();
}

function downloadCSV() {
  console.log(rec_time)
  console.log(rec_value)
  if (!rec_time.length===rec_value.length || rec_time.length===0){
    alert("data error!")
  }else{
    const filename = "data.csv";
    var data = "time, data\n";
    var rec_temp = [];
    for (let i=0; i<rec_time.length; i++){
      rec_temp.push(String(rec_time[i])+","+String(rec_value[i]));
    }
    data = data + rec_temp.join("\n");
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, data], { type: "text/csv" });
  
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        const download = document.createElement("a");
        download.href = url;
        download.download = filename;
        download.click();
        (window.URL || window.webkitURL).revokeObjectURL(url);
    }
  }

}

function layout(){
  var ww = window.innerWidth;
  var hh = window.innerHeight;
  var data_size = parseInt(Math.min(ww,hh)*0.3);
  var circle_size = parseInt(Math.min(ww,hh)*0.8);
  $('#data_text').css({'font-size':data_size+'px'});
  $('#data_circle').css({'width':circle_size+'px','height':circle_size+'px'});
}