// Y軸コピー用 canvas
var cvsYAxis = document.getElementById('yAxis');
var ctxYAxis = cvsYAxis.getContext('2d');

// テスト用データ
var data = [];
var labels = [];
var colors = [];

for (i = 0; i < 15; i += 1) {
  [-12, 19, 3, 5, 2, 3].forEach(x => { data.push(x); });
  ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'].forEach(x => { labels.push(x); });
  [ 'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'].forEach(x => { colors.push(x); });
}

// X軸の1データ当たりの幅
var xAxisStepSize = 30;
// グラフ全体の幅を計算
var chartWidth = data.length * xAxisStepSize;

// グラフ描画用 canvas
var cvsChart = document.getElementById('chart');
var ctxChart = cvsChart.getContext('2d');

// Chart用canvasのstyle.width(すなわち実際に描画されるべきサイズ)に上記の幅を設定
cvsChart.style.width = chartWidth + "px";

// canvas.width(height)はグラフ描画時に Chart により変更される(らしい)ので、下記はやる必要なし
//cvsChart.width = chartWidth;
//cvsChart.height = chartHeight;

// 二重実行防止用フラグ
var copyYAxisCalled = false;

// Y軸イメージのコピー関数
function copyYAxisImage(chart) {
  //console.log("copyYAxisCalled="+copyYAxisCalled);
  if (copyYAxisCalled) return;
  cvsChart.style.width = chartWidth + "px";

  copyYAxisCalled = true;

  // グラフ描画後は、canvas.width(height):canvas.style.width(height) 比は、下記 scale の値になっている
  var scale = window.devicePixelRatio;

  // Y軸のスケール情報
  var yAxScale = chart.scales['y-axis-0'];

  // Y軸部分としてグラフからコピーすべき幅 (TODO: 良く分かっていない)
  var yAxisStyleWidth0 = yAxScale.width - 10;

  // canvas におけるコピー幅(yAxisStyleWidth0を直接使うと微妙にずれるので、整数値に切り上げる)
  var copyWidth = Math.ceil(yAxisStyleWidth0 * scale);
  // Y軸canvas の幅(右側に少し空白部を残す)
  var yAxisCvsWidth = copyWidth + 4;
  // 実際の描画幅(styleに設定する)
  var yAxisStyleWidth = yAxisCvsWidth / scale;

  // Y軸部分としてグラフからコピーすべき高さ (TODO: 良く分かっていない) ⇒これを実際の描画高とする(styleに設定)
  var yAxisStyleHeight = yAxScale.height + yAxScale.top + 10;
  // canvas におけるコピー高
  var copyHeight = yAxisStyleHeight * scale;
  // Y軸canvas の高さ
  var yAxisCvsHeight = copyHeight;

  console.log("After chart canvas width=" + cvsChart.width);
  console.log("After chart canvas height=" + cvsChart.height);
  console.log("scale="+scale);
  console.log("copyWidth="+copyWidth);
  console.log("copyHeight="+copyHeight);
  console.log("yAxisCvsWidth="+yAxisCvsWidth);
  console.log("yAxisCvsHeight="+yAxisCvsHeight);
  console.log("yAxisStyleWidth0="+yAxisStyleWidth0);
  console.log("yAxisStyleWidth="+yAxisStyleWidth);
  console.log("yAxisStyleHeight="+yAxisStyleHeight);

  // 下記はやってもやらなくても結果が変わらないっぽい
  //ctxYAxis.scale(scale, scale);

  // Y軸canvas の幅と高さを設定
  cvsYAxis.width = yAxisCvsWidth;
  cvsYAxis.height = yAxisCvsHeight;

  // Y軸canvas.style(実際に描画される大きさ)の幅と高さを設定
  cvsYAxis.style.width = yAxisStyleWidth + "px";
  cvsYAxis.style.height = yAxisStyleHeight + "px";

  // グラフcanvasからY軸部分のイメージをコピーする
  ctxYAxis.drawImage(cvsChart, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
  // 軸ラベルのフォント色を透明に変更して、以降、再表示されても見えないようにする
  //chart.options.scales.yAxes[0].ticks.fontColor = 'rgba(0,0,0,0)';
  chart.update();
  // 最初に描画されたグラフのY軸ラベル部分をクリアする
  //ctxChart.clearRect(0, 0, yAxisStyleWidth, yAxisStyleHeight);
  copyYAxisCalled = false;
}

// グラフ描画
var myChart = new Chart(ctxChart, {
    type: 'line',
    data: {
      labels: labels,
        datasets: [{
            label: '# of Votes',
            data: data,
            borderColor: colors,
        }]
    },
    options: {
      responsive: false,  // true（デフォルト）にすると画面の幅に合わせてしまう
      animation: false,
      legend: {
        display: false
     },
      scales: {
        yAxes: [{
            display: true, 
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
    plugins: [{
      // 描画完了後に copyYAxisImage() を呼び出す
      // see https://www.chartjs.org/docs/latest/developers/plugins.html
      //     https://stackoverflow.com/questions/55416218/what-is-the-order-in-which-the-hooks-plugins-of-chart-js-are-executed
      afterRender: copyYAxisImage
    }]
});

$(function(){
    setInterval(function(){
        data.push(5);
        labels.push('blue');
        chartWidth = data.length * xAxisStepSize;
        cvsChart.width = chartWidth;
        var myChart = new Chart(ctxChart, {
            type: 'line',
            data: {
              labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    borderColor: colors,
                }]
            },
            options: {
              responsive: false,  // true（デフォルト）にすると画面の幅に合わせてしまう
              animation: false,
              legend: {
                display: false
             },
              scales: {
                yAxes: [{
                    display: true, 
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            },
            plugins: [{
              // 描画完了後に copyYAxisImage() を呼び出す
              // see https://www.chartjs.org/docs/latest/developers/plugins.html
              //     https://stackoverflow.com/questions/55416218/what-is-the-order-in-which-the-hooks-plugins-of-chart-js-are-executed
              afterRender: copyYAxisImage
            }]
        });
        var scr = document.getElementById("chart_scroll");
        var width = scr.offsetWidth;
        var scrollPosition = scr.scrollLeft;
        var scrollWidth = scr.scrollWidth;
        if(scrollWidth-(width+scrollPosition)<50){
            scr.scrollLeft = scrollWidth;
        }
    },1000);
});


// 現在の縦スクロール位置
var scrollPosition = document.getElementById("chart_scroll").scrollLeft;
// スクロール要素の高さ
var scrollWidth = document.getElementById("chart_scroll").scrollWidth;
console.log(scrollWidth)
document.getElementById("chart_scroll").scrollLeft = scrollWidth;