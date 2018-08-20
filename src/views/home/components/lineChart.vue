<template>
    
</template>

<script>
const accounting = require('accounting-js');

export default {
    name: 'lineChart',
    props: {
        row : Array,
        linechart: Object
    },
    data () {
        return {
        };
    },
    methods: {
        renderChart() {
            
            let chart_data = this.row;
            // specify chart configuration item and data
            let option = {
                tooltip: {
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: function (params) {
                        return accounting.formatMoney(params.value, {
                            symbol : '$',
                            precision : 2,
                            thousand  : ''
                        })
                    }
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: [ ]
                },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                    alignWithLabel: true
                    },
                    axisLine: {
                    onZero: false
                    },
                    data: [ ]
                }],
                yAxis: {},
                series: []
            };
            chart_data[0].data.forEach(function(invoice_data) {
                option.xAxis[0].data.push(invoice_data.label);
            })
            chart_data.forEach(function(invoice) {
                let series = {
                    name: invoice.name,
                    type: 'line',
                    smooth: true,
                    data: []
                }
                option.legend.data.push(invoice.name);
                invoice.data.forEach(function(invoice_data) {
                    series.data.push(invoice_data.y)
                })
                option.series.push(series);
            })
            // console.log("Inside line chart option",option)
            // use configuration item and data specified to show chart
            this.linechart.hideLoading();
            this.linechart.setOption(option);
            window.addEventListener('resize', function () {
                this.linechart.resize();
            });
        }
    },
    mounted () {
        // this.$nextTick(() => {
            console.log("line chart this.row",this.row)
            if (this.row.length != 0) {
                this.renderChart()
            }
        // });
    },
    watch: {
        'row': async function(id) {
            console.log("line chart Row Data",this.row)
            this.renderChart()
        }
    }
};
</script>
