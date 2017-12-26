<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor" style="height:120px">
                                <Col span="8" style="padding-right:0px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="avatorPath" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:0px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name" style="font-size: 18px;">{{name}}</b>
                                            <p>Super Admin</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">北京</Col>
                            </Row>
                        </Card>
                    </Col>
                   
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="total_count"
                            :end-val="count.total"
                            iconType="social-usd"
                            color="#2d8cf0"
                            intro-text="Total Amount"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="paid_count"
                            :end-val="count.paid"
                            iconType="social-usd"
                            color="#64d572"
                            intro-text="Paid Amount"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="unpaid_count"
                            :end-val="count.unpaid"
                            iconType="social-usd"
                            color="#ffd572"
                            intro-text="Unpaid Amount"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="draft_count"
                            :end-val="count.draft"
                            iconType="social-usd"
                            color="#f25e43"
                            intro-text="Draft Amount"
                        ></infor-card>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        <DatePicker id="datepicker" type="daterange" format="yyyy/MM/dd" placement="bottom-end" placeholder="Select date" style="width: 200px" v-model="daterange1"></DatePicker>
                        <Button type="primary" @click="dateval">Apply</Button>
                    </col>
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        {{mData}}
                        <Select v-model="config" clearable style="width:200px" placeholder="Select Config">
                            <Option v-for="(inx, item) in mData" :value="item.id" :key="inx">{{ item.label }}</Option>
                        </Select>
                        <Button type="primary" @click="">Apply</Button>
                    </col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <draggable :options="{group:'chart'}">
                            
                    <!-- BEGIN PORTLET-->
                    <Widget>
                    <WidgetHeading :id="4" :Title="'Bar Chart'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                    <WidgetBody>                                    
                        <div class="portlet-body">
                            <div id="chart1_loading">
                                <img src="" alt="loading.." /> 
                            </div>
                            <div id="chart1_content">
                                <div id="barChart" style="height:400px;"></div>
                            </div>
                        </div>
                    </WidgetBody>
                    </Widget>
                    <!-- END PORTLET-->
                            
                </draggable>
            </Col>
            <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                    <draggable :options="{group:'chart'}">
                        <!-- BEGIN PORTLET-->
                        <Widget>
                        <WidgetHeading :id="2" :Title="'Pie Chart'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                        <WidgetBody>                                    
                            <div class="portlet-body">
                                <div id="chart2_loading">
                                <img src="" alt="loading.." /> </div>
                                <div id="chart2_content">
                                    <div id="pieChart" style="height:400px;"></div>
                                </div>
                            </div>
                        </WidgetBody>
                        </Widget>
                        <!-- END PORTLET-->
                    </draggable>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <draggable :options="{group:'chart'}">
                        <!-- BEGIN PORTLET-->
                        <Widget>
                        <WidgetHeading :id="3" :Title="'Line Chart'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                        <WidgetBody>                                    
                            <div class="portlet-body">
                                <div id="chart3_loading">
                                    <img src="" alt="loading.." /> </div>
                                <div id="chart3_content">
                                    <div id="lineChart" style="height:400px;"> </div>
                                </div>
                            </div>
                        </WidgetBody>
                        </Widget>
                        <!-- END PORTLET-->
                </draggable>
            </Col>
            <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <draggable :options="{group:'chart'}">
                    <!-- BEGIN PORTLET-->
                    <Widget>
                    <WidgetHeading :id="6" :Title="'Paid Amount Cashflow'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                    <WidgetBody>                                    
                        <div class="portlet-body">
                            <div id="chart4_loading">
                                <img src="" alt="loading.." /> </div>
                            <div id="chart4_content">
                                <div id="waterfall" style="height: 400px;"> </div>
                            </div>
                        </div>
                    </WidgetBody>
                    </Widget>
                    <!-- END PORTLET-->
                </draggable>
            </Col>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import draggable from 'vuedraggable'
import Cookies from 'js-cookie';
import moment from 'moment';
import axios from 'axios';
const _ = require('lodash');


export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem,
        draggable
    },
    data () {
        return {
            name : '',
            daterange1 : '',
            config : '',
            configList: [],
            count: {
                total: 0,
                paid: 0,
                unpaid: 0,
                draft: 0
            },
            mData: []
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        async ChartFun(chart,date1,date2) {
            var chartdata;
            await axios.get("http://localhost:3037/invoice", {
                params: {
                    chart : chart,
                    date1 : date1,
                    date2 : date2
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
                chartdata = response.data[0].data;
                // chartdata.reverse();
                console.log("chart data",chartdata)
            })
            .catch(function (error) {
                console.log("error",error);
            });
            return chartdata
        },
        // Bar chart
        async barChartFun(date1,date2) {
            // based on prepared DOM, initialize echarts instance
            var barchart = echarts.init(document.getElementById('barChart'))
            var chart_data = await this.ChartFun("bar",date1,date2)
            // specify chart configuration item and data
            var option = {
                tooltip: {},
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
                var series = {
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
            document.getElementById('chart1_loading').style = "display:none"
            barchart.setOption(option)
        },
         //Pie Chart
        async PieChartFun(date1,date2) {
            var chartdata;
            await axios.get("http://localhost:3037/invoice", {
                params: {
                    chart : 'pie',
                    date1 : date1,
                    date2 : date2
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
                chartdata = response.data[0].data;
                // chartdata.reverse();
                console.log("pie chart data",chartdata)
            })
            .catch(function (error) {
                console.log("error",error);
            });
            return chartdata;
        },
        async pieChartFun(date1,date2) {
            // based on prepared DOM, initialize echarts instance
            var piechart = echarts.init(document.getElementById('pieChart'));
            var chart_data = await this.PieChartFun(date1,date2);
            // specify chart configuration item and data
            var option = {
            tooltip: {},
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
            document.getElementById('chart2_loading').style = "display:none"
            piechart.setOption(option);
        },
        async lineChartFun(date1,date2) {
            // based on prepared DOM, initialize echarts instance
            var linechart = echarts.init(document.getElementById('lineChart'));
            var chart_data = await this.ChartFun("line",date1,date2);
            // specify chart configuration item and data
            var option = {
            tooltip: {
                axisPointer: {
                type: 'cross'
                }
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ['2017']
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
            var series = {
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
            document.getElementById('chart3_loading').style = "display:none" 
            linechart.setOption(option);
        },
        //Cashflow
        async waterfall(date1,date2) {
            var chartdata;
            await axios.get("http://localhost:3037/invoice", {
                params: {
                    chart : 'cashflow',
                    date1 : date1,
                    date2 : date2
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
                chartdata = response.data[0].data;
                // chartdata.reverse();
                console.log("waterfall chart data",chartdata)
            })
            .catch(function (error) {
                console.log("error",error);
            });
            return chartdata;
        },

        async waterfallFun(date1,date2) {
            // based on prepared DOM, initialize echarts instance
            var waterfallChart = echarts.init(document.getElementById('waterfall'));
            var chart_data = await this.waterfall(date1,date2);

            var data1 = [];
            var data2 = [];
            var data3 = [];
            // specify chart configuration item and data
            var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                },
                formatter: function (params) {
                    return params[0].value + params[1].value
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
            var data_arr = [];
            chart_data.forEach(function(chart_data1) {
                option.xAxis[0].data.push(chart_data1.label);
                data_arr.push(chart_data1.y);
            })
            // console.log("waterfall data_arr",data_arr);

            for (var i = 0; i<data_arr.length; i++ ) {
                var diff = data_arr[i] - data_arr[i-1];
                if (i == 0) {
                    data1.push(0);
                    data2.push(data_arr[i]);
                    data3.push('-');
                }
                else if (diff > 0) {
                    data1.push(data_arr[i-1]);
                    data2.push(diff);
                    data3.push('-');
                }
                else if (diff < 0) {
                    data1.push(data_arr[i]);
                    data2.push('-');
                    data3.push(data_arr[i-1] - data_arr[i]);
                }
                else {
                    data1.push(data_arr[i]);
                    data2.push(diff);
                    data3.push('-');
                }
            }

            // console.log("data1",data1);
            // console.log("data2",data2);
            // console.log("data3",data3);
            document.getElementById('chart4_loading').style = "display:none" 
            waterfallChart.setOption(option);
        },

        async totalAmt(date1,date2) {
            var statsData;
            await axios.get("http://localhost:3037/invoice", {
                params: {
                    stats : true,
                    date1 : date1,
                    date2 : date2
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
                statsData = response.data[0].data;
                // statsdata.reverse();
                console.log("statsData",statsData)
            })
            .catch(function (error) {
                console.log("error",error);
            });
            this.count.total = statsData[0].value
            this.count.paid = statsData[1].value
            this.count.unpaid = statsData[2].value
            this.count.draft = statsData[3].value
        },

        async init() {
            this.name = Cookies.get('user') ;
            var resp;
            await axios.get("http://localhost:3037/settings", {
                params: {
                    isActive : true
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
               resp = response.data.data;
               console.log("config data list",resp)
            })
            .catch(function (error) {
                console.log("error",error);
            });
            this.configList = resp
            this.mData = _.map(resp, (d) => {
                return {label: d.configName, value: d.id}
            })
        },

        dateval() {
            // console.log("daterange",this.daterange1, typeof this.daterange1)
            // alert(moment(this.daterange1[0]).format('YYYY,MM,DD'))
            // alert(moment(this.daterange1[1]).format('YYYY,MM,DD'))
            this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
            this.pieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
            this.lineChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
            this.waterfallFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
            this.totalAmt(moment(this.daterange1[0]).format('YYYY-MM-DD'),moment(this.daterange1[1]).format('YYYY-MM-DD'))
            // this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'), moment(this.daterange1[1]).format('YYYY,MM,DD'))
        } 

    },
    mounted() {
        this.barChartFun("2017-09-12","2017-12-22"),
        this.pieChartFun("2017-09-12","2017-12-22"),
        this.lineChartFun("2017-09-12","2017-12-22"),
        this.waterfallFun("2017-09-12","2017-12-22"),
        this.totalAmt("2017-09-12","2017-12-22"),
        this.init()
    }
};
</script>

<style>
    .ivu-card-body {
        padding: 3px;
    }
</style>