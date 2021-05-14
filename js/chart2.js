var data = [0.2, 0.8, 0.8, 0.8, 1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6,
            5.5, 6.2, 5.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1,
            5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7,
            9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6]

var options = {
    chart: {
        type: 'spline',
        scrollablePlotArea: {
            minWidth: 20*data.length,
            scrollPositionX: 1
        }
    },
    credits: { enabled: false },
    tooltip: { enabled: false },
    title: false,
    xAxis: {
        type: 'datetime',
        labels: {
            overflow: 'allow'
        }
    },
    yAxis: {
        tickWidth: 1,
        title: false,
        lineWidth: 1,
        opposite: true
    },
    tooltip: {
        valueSuffix: ' m/s',
        split: true
    },
    legend:false,
    plotOptions: {
        spline: {
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 5
                }
            },
            marker: {
                enabled: false
            },
            pointInterval: 1000, // one hour
            pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
        }
    },
    series: [{
        name: 'none',
        data: data

    }]
};


var chart = new Highcharts.chart('container', options);

var scrflag = 0;
var scrld_flag = 0;

setInterval(function(){
    console.log("fffff"+scrflag)
    data.push(-5.0);
    var scr = document.querySelector(".highcharts-scrolling");
    var width = scr.offsetWidth;
    var scrollPosition = scr.scrollLeft;
    var scrollWidth = scr.scrollWidth;
    console.log(width)
    console.log(scrollPosition)
    console.log(scrollWidth)
    scrld_flag = 0;
    if(scrollWidth-(width+scrollPosition)<50){
        scrld_flag = 1;
    }
    if (scrflag == 0){
        chart.update({
            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: 20*data.length,
                    scrollPositionX: 1
                }
            },series: [{
                name: 'none',
                data: data
        
            }]
        })
        var scr = document.querySelector(".highcharts-scrolling");
        if(scrld_flag==1){
            console.log("hello")
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
},1000);

