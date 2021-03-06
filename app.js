var data_set = {
    death_rate: {
        ROC: [6.6, 6.6, 6.7],
        JP: [9.9, 10.0, 10.1],
        ZAF: [11.3, 11.0, 10.7]
    // 國家: [2011年, 2012年, 2013年]
    },
    born: {
        TPE: [
            [Date.UTC(2006, 1, 1), 21151],
            [Date.UTC(2007, 1, 1), 21620],
            [Date.UTC(2008, 1, 1), 20691],
            [Date.UTC(2009, 1, 1), 19403],
            [Date.UTC(2010, 1, 1), 18530],
            [Date.UTC(2011, 1, 1), 25132],
            [Date.UTC(2012, 1, 1), 29498],
            [Date.UTC(2013, 1, 1), 26710],
            [Date.UTC(2014, 1, 1), 29024],
            [Date.UTC(2015, 1, 1), 28987]
        ]
    // 城市: [[UTC年份, 人數],[UTC年份, 人數],[UTC年份, 人數],etc.]
    },
    death: {
        TPE: [
            [Date.UTC(2006, 1, 1), 14011],
            [Date.UTC(2007, 1, 1), 14871],
            [Date.UTC(2008, 1, 1), 15606],
            [Date.UTC(2009, 1, 1), 15260],
            [Date.UTC(2010, 1, 1), 15398],
            [Date.UTC(2011, 1, 1), 15988],
            [Date.UTC(2012, 1, 1), 16579],
            [Date.UTC(2013, 1, 1), 16379],
            [Date.UTC(2014, 1, 1), 17177],
            [Date.UTC(2015, 1, 1), 17106]
        ]
    // 城市: [[UTC年份, 人數],[UTC年份, 人數],[UTC年份, 人數],etc.]
    },
    gender: {
        TPE: {
            male: 1295462,
            female: 1409348
        }
    // 城市: {男性: 人數, 女性: 人數}
    }
}

Highcharts.setOptions({
    // 為全部圖表設定選項

    credits: false // 關閉所有圖表右下方的版權訊息
});

$('#column').highcharts({
    // 在 ID 為 column 的元素上畫圖表
    title: {
        text: '國家粗死亡率' // 標題
    },
    subtitle: {
        text: '單位：‰（每1000人的死亡總數）' // 副標題
    },
    chart: {
        // 圖表選項
        type: 'column', // 類型：直條圖
        zoomType: 'x', // 縮放模式：僅X軸
    },
    xAxis: {
        // X軸相關設定
        type: 'category', // 類型：類別
        categories: ['2011年', '2012年', '2013年'] // X軸類別清單
    },
    yAxis: {
        // Y軸相關設定
        labels: {
            // 標籤選項
            format: '{value} 人' // 標籤顯示格式：({值}人)
        }
    },
    tooltip: {
        valueSuffix: '人' // 值的後綴：人
    },
    series: [{ // 資料系列
        name: '中華民國', // 欄位名稱
        data: data_set.death_rate.ROC // 資料
    }, {
        name: '日本',
        data: data_set.death_rate.JP
    }, {
        name: '南非',
        data: data_set.death_rate.ZAF
    }]
})

$('#line').highcharts({
    title: {
        text: '臺北市近10年新生兒、死亡人數'
    },
    subtitle: {
        text: 'Data From Taipei City Government'
    },
    chart: {
        type: 'line', // 類型：線圖
        zoomType: 'x'
    },
    xAxis: {
        type: 'datetime', // 類型：日期與時間
    },
    yAxis: {
        // Y軸相關設定
        labels: {
            // 標籤選項
            format: '{value} 人' // 標籤顯示格式：({值}人)
        }
    },
    tooltip: {
        // 提示相關設定
        valueSuffix: '人', // 值的後綴：人
        crosshairs: { // 滑鼠懸停時的輔助線
            color: 'black', // 顏色：黑
            dashStyle: 'solid' // 輔助線仰視：實線
        },
        shared: true // 此圖表內所有欄位共用相同的提示設定（易於比較數值）
    },
    series: [{
        name: '新生兒人數',
        data: data_set.born.TPE,
        dataLabels: { // 資料標籤
            align: 'center', // 對齊：中央
            enabled: true // 啟用：是
        }
    }, {
        name: '死亡人數',
        data: data_set.death.TPE,
        dataLabels: {
            align: 'center',
            enabled: true
        }
    }]

})


$('#pie').highcharts({
    title: {
        text: '104年12月 臺北市男女市民人數'
    },
    subtitle: {
        text: '以戶籍登記資料為主 Data From Taipei City Government'
    },
    chart: {
        type: 'pie', // 類型：派圖
    },
    tooltip: {
        // 提示相關設定
        valueSuffix: '人', // 值的後綴：人
    },
    series: [{
        name: '人數',
        data: [{
            name: '男性市民',
            color: 'lightblue',
            y: data_set.gender.TPE.male
        }, {
            name: '女性市民',
            color: 'pink',
            y: data_set.gender.TPE.female
        }]
    }]

})

$('#plusone-1').click(function() {
    // 方法1
    data_set.death_rate.ROC[0] += 1 // 將 data_set 中的「2011年中華民國死亡率」資料加1
    var chart = $('#column').highcharts() // 取得 ID 為 column 的元素之圖表的 DOM
    chart.series[0].update(true) // 重繪(無動畫)「2011年中華民國死亡率」欄位
})

$('#plusone-2').click(function() {
    // 方法2
    var chart = $('#column').highcharts() // 取得 ID 為 column 的元素之圖表的 DOM
    var y = chart.series[0].data[0].y // 取得「圖表實體」中的「2011年中華民國死亡率」的資料
    chart.series[0].data[0].update(y + 1) // 將「圖表實體」中的「2011年中華民國死亡率」資料加1且更新(有動畫)
})
