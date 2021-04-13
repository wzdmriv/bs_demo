var rec_value = [];
var rec_time = [];
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

function getValueList(value){
    var vl = [];
    var vl16 = [];
    var vlsens = [];
    var sens_value_temp = [];
    const buffer = value.buffer;
    vl = new Uint8Array(buffer);
    for (let i=0; i<vl.length; i++){
        var temp = vl[i].toString(16);
        if (temp.length==1){
            temp = '0' + temp
        }
        vl16.push(temp);
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
                temp = (temp-min_sens)*100/(max_sens-min_sens);
                sens_value_temp.push(Math.round(temp));
                if (calib_flag===1){
                    sens_value_calib.push(temp);
                }else if(rec_flag===1){
                    rec_value.push(temp);
                    var time_temp = new Date();
                    rec_time.push(time_temp.getTime());
                }
            }else{
                temp = vlsens[k];
                temp = (temp-min_sens)*100/(max_sens-min_sens);
                sens_value_temp.push(Math.round(temp));
                if (calib_flag===1){
                    sens_value_calib.push(temp);
                }else if(rec_flag===1){
                    rec_value.push(temp);
                    var time_temp = new Date();
                    rec_time.push(time_temp.getTime());
                }
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

ble.onRead = function (data, uuid){
    value = getValueList(data);
    document.getElementById('data_text').innerHTML = value[value.length-1];
    var circle_size_temp = value[value.length-1];
    if (circle_size_temp<0){
        circle_size_temp = 0;
    }
    $('#data_circle').css({'-webkit-transform':"scale("+(circle_size_temp/100)+")",'-moz-transform':"scale("+(circle_size_temp/100)+")"});
}
window.onload = function () {
    ble.setUUID("UUID1",   "0000180d-0000-1000-8000-00805f9b34fb", "00002a37-0000-1000-8000-00805f9b34fb");
    layout()
    $(window).resize(layout);
}