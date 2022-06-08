
// var dom = document.getElementById('container');
// var myChart = echarts.init(dom, null, {
//     renderer: 'canvas',
//     useDirtyRect: false
// });
// var app = {};

// var option;

// option = {

//     tooltip: {
//         trigger: 'axis'
//     },
//     legend: {},
//     toolbox: {
//         show: true,
//         feature: {
//             // dataZoom: {
//             //   yAxisIndex: 'none'
//             // },
//             // dataView: { readOnly: false },
//             // magicType: { type: ['line', 'bar'] },
//             // restore: {},
//             // saveAsImage: {}
//         }
//     },
//     xAxis: {
//         type: 'category',
//         // boundaryGap: false,
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'dsd'],
//         show: false,
//         lineStyle: {
//             width: 3,

//         },

//     },
//     yAxis: {
//         // type: 'value',
//         // axisLabel: {
//         //   formatter: '{value} °C'
//         // },
//         show: false,

//     },
//     series: [
//         {
//             type: 'line',
//             data: [37, 35, 33, 36, 31, 36, 36, 33],
//             smooth: true,
//             lineStyle: {
//                 width: 3,
//                 color: "#fcc330",

//             },
//             label: {
//                 show: true,
//                 position: 'top',
//                 textStyle: {
//                     fontSize: 14
//                 }
//             },
//             markPoint: {
//                 // data: [
//                 //   { type: 'max', name: 'Max' },
//                 //   { type: 'min', name: 'Min' }
//                 // ]
//             },
//             // markLine: {

//             // }
//         },


//         {

//             type: 'line',
//             data: [24, 20, 22, 21, 21, 23, 24, 25],
//             smooth: true,
//             lineStyle: {
//                 width: 3,
//             },
//             label: {
//                 show: true,
//                 position: 'top',
//                 textStyle: {
//                     fontSize: 14
//                 }
//             },
//             markLine: {
//                 data: [
//                     [

//                         {
//                             symbol: 'none',
//                             x: '90%',
//                             yAxis: 'max'
//                         },
//                         {
//                             symbol: 'circle',
//                             label: {
//                                 position: 'start',
//                                 formatter: 'Max'
//                             },

//                         }
//                     ]
//                 ]
//             }
//         }
//     ]
// };

// if (option && typeof option === 'object') {
//     myChart.setOption(option);
// }

// window.addEventListener('resize', myChart.resize);




let in1 = document.getElementById("in")
let sou = document.getElementById('sou')
let rei = document.getElementsByTagName("reimen")
in1.onfocus = function () {
    console.log(sou);
    sou.style.display = "block";
    sou.onclick = function () {
        sou.style.display = "none";
    }

}
let btn = document.querySelector(".btn10")
let btn1 = document.querySelector(".btn11")
let oul = document.querySelector(".ul")




let script = document.createElement("script")
//   script.src="https://wis.qq.com/weather/common?&callback=fun&source=pc&weather_type=forecast_24h&province=河南省&city=郑州$air="
script.src =
    "https://wis.qq.com/weather/common?source=pc&weather_type=observe|forecast_1h|forecast_24h|index|alarm|limit|air|tips|rise&province=河南&city=郑州&callback=fun";
document.body.appendChild(script)
script.onload = function () {
    document.body.removeChild(script)
}
//   let qe=document.getElementById("qe")
//   console.log(qe.innerHTML);

let qe = document.querySelectorAll("#qe")
let ce = document.querySelectorAll("#ce")
let zh = document.querySelectorAll("#p0")
let p21 = document.querySelectorAll("#p21")
let p22 = document.querySelectorAll("#p22")

function fun(data) {

     console.log(data);
    for (let a = 0; a < 8; a++) {
        let arr = data.data.forecast_24h[a].time
        let atr = arr.substring(5)
        let att = atr.split('-').join("月")
        let ate = data.data.forecast_24h[a].day_weather
         
        let aee = data.data.forecast_24h[a].day_wind_power
        let art = data.data.forecast_24h[a].day_wind_direction
        let atw = art + "&nbsp" + aee.toUpperCase() + "级"

        qe[a].innerHTML = att
        zh[a].innerHTML = data.data.forecast_24h[a].night_weather
        p21[a].innerHTML = ate
        p22[a].innerHTML = atw
        
        //  let dateStr = date.substring(0, 4) + "/" + date.substring(5, 7) + "/" + date.substring(8, 10);
        // return 
        let at = atr.split('-').join("/")
         let ay=`周${"日一二三四五六".charAt(new Date(at).getDay())}`
         console.log(new Date(at).getDay());
        //  let red= $('.ced')[a]
        //  console.log(red.html());
        $('.ced').eq(a).html(`周${"日一二三四五六日".charAt(new Date(at).getDay())}`)


    }
    let ve = {
        多云: "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/01.png",
        小雨: "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/07.png",
        阴: "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/02.png",
        晴: "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/00.png"
    }
    $(".item #img1").each(function (i, img) {
       // console.log($(".tq").eq(i).html());
        $(img).attr('src', ve[$(".tq").eq(i).html()])
    })
    let su = {
        晴: "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/night/00.png",
        多云: 'https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/night/01.png',
        阴: "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/02.png",
    }
    $(".item .right").each(function (i, img) {
        // console.log(i);
        // console.log($(".yu").eq(i).html());
        $(img).attr('src', su[$(".yu").eq(i).html()])
    })


    //  console.log(data.data.observe.degree);

    $("#ply").val(`${data.data.observe.degree}°`)
    $(".tianqi").html(data.data.observe.weather)
    // $('tex2').html()
    $(".xian1").html(data.data.limit.tail_number)
    $(".shi2").html(`湿度 ${data.data.observe.humidity}%`)
    //点击改变他的文字
    $("#p13").html(data.data.tips.observe[0])
    $("#dian").click(function () {
        if ($("#p13").html() == data.data.tips.observe[0]) {
            $("#p13").html(data.data.tips.observe[1])

        }
        else {
            $("#p13").html(data.data.tips.observe[0])

        }
    })
    //改变下面的风向
    const windMap = {
        0: '无持续风向',
        1: '东北风',
        2: '东风',
        3: '东南风',
        4: '南风',
        5: '西南风',
        6: '西风',
        7: '西北风',
        8: '北风',
        9: '旋转风',
    };


    $(".tex2").html()

    for (let i in windMap) {
      
        if (data.data.observe.wind_direction == i) {
            $('.tex2').html(`${windMap[i]} ${data.data.observe.wind_power}级`)

        }
    }
    $(".qiya1").html(`气压${data.data.observe.pressure}hpa`)
    $("#yang").html(`中央气象台${data.data.observe.update_time.slice(8, 10) + ":" + data.data.observe.update_time.slice(10, 12)}发布`)

    // console.log(data.data.air.aqi);
    $("#p2").html(`${data.data.air.aqi}°${data.data.air.aqi_name}`)
    sun(data)
    cr(data)
    zhouji(data)

}

//中间24小时温度
function sun(data) {
    for (let i = 0; i < 48; i++) {
        //  console.log(data.data.forecast_1h[i].degree);
        //console.log(data.data.forecast_1h[i].update_time);
        //   console.log(data.data.forecast_1h[i].update_time.slice(8,10)+":"+data.data.forecast_1h[i].update_time.slice(10,12));
        let att = $(`
        <li>
          <p>${data.data.forecast_1h[i].update_time.slice(8, 10) + ":" + data.data.forecast_1h[i].update_time.slice(10, 12)}</p>
          <img src="" alt="" class=ig>
          <p>${data.data.forecast_1h[i].degree}°</p>
          </li>
        `)

        $(".ul").append(att)


        // if (data.data.forecast_1h[i].update_time.slice(8, 10) > 19 && data.data.forecast_1h[i].update_time.slice(8, 10) < 6) {

        //     $(".ul .ig").each(function (h, img) {
        //         console.log(data.data.forecast_1h[h].weather)
        //     })
        // }

    }
    //点击按钮向滑动
    
        
        $(".btn10").on('click', function () {
            $(".ul li").animate({
               
                left: "-=1140"
    
    
            }, 2000)
        })
    }

    $(".btn11").on("click", function () {
        $(".ul li").animate({
            left: '+=1140'
        }, 1000)
    })
//右侧hover效果

//右侧点击滑动效果
$(".btn3").on('click', function () {
    
    $(".su").animate({
        left: -450
    }, 1000)
})
$(".btn4").on("click", function () {
    $(".su").animate({
        left: 0
    }, 1000)
})


function cr(data) {
    var po = []
    var run = ''
    var pun = []

    for (let a = 0; a < 8; a++) {
        let run = data.data.forecast_24h[a].max_degree + '°'
        po.push(run)
        pun.push(data.data.forecast_24h[a].min_degree + "°")
        // console.log(pun);
    }

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
            type: 'category',
            // boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'dsd'],
            show: false,
            lineStyle: {
                width: 3,

            },

        },
        yAxis: {
            // type: 'value',
            // axisLabel: {
            //   formatter: '{value} °C'
            // },
            show: false,

        },
        series: [
            {
                type: 'line',
                data: [20, 10, 20, 45, 7, 8, 6, 5],
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: "#fcc330",

                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        fontSize: 14
                    }
                },
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
                data: pun,
                smooth: true,
                lineStyle: {
                    width: 3,
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        fontSize: 14
                    }
                },
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


}
function zhouji(data) {
    $('.item').parent('p')
    console.log($('.item'));

}
// 封装转换星期

