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

function countup() {
	timer_count++;
	document.getElementById("timer").innerHTML = "Time:"+timer_count;
}

function close_startmodal(){
  var noSleep = new NoSleep();
  noSleep.enable();
  $('#start_modalArea').fadeOut();
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
      data_chart=data_init(now_time());
      console.log(data_chart)
      $('#startcalib_modalArea').fadeOut();
    }
  };
  setTimeout(calib, 10000);
  document.getElementById("startcalib_Content").innerHTML = "Calibratingâ€¦";
}

function openRec(){
  $('#rec_modalArea').fadeIn();
}

function startRec(){
  console.log("rec_start")
  rec_time = [];
  rec_time_jst = [];
  rec_ac_value = [];
  rec_value = [];
  rec_x_ac = [];
  rec_y_ac = [];
  rec_z_ac = [];
  rec_memo = [];
  rec_flag = 1;
  timer_count = 0;
  document.getElementById("timer").innerHTML = "Time:0";
  timerID = setInterval('countup()',1000);
  $("#rec_button").off();
  $("#rec_button").click(function(){stopRec();});
  document.getElementById("rec_Content").innerHTML = "Stop Log";
  $('#rec_modalArea').fadeOut();
}

function stopRec(){
  console.log("rec_stop")
  rec_flag = 0;
  clearInterval(timerID);
  timer_count = 0;
  document.getElementById("timer").innerHTML = "";
  $("#rec_button").off();
  $("#rec_button").click(function(){startRec();});
  document.getElementById("rec_Content").innerHTML = "Start Log <br><br> latest data will be discarded";
  $('#rec_modalArea').fadeOut();
}

function downloadCSV() {
  if (!(rec_time.length===rec_value.length&&rec_time.length===rec_ac_value.length&&rec_time.length===rec_time_jst.length) || rec_time.length===0){
    alert("data error!")
  }else{
    const filename = "data.csv";
    var data = "time, jsttime, rawdata, data, x-ac, y-ac, z-ac, memo\n";
    var rec_temp = [];
    for (let i=0; i<rec_time.length; i++){
      rec_temp.push(String(rec_time[i])+","+String(rec_time_jst[i])+","+String(rec_ac_value[i])+","+String(rec_value[i])+","+String(rec_x_ac[i])+","+String(rec_y_ac[i])+","+String(rec_z_ac[i])+","+String(rec_memo[i]));
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
  rec_time = [];
  rec_time_jst = [];
  rec_ac_value = [];
  rec_value = [];
  rec_x_ac = [];
  rec_y_ac = [];
  rec_z_ac = [];
  rec_memo = [];
}

function layout(){
  var ww = window.innerWidth;
  var hh = window.innerHeight;
  var dww = document.getElementById('data_text-wrapper').clientWidth;
  var dhh = document.getElementById('data_text-wrapper').clientHeight;
  var ddhh = document.getElementById('data_text').clientHeight;
  var thh = document.getElementById('timer-wrapper').clientHeight;
  var tthh = document.getElementById('timer').clientHeight;
  var size = Math.min(dww,dhh*2);
  var data_size = parseInt(size*0.35);
  var timer_bottom = parseInt(size*0.1);
  var circle_size = parseInt(size*0.8);
  var memow =  document.getElementById('sbox').clientWidth;
  $('#data_text').css({'font-size':data_size+'px', 'top':(dhh-ddhh)/2+'px'});
  $('#timer').css({'font-size':thh*0.5+'px', 'top':(thh-tthh)/2+'px'});
  $('#data_circle').css({'width':circle_size+'px','height':circle_size+'px'});
  //$('#form1').css({'bottom':timer_bottom+'px'});
  $('#sbox').css({'left':(ww-memow-60)/2+'px'});
  $('#sbtn').css({'left':(ww+memow-60)/2+'px'});
}