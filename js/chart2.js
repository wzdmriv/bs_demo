var data = [0.2, 0.8, 0.8, 0.8, 1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6,
            5.5, 6.2, 5.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1,
            5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7,
            9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6]

Highcharts.chart('container', {
    chart: {
        type: 'spline',
        scrollablePlotArea: {
            minWidth: 1000,
            scrollPositionX: 1
        }
    },
    title: {
        text: 'Scrollable plot area'
    },
    subtitle: {
        text: 'Open on mobile and scroll sideways'
    },
    xAxis: {
        type: 'datetime',
        labels: {
            overflow: 'justify'
        }
    },
    yAxis: {
        tickWidth: 1,
        title: {
            text: 'Wind speed (m/s)'
        },
        lineWidth: 1,
        opposite: true
    },
    tooltip: {
        valueSuffix: ' m/s',
        split: true
    },

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
            },
            pointInterval: 1000, // one hour
            pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
        }
    },
    series: [{
        name: 'Hestavollane',
        data: data

    }]
});
setInterval(function(){
data.push(-5.0);
var scrollPosition = document.querySelector(".highcharts-scrolling").scrollLeft;
console.log(scrollPosition)
	Highcharts.chart('container', {
    chart: {
        type: 'spline',
        scrollablePlotArea: {
            minWidth: 1000,
            scrollPositionX: 1
        }
    },
    title: {
        text: 'Scrollable plot area'
    },
    subtitle: {
        text: 'Open on mobile and scroll sideways'
    },
    xAxis: {
        type: 'datetime',
        labels: {
            overflow: 'justify'
        }
    },
    yAxis: {
        tickWidth: 1,
        title: {
            text: 'Wind speed (m/s)'
        },
        lineWidth: 1,
        opposite: true
    },
    tooltip: {
        valueSuffix: ' m/s',
        split: true
    },

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
            },
            pointInterval: 1000, // one hour
            pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
        }
    },
    series: [{
        name: 'Hestavollane',
        data: data

    }]
});



},1000);