var rec_value = [];
var rec_ac_value = [];
var rec_time = [];
var rec_time_jst = [];
var sens_value_calib = [];
var vent_value = [];
var amp_value = [];
var ble = new BlueJelly();
var min_sens = 0;
var max_sens = 100;
var calib_flag = 0;
var rec_flag = 0;
var timer_count = 0;
var timerID;
var chart_start = 0;
var chart_end = 10;
var chart_flag = 0;
let data_initial = [0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0
    , 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0
    , 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0 ,0.0, 0.0, 0.0
     ,0.0, 0.0, 0.0 ,0.0, 0.0];
var data_chart = data_initial.concat();

function getValueList(value){
    var vl = [];
    var vl16 = [];
    var vlsens = [];
    var sens_value_temp = [];
    var temp = 0;
    const buffer = value.buffer;
    vl = new Uint8Array(buffer);
    for (let i=0; i<vl.length; i++){
        var temp_16 = vl[i].toString(16);
        if (temp_16.length==1){
            temp_16 = '0' + temp_16
        }
        vl16.push(temp_16);
    }

    for (let j=1; j<vl.length/2-2; j++){
        vlsens.push(parseInt(vl16[j*2+1]+vl16[j*2],16));
    }

    for (let k=0; k<vlsens.length; k++){
        if (vlsens[k]>=24576){
            temp= vlsens[k]-24576;
            amp_value.push(temp);
        }else if(vlsens[k]>=16384){
            temp= vlsens[k]-16384;
            vent_value.push(temp);
        }else{
            if (vlsens[k]>=8192){
                temp = vlsens[k] - 16384;
            }else{
                temp = vlsens[k];
            }
            temp2 = (temp-min_sens)*100/(max_sens-min_sens);
            sens_value_temp.push(Math.round(temp2));
            if (calib_flag===1){
                sens_value_calib.push(temp);
            }
            if(rec_flag===1){
                rec_ac_value.push(temp);
                rec_value.push(temp2);
                var time_temp = new Date();
                rec_time.push(time_temp.getTime());
                var hour = time_temp.getHours();
                var min = time_temp.getMinutes();
                var sec = time_temp.getSeconds();
                var milli = time_temp.getMilliseconds();
                rec_time_jst.push(hour+":"+min+":"+sec+":"+String(milli).slice(0,2));
            }
        }
    }

    var x_ac = getAC(vl16[vl16.length-4]);
    var y_ac = getAC(vl16[vl16.length-2]);
    var z_ac = getAC(vl16[vl16.length-3][1]+vl16[vl16.length-1][1]);
    console.log("x_ac:"+x_ac+",y_ac:"+y_ac+",z_ac:"+z_ac)
    console.log(sens_value_temp)
    return sens_value_temp;
}

function getAC(value){
    var temp = parseInt(value,16);
    var result = 0;
    if (temp>=128){
        result = temp - 256;
    }else{
        result = temp
    }
    return result;
}

function resetDevice(){
    ble.reset();
}

function startNotify() {
    ble.startNotify('UUID1');
    $('#navArea').removeClass( "open" );
}

function stopNotify(){
    ble.stopNotify('UUID1');
    $('#navArea').removeClass( "open" );
}


ble.onScan = function (deviceName) {
}
ble.onConnectGATT = function (uuid) {
    console.log('> connected GATT!');
}
ble.onStartNotify = function(uuid){
    console.log('> Start Notify!');
}
ble.onStopNotify = function(uuid){
    console.log('> Stop Notify!');
}
ble.onReset = function() {
    ble.startNotify('UUID1');
}

ble.onRead = function (data, uuid){
    value = getValueList(data);
    document.getElementById('data_text').innerHTML = value[value.length-1];
    data_chart.push(value[value.length-1]);
    var circle_size_temp = value[value.length-1];
    if (circle_size_temp<0){
        circle_size_temp = 0;
    }
    $('#data_circle').css({'-webkit-transform':"scale("+(circle_size_temp/100)+")",'-moz-transform':"scale("+(circle_size_temp/100)+")"});
    var scr = document.querySelector(".highcharts-scrolling");
    var width = scr.offsetWidth;
    var scrollPosition = scr.scrollLeft;
    var scrollWidth = scr.scrollWidth;
    scrld_flag = 0;
    if(scrollWidth-(width+scrollPosition)<50){
        scrld_flag = 1;
    }
    if (scrflag == 0){
        chart.update({
            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: 20*data_chart.length,
                    scrollPositionX: 1
                }
            },
            series: [{
                name: 'none',
                data: data_chart
        
            }],
            plotOptions: {
                spline: {
                    pointStart: (now_time)
                }
            },
        })
        var scr = document.querySelector(".highcharts-scrolling");
        if(scrld_flag==1){
            scr.scrollLeft = scrollPosition+20;
        }
        var isTouch = ('ontouchstart' in window);
        if(isTouch){
            document.getElementById("container").touchstart = function() {
                scrflag = 1;
            }
            document.getElementById("container").touchend = function() {
                scrflag = 0;
            }
        }else{
            document.getElementById("container").mousedown = function() {
                scrflag = 1;
            }
            document.getElementById("container").mouseup = function() {
                scrflag = 0;
            }
        }
    }
}
window.onload = function () {
    ble.setUUID("UUID1",   "0000180d-0000-1000-8000-00805f9b34fb", "00002a37-0000-1000-8000-00805f9b34fb");
    layout()
    $(window).resize(layout);
}