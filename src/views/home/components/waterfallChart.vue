<template>
    
</template>

<script>
const accounting = require('accounting-js');

export default {
    name: 'waterfallChart',
    props: {
        row : Array,
        waterfallchart : Object
    },
    data () {
        return {
        };
    },
    methods: {
        renderChart() {
            
            let chart_data = this.row;

            let data1 = [];
            let data2 = [];
            let data3 = [];
            // specify chart configuration item and data
            let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                },
                formatter: function (params) {
                    let tar;
                    if (params[1].value != '-') {
                        tar = params[1];
                    }
                    else {
                        tar = params[0];
                    }
                    return accounting.formatMoney(tar.value, {
                        symbol : '$',
                        precision : 2,
                        thousand  : ''
                    })

                }
            },
            legend: {
                data: ['']
            },
            xAxis: [{
                type: 'category',
                splitLine: {show:false},
                data: [ ]
            }],
            yAxis: {
                type : 'value'
            },
            series: [
                {
                    type: 'bar',
                    stack: 'account',
                    itemStyle: {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: data1
                },
                {
                    type: 'bar',
                    stack: 'account',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: data2
                },
                {
                    type: 'bar',
                    stack: 'account',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: data3
                }
            ]
            };
            let data_arr = [];
            chart_data.forEach(function(chart_data1) {
                option.xAxis[0].data.push(chart_data1.label);
                data_arr.push(chart_data1.y);
            })
            // console.log("waterfall data_arr",data_arr);

            for (let i = 0; i<data_arr.length; i++ ) {
                let diff = data_arr[i] - data_arr[i-1];
                diff = accounting.formatMoney(diff, {
                    symbol : '',
                    precision : 2,
                    thousand  : ''
                });
                let dataarr1 = accounting.formatMoney(data_arr[i], {
                    symbol : '',
                    precision : 2,
                    thousand  : ''
                });

                if (i == 0) {
                    data1.push(0.00);
                    data2.push(dataarr1);
                    data3.push('-');
                }
                else if (diff > 0) {
                    data1.push(accounting.formatMoney(data_arr[i-1]));
                    data2.push(diff);
                    data3.push('-');
                }
                else if (diff < 0) {
                    data1.push(accounting.formatMoney(data_arr[i]));
                    data2.push('-');
                    data3.push(accounting.formatMoney((data_arr[i-1] - data_arr[i]), {
                    symbol : '',
                    precision : 2,
                    thousand  : ''
                }));
                }
                else {
                    data1.push(accounting.formatMoney(data_arr[i]));
                    data2.push(diff);
                    data3.push('-');
                }
            }

            // console.log("data1",data1);
            // console.log("data2",data2);
            // console.log("data3",data3);
            this.waterfallchart.hideLoading();
            this.waterfallchart.setOption(option);
            window.addEventListener('resize', function () {
                this.waterfallchart.resize();
            });
        }
    },
    mounted () {
        // this.$nextTick(() => {
            console.log("waterfall chart this.row",this.row)
            if (this.row.length != 0) {
                this.renderChart()
            }
        // });
    },
    watch: {
        'row': async function(id) {
            console.log("waterfall chart Row Data",this.row)
            this.renderChart()
        }
    }
};
</script>
