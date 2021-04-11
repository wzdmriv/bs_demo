var sens_value = [];
var vent_value = [];
var amp_value = [];

function parseHeartRate(value) {
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(0);
    let rate16Bits = flags & 0x1;
    let result = {};
    let index = 1;
    if (rate16Bits) {
        result.heartRate = value.getUint16(index, /*littleEndian=*/true);
        index += 2;
    } else {
        result.heartRate = value.getUint8(index);
        index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
        result.contactDetected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
        result.energyExpended = value.getUint16(index, /*littleEndian=*/true);
        index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
        let rrIntervals = [];
        for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push(value.getUint16(index, /*littleEndian=*/true));
        }
        result.rrIntervals = rrIntervals;
    }
    return result;
}


function getValueList(value){
    var vl = [];
    var vl16 = [];
    var vlsens = [];
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
                sens_value.push(temp);
            }else{
                temp = vlsens[k];
                sens_value.push(temp);
            }
        }
    }

    var x_ac = getAC(vl16[vl16.length-4]);
    var y_ac = getAC(vl16[vl16.length-2]);
    var z_ac = getAC(vl16[vl16.length-3][1]+vl16[vl16.length-1][1]);
    console.log("x_ac:"+x_ac+",y_ac:"+y_ac+",z_ac:"+z_ac)
    console.log(sens_value)
    return [vl16,vlsens];
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

var ble = new BlueJelly();


function startNotify() {
    ble.startNotify('UUID1');
}

function stopNotify(){
    ble.stopNotify('UUID1');
}


ble.onScan = function (deviceName) {
    document.getElementById('data_text').innerHTML = deviceName;
}
ble.onConnectGATT = function (uuid) {
    console.log('> connected GATT!');
  
    document.getElementById('uuid_name').innerHTML = uuid;
    document.getElementById('status').innerHTML = "connected GATT!";
}

ble.onStartNotify = function(uuid){
    console.log('> Start Notify!');
  
    document.getElementById('uuid_name').innerHTML = uuid;
    document.getElementById('status').innerHTML = "started Notify";
}

ble.onStopNotify = function(uuid){
    console.log('> Stop Notify!');
  
    document.getElementById('uuid_name').innerHTML = uuid;
    document.getElementById('status').innerHTML = "stopped Notify";
}

ble.onRead = function (data, uuid){
    value = getValueList(data);
    vl16 = value[0];
    vlsens = value[1];
    
    document.getElementById('data_text').innerHTML = value;
    document.getElementById('uuid_name').innerHTML = uuid;
    document.getElementById('status').innerHTML = "read data"
}
window.onload = function () {
    ble.setUUID("UUID1",   "0000180d-0000-1000-8000-00805f9b34fb", "00002a37-0000-1000-8000-00805f9b34fb");
}