google.charts.load('current', {packages: ['corechart', 'controls', 'table']});
google.charts.setOnLoadCallback(controlsAndDashboards)
$(function(){
    setInterval(function(){
        console.log(chart_end)
        if(chart_flag==0){
        }
        chart_flag = 0;
    },1000);
});
function controlsAndDashboards() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Dogs');

      data.addRows([
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
      ]);
      var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));
      var chartRangeFilter = new google.visualization.ControlWrapper({
        controlType: 'ChartRangeFilter',
        containerId: 'filter_div',
        options: {
          filterColumnIndex: 0,
          ui: {
            chartType: 'ComboChart',
            chartOptions: {
              colors: ['rgb(245, 245, 245)'],
              backgroundColor: 'rgb(127, 197, 220)'
            }
          }
        },
        state: {
            range: {
                start : chart_start,
                end : chart_end
            }
        }
      });

      var lineChart = new google.visualization.ChartWrapper({
        chartType: 'LineChart',
        containerId: 'chart_div',
        options: {
          backgroundColor: 'rgb(127, 197, 220)',
          hAxis: {
            textPosition: 'none'
          },
          legend:'none',
          colors: ['rgb(245, 245, 245)']
        }
      });

      google.visualization.events.addListener(chartRangeFilter, 'statechange', function () {
        chart_flag = 1;
        var stateDate = chartRangeFilter.getState();
        chart_start = stateDate.range.start;
        chart_end = stateDate.range.end;
      });

      dashboard.bind(chartRangeFilter, lineChart);

      dashboard.draw(data);
}