var now_time = Date.now() + 1000*60*60*9 - 1000*data_chart.length;
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
            pointInterval: 1000,
            pointStart: (now_time)
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
