<template>
    
</template>

<script>
const accounting = require('accounting-js');

export default {
    name: 'barChart',
    props: {
        row: Array,
        barchart: Object
    },
    data () {
        return {
        };
    },
    methods: {
        renderChart() {
            
            let chart_data = this.row
            // specify chart configuration item and data
            let option = {
                tooltip: {
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
                    data: []
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: []
            };

            // console.log("chart_data",chart_data);
            chart_data[0].data.forEach(function(invoice_data) {
                option.xAxis.data.push(invoice_data.label)
            })

            chart_data.forEach(function(invoice) {
                let series = {
                    name: invoice.name,
                    type: 'bar',
                    data: []
                }
                option.legend.data.push(invoice.name)
                invoice.data.forEach(function(invoice_data) {
                    series.data.push(invoice_data.y)
                })
                option.series.push(series)
            })

            console.log("options",option)
            // use configuration item and data specified to show chart
            this.barchart.hideLoading();
            this.barchart.setOption(option)
            window.addEventListener('resize', () => {
                this.barchart.resize();
            });
        }
    },
    mounted () {
        // this.$nextTick(() => {
            console.log("bar chart this.row",this.row)
            if (this.row.length != 0) {
                this.renderChart()
            }
        // });
    },
    watch: {
        'row': async function(id) {
            console.log("bar chart Row Data",this.row)
            this.renderChart()
        }
    }
};
</script>
