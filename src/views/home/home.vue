<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="24" :sm="12">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="totalInv_count"
                            :end-val="count.totalInv"
                            iconType="ios-calendar-outline"
                            color="#E7A6C9"
                            intro-text="Total Invoice"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="total_count"
                            :end-val="count.total"
                            iconType="social-usd"
                            color="#2d8cf0"
                            intro-text="Invoice Total Amount"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="paid_count"
                            :end-val="count.paid"
                            iconType="social-usd"
                            color="#64d572"
                            intro-text="Invoice Paid Amount"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="unpaid_count"
                            :end-val="count.unpaid"
                            iconType="social-usd"
                            color="#ffd572"
                            intro-text="Invoice Unpaid Amount"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="draft_count"
                            :end-val="count.draft"
                            iconType="social-usd"
                            color="#f25e43"
                            intro-text="Invoice Draft Amount"
                        ></infor-card>
                    </Col>
                </Row>
                <Row>
                    
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        <Select v-model="config" clearable style="width:200px;float: right;" placeholder="Select Config" >
                            <Option v-for="item in mData" :value="item.id" :key="item.id" >{{ item.configName }}</Option>
                        </Select>
                        <!-- <Button type="primary" @click="selectChange">Apply</Button> -->
                    </col>
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        <DatePicker id="datepicker" type="daterange" :options="dateoptions" format="yyyy/MM/dd"  placeholder="Select date" style="width: 200px" v-model="daterange1"></DatePicker>
                        <Button type="primary" @click="dateval">Apply</Button>
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
const accounting = require('accounting-js');

import configService from '@/config/customConfig.js';
let serviceUrl = configService.default.serviceUrl;

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
                draft: 0,
                totalInv: 0
            },
            mData: [],
            dateoptions: {
                shortcuts: [
                    {
                        text: 'Last month',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            var s = start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
                            this.daterange1 = s
                            return [start, end];
                        }
                    },
                    {
                        text: 'Last 3 months',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 91);
                            return [start, end];
                        }
                    },
                    {
                        text: 'Last 6 months',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 184);
                            return [start, end];
                        }
                    }
                ]
            }
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
                this.$Message.error('error');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        async ChartFun(chart,date1,date2,settingId) {
            this.$Loading.start()
            let self = this;
            var chartdata;
            await axios.get(serviceUrl+"invoice", {
                params: {
                    chart : chart,
                    date1 : date1,
                    date2 : date2,
                    settingId : settingId
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
                chartdata = response.data[0].data;
                // chartdata.reverse();
                self.$Loading.finish()
                console.log("chart data",chartdata)
            })
            .catch(function (error) {
                console.log("error",error);
                self.$Loading.error()

                    
                //     Cookies.remove('auth_token') 
                //     self.$Message.error('Auth Error!');
                //     self.$store.commit('logout', self); 
                //     self.$router.push({
                //     name: 'login'
                // })
            });
            return chartdata
        },
        // Bar chart
        async barChartFun(date1,date2,settingId) {
            // based on prepared DOM, initialize echarts instance
            var barchart = echarts.init(document.getElementById('barChart'))
            var chart_data = await this.ChartFun("bar",date1,date2,settingId)
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
        async PieChartFun(date1,date2,settingId) {
            var chartdata;
            await axios.get(serviceUrl+"invoice", {
                params: {
                    chart : 'pie',
                    date1 : date1,
                    date2 : date2,
                    settingId : settingId
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
        async pieChartFun(date1,date2,settingId) {
            // based on prepared DOM, initialize echarts instance
            var piechart = echarts.init(document.getElementById('pieChart'));
            var chart_data = await this.PieChartFun(date1,date2,settingId);
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
        async lineChartFun(date1,date2,settingId) {
            // based on prepared DOM, initialize echarts instance
            var linechart = echarts.init(document.getElementById('lineChart'));
            var chart_data = await this.ChartFun("line",date1,date2,settingId);
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
        async waterfall(date1,date2,settingId) {
            var chartdata;
            await axios.get(serviceUrl+"invoice", {
                params: {
                    chart : 'cashflow',
                    status : 'Paid',
                    date1 : date1,
                    date2 : date2,
                    settingId : settingId
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
                chartdata = response.data[0].data;
                console.log("waterfall chart data",chartdata)
            })
            .catch(function (error) {
                console.log("error",error);
            });
            return chartdata;
        },

        async waterfallFun(date1,date2,settingId) {
            // based on prepared DOM, initialize echarts instance
            var waterfallChart = echarts.init(document.getElementById('waterfall'));
            var chart_data = await this.waterfall(date1,date2,settingId);

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
                    var tar;
                    if (params[1].value != '-') {
                        tar = params[1];
                    }
                    else {
                        tar = params[0];
                    }
                    return accounting.formatMoney(tar.value, {
                        symbol : '',
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
            var data_arr = [];
            chart_data.forEach(function(chart_data1) {
                option.xAxis[0].data.push(chart_data1.label);
                data_arr.push(chart_data1.y);
            })
            // console.log("waterfall data_arr",data_arr);

            for (var i = 0; i<data_arr.length; i++ ) {
                var diff = data_arr[i] - data_arr[i-1];
                diff = accounting.formatMoney(diff, {
                    symbol : '',
                    precision : 2,
                    thousand  : ''
                });

                if (i == 0) {
                    data1.push(0.00);
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
                    data3.push(accounting.formatMoney((data_arr[i-1] - data_arr[i]), {
                    symbol : '',
                    precision : 2,
                    thousand  : ''
                }));
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

        async totalAmt(date1,date2,settingId) {
            var statsData;
            await axios.get(serviceUrl+"invoice", {
                params: {
                    stats : true,
                    date1 : date1,
                    date2 : date2,
                    settingId : settingId
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
            this.count.totalInv = statsData[4].value
        },

         init(settingId) {
            let self = this;
            this.name = Cookies.get('user');
            var resp;
         axios.get(serviceUrl+"settings", {
                params: {
                    isActive : true,
                    
                },
                headers: {
                    Authorization : Cookies.get('auth_token')
                }
            })
            .then(function (response) {
               console.log("config data list",resp)
               self.mData = response.data.data;
               self.config = self.mData[0].id;
            })
            .catch(function (error) {
                console.log(error)
                    //     this.disabled = false;
                    //     Cookies.remove('auth_token') 
                    //     this.$Message.error('Auth Error!');
                    //     this.$store.commit('logout', this); 
                    //     this.$router.push({
                    //     name: 'login'
                    // })
            });
            
            
        },

        dateval() {
            // console.log("daterange",this.daterange1, typeof this.daterange1)
            // alert(moment(this.daterange1[0]).format('YYYY,MM,DD'))
            // alert(moment(this.daterange1[1]).format('YYYY,MM,DD'))
            this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
            this.pieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
            this.lineChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
            this.waterfallFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
            this.totalAmt(moment(this.daterange1[0]).format('YYYY-MM-DD'),moment(this.daterange1[1]).format('YYYY-MM-DD'),this.config)
            // this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'), moment(this.daterange1[1]).format('YYYY,MM,DD'))
        }, 

        // selectChange() {
        //     console.log("select change")
        //     alert(this.config)
        //     this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
        //     this.pieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
        //     this.lineChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
        //     this.waterfallFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config),
        //     this.totalAmt(moment(this.daterange1[0]).format('YYYY-MM-DD'),moment(this.daterange1[1]).format('YYYY-MM-DD'),this.config)
        // },

        async getDate(days) {
          	const end = new Date();
            const start = new Date();
            await start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
            console.log("!!!!!!!!!!!!",[start, end])
            return [start, end];
          }

    },
    async mounted() {
        
        this.daterange1 = await this.getDate(91);
        console.log("daterange1",this.daterange1)
        console.log("daterange1",this.daterange1[0])
        // console.log("@@@@@@@@@@@",moment(this.daterange1[0]).format('YYYY,MM,DD'), moment(this.daterange1[0]).format('YYYY,MM,DD'))
        // console.log("&&&&&&&&&&&&&",moment(this.daterange1[1]).format('YYYY,MM,DD'))
        this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
        this.pieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
        this.lineChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
        this.waterfallFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD')),
        this.totalAmt(moment(this.daterange1[0]).format('YYYY-MM-DD'),moment(this.daterange1[1]).format('YYYY-MM-DD'))
        this.init()
    }

};
</script>

<style>
    .ivu-card-body {
        padding: 3px;
    }
</style>
