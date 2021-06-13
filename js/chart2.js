var options = {
    chart: {
        animation: false,
        type: 'line',
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
            animation: false,
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 5
                }
            },
            marker: {
                enabled: false
            }
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
