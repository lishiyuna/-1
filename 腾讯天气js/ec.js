
  var dom = document.getElementById('container');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  
  var option;

  option = {

tooltip: {
  trigger: 'axis'
},
legend: {},
toolbox: {
  show: true,
  feature: {
    // dataZoom: {
    //   yAxisIndex: 'none'
    // },
    // dataView: { readOnly: false },
    // magicType: { type: ['line', 'bar'] },
    // restore: {},
    // saveAsImage: {}
  }
},
xAxis: {
  // type: 'category',
  // boundaryGap: false,
  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  show:false
},
yAxis: {
  // type: 'value',
  // axisLabel: {
  //   formatter: '{value} °C'
  // },
  show:false
},
series: [
  {
     type: 'line',
    data: [10, 11, 13, 11, 12, 12, 9],
    markPoint: {
      // data: [
      //   { type: 'max', name: 'Max' },
      //   { type: 'min', name: 'Min' }
      // ]
    },
    // markLine: {
     
    // }
  },
  {
 
    type: 'line',
    data: [1, -2, 2, 5, 3, 2, 0],
   
    markLine: {
      data: [
        [
          {
             symbol: 'none',
            x: '90%',
            yAxis: 'max'
          },
          {
            symbol: 'circle',
            label: {
              position: 'start',
              formatter: 'Max'
            },
         
          }
        ]
      ]
    }
  }
]
};
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
