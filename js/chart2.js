var options = {
    chart: {
        type: 'spline',
        scrollablePlotArea: {
            minWidth: 20*data_chart.length,
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
            pointStart: new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })).getTime()
        }
    },
    series: [{
        name: 'none',
        data: data_chart

    }]
};


var chart = new Highcharts.chart('container', options);

var scrflag = 0;
var scrld_flag = 0;

setInterval(function(){
    console.log("fffff"+scrflag)
    data_chart.push(-5.0);
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
                    minWidth: 20*data_chart.length,
                    scrollPositionX: 1
                }
            },series: [{
                name: 'none',
                data: data_chart
        
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

