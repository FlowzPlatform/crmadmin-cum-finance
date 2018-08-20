<template>
    
</template>

<script>
const accounting = require('accounting-js');

export default {
    name: 'pieChart',
    props: {
        row : Array,
        piechart : Object
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
                series: [{
                    name: 'Sales',
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: [ ]
                }]
            };
            chart_data.forEach(function(piedata) {
                // console.log("piedata",piedata);
                option.legend.data.push(piedata.name);
                option.series[0].data.push(piedata);
            })
            // use configuration item and data specified to show chart
            // document.getElementById('chart2_loading').style = "display:none"
            this.piechart.hideLoading();
            this.piechart.setOption(option);
            window.addEventListener('resize', function () {
                this.piechart.resize();
            });
        }
    },
    mounted () {
        // this.$nextTick(() => {
            console.log("this.row",this.row)
            if (this.row.length != 0) {
                this.renderChart()
            }
        // });
    },
    watch: {
        'row': async function(id) {
            console.log("Row Data",this.row)
            this.renderChart()
        }
    }
};
</script>
