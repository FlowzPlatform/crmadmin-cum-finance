<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="5" :style="{marginTop: '10px'}">
            <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="totalInv_count"
                    :end-val="count.totalInv"
                    iconType="ios-calendar-outline"
                    color="#E7A6C9"
                    intro-text="Total Invoices"
                ></infor-card>
            </Col>
            <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="total_count"
                    :end-val="count.total"
                    iconType="social-usd"
                    color="#2d8cf0"
                    intro-text="Total Amount"
                ></infor-card>
            </Col>
            <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="paid_count"
                    :end-val="count.paid"
                    iconType="social-usd"
                    color="#64d572"
                    intro-text="Paid Amount"
                ></infor-card>
            </Col>
            <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="unpaid_count"
                    :end-val="count.unpaid"
                    iconType="social-usd"
                    color="#ffd572"
                    intro-text="Unpaid Amount"
                ></infor-card>
            </Col>
            <Col :xs="24" :sm="12" :md="5" :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="draft_count"
                    :end-val="count.draft"
                    iconType="social-usd"
                    color="#f25e43"
                    intro-text="Draft Amount"
                ></infor-card>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :md="24" :lg="24" :sm="12">
                <Row :style="{border: '1px solid #ddd', borderRadius: '5px', backgroundColor: 'whitesmoke'}">
                    <Col :xs="24" :sm="2" :md="2" :style="{marginBottom: '10px', marginTop: '10px'}">

                    </col>
                    <Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px', marginTop: '10px'}">
                        <Select v-model="config" style="width:200px;" placeholder="Select Config" @on-change="getContacts">
                            <Option v-for="item in mData" :value="item.id" :key="item.id" >{{ item.configName }}</Option>
                        </Select>
                    </col>
                    <Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px', marginTop: '10px'}">
                        <Select v-model="contacts" style="width:200px;" placeholder="Select Contacts" >
                            <Option v-for="item in contactData" :value="item.Id" :key="item.Id" >{{ item.Name }}</Option>
                        </Select>
                    </col>
                    <Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px', marginTop: '10px'}">
                        <DatePicker id="datepicker" type="daterange" :options="dateoptions" placeholder="Select date" style="width: 200px" v-model="daterange1" :clearable="false"></DatePicker>
                    </col>
                    <Col :xs="24" :sm="6" :md="2" :style="{marginBottom: '10px', marginTop: '10px'}">
                        <Button type="primary" @click="changeFilter">Apply</Button>
                    </col>
                    <Col :xs="24" :sm="1" :md="2" :style="{marginBottom: '10px', marginTop: '10px'}">

                    </col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="12">
                <draggable :options="{group:'chart'}">

                    <!-- BEGIN PORTLET-->
                    <Widget>
                    <WidgetHeading :id="4" :Title="'Invoice Amount'" :HeaderEditable="false" :TextColor="true" :ColorBox="true" :Collapse="true"></WidgetHeading>
                    <WidgetBody>
                        <div class="portlet-body">
                            <div id="chart1_content" style="height: 300px;">
                                <div style="width:100%;height:100%;" id="barChart1">
                                    <barChart :row="barChartData" :barchart="barChartDom"></barChart>
                                </div>
                            </div>
                        </div>
                    </WidgetBody>
                    </Widget>
                    <!-- END PORTLET-->

                </draggable>
            </Col>
            <Col :md="24" :lg="12">
                    <draggable :options="{group:'chart'}">
                        <!-- BEGIN PORTLET-->
                        <Widget>
                        <WidgetHeading :id="2" :Title="'Invoice Amount'" :HeaderEditable="false" :TextColor="true" :ColorBox="true"x :Collapse="true"></WidgetHeading>
                        <WidgetBody>
                            <div class="portlet-body">
                                <div id="chart2_content" style="height: 300px;">
                                    <div style="width:100%;height:100%;" id="pieChart1">
                                        <pieChart :row="pieChartData" :piechart="pieChartDom"></pieChart>
                                    </div>
                                </div>
                            </div>
                        </WidgetBody>
                        </Widget>
                        <!-- END PORTLET-->
                    </draggable>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :md="24" :lg="24" :sm="12">
                <Row :style="{border: '1px solid #ddd', borderRadius: '5px', backgroundColor: 'whitesmoke'}">
                    <Col :xs="24" :sm="8" :md="8" :style="{marginBottom: '10px', marginTop: '10px'}">
                    </col>
                    <Col :xs="24" :sm="10" :md="10" :style="{marginBottom: '10px', marginTop: '10px'}">
                        <label>Website : </label>
                        <Select v-model="website" style="width:200px;" placeholder="Select Contacts" >
                            <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId" >{{ item.websiteName }}</Option>
                        </Select>
                    </col>
                    <Col :xs="24" :sm="10" :md="4" :style="{marginBottom: '10px', marginTop: '10px'}">
                        <Button type="primary" @click="changeFilter">Apply</Button>
                    </col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="12">
                <draggable :options="{group:'chart'}">
                        <!-- BEGIN PORTLET-->
                        <Widget>
                        <WidgetHeading :id="3" :Title="'Invoice Amount'" :HeaderEditable="false" :TextColor="true" :ColorBox="true"x :Collapse="true"></WidgetHeading>
                        <WidgetBody>
                            <div class="portlet-body">
                                <div id="chart3_content" style="height: 300px;">
                                    <div style="width:100%;height:100%;" id="lineChart1">
                                        <lineChart :row="lineChartData" :linechart="lineChartDom"></lineChart>
                                    </div>
                                </div>
                            </div>
                        </WidgetBody>
                        </Widget>
                        <!-- END PORTLET-->
                </draggable>
            </Col>
            <Col :md="24" :lg="12">
                <draggable :options="{group:'chart'}">
                    <!-- BEGIN PORTLET-->
                    <Widget>
                    <WidgetHeading :id="6" :Title="'Paid Amount Cashflow'" :HeaderEditable="false" :TextColor="true" :ColorBox="true"x :Collapse="true"></WidgetHeading>
                    <WidgetBody>
                        <div class="portlet-body">
                            <div id="chart4_content" style="height: 300px;">
                                <div style="width:100%;height:100%;" id="waterfallChart1">
                                    <waterfallChart :row="waterfallChartData" :waterfallchart="waterfallChartDom"></waterfallChart>
                                </div>
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
    import countUp from './components/countUp.vue';
    import inforCard from './components/inforCard.vue';
    import draggable from 'vuedraggable'
    import Cookies from 'js-cookie';
    import moment from 'moment';
    import axios from 'axios';
    const _ = require('lodash');
    const accounting = require('accounting-js');
    import psl from 'psl';

    import pieChart from './components/pieChart.vue'
    import barChart from './components/barChart.vue'
    import lineChart from './components/lineChart.vue'
    import waterfallChart from './components/waterfallChart.vue'

    import configService from '@/config/customConfig.js';
    let serviceUrl = configService.default.serviceUrl;

    export default {
        name: 'home',

        components: {
            countUp,
            inforCard,
            draggable,
            pieChart,
            barChart,
            lineChart,
            waterfallChart
        },
        data () {
            return {
                pieChartData: [],
                barChartData: [],
                lineChartData: [],
                waterfallChartData: [],
                barChartDom : {},
                pieChartDom : {},
                lineChartDom : {},
                waterfallChartDom : {},
                websiteList: {},
                website: '',
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
                contacts : '',
                contactData : [],
                mData: [],
                dateoptions: {
                    shortcuts: [
                        {
                            text: 'Last month',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                let s = start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
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
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 181);
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
            async ChartFun(chart,date1,date2,settingId,settingName,contact) {
                let self = this;
                let chartdata;
                await axios.get(serviceUrl+"invoice", {
                    params: {
                        chart : chart,
                        date1 : date1,
                        date2 : date2,
                        settingId : settingId,
                        contact : contact
                    }
                })
                .then(function (response) {
                    chartdata = response.data[0].data;
                    // chartdata.reverse();
                    console.log("chart data",chartdata)
                })
                .catch(function (error) {
                    console.log("error",error.response);
                    self.$Loading.error()
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain

                        Cookies.remove('auth_token' ,{domain: location})
                        Cookies.remove('subscriptionId' ,{domain: location})
                        self.$store.commit('logout', self);

                        self.$router.push({
                            name: 'login'
                        });
                        // self.$Notice.error({
                        //     title: error.response.data.name,
                        //     desc: error.response.data.message,
                        //     duration: 10
                        // })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                        self.$Notice.error({
                            title: error.response.statusText,
                            desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                            duration: 4.5
                        })
                    } else if (error.response.data.name === 'GeneralError') {
                        self.$Notice.error({
                            title: 'Credential Error',
                            desc: 'Account credential incorrect for <b>'+settingName+'</b>',
                            duration: 10
                        })

                    } else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }

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
            async barChartFun(date1,date2,settingId,settingName,contact) {
                // based on prepared DOM, initialize echarts instance
                let barchart = echarts.init(document.getElementById('barChart'))
                barchart.showLoading();
                let chart_data = await this.ChartFun("bar",date1,date2,settingId,settingName,contact)
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
                barchart.hideLoading();
                barchart.setOption(option)
            },
            //Pie Chart
            async PieChartFun(date1,date2,settingId,settingName,contact) {
                let chartdata;
                let self = this;
                await axios.get(serviceUrl+"invoice", {
                    params: {
                        chart : 'pie',
                        date1 : date1,
                        date2 : date2,
                        settingId : settingId,
                        contact : contact
                    }
                })
                .then(function (response) {
                    chartdata = response.data[0].data;
                    // chartdata.reverse();
                    console.log("pie chart data",chartdata)
                })
                .catch(function (error) {
                    console.log("error",error);
                    if (error.response.data.message === 'invalid_grant') {
                        self.$Notice.error({
                            duration:0,
                            title: "QB : Credential Expired",
                            desc: "Token is expired for " + settingName
                        });
                    } else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain

                        Cookies.remove('auth_token' ,{domain: location})
                        Cookies.remove('subscriptionId' ,{domain: location})
                        self.$store.commit('logout', self);

                        self.$router.push({
                            name: 'login'
                        });
                        // self.$Notice.error({
                        //     title: error.response.data.name,
                        //     desc: error.response.data.message,
                        //     duration: 10
                        // })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                        self.$Notice.error({
                            title: error.response.statusText,
                            desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                            duration: 4.5
                        })
                    } else if (error.response.data.name === 'GeneralError') {
                        self.$Notice.error({
                            title: 'Credential Error',
                            desc: 'Account credential incorrect for <b>'+settingName+'</b>',
                            duration: 10
                        })

                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                });
                return chartdata;
            },
            async pieChartFun(date1,date2,settingId,settingName,contact) {
                // based on prepared DOM, initialize echarts instance
                // document.getElementById('chart2_loading').style = "display:block"
                let piechart = echarts.init(document.getElementById('pieChart'));
                piechart.showLoading();
                let chart_data = await this.PieChartFun(date1,date2,settingId,settingName,contact);
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
                piechart.hideLoading();
                piechart.setOption(option);
            },
            async lineChartFun(date1,date2,settingId,settingName,contact) {
                // based on prepared DOM, initialize echarts instance
                let linechart = echarts.init(document.getElementById('lineChart'));
                linechart.showLoading();
                let chart_data = await this.ChartFun("line",date1,date2,settingId,settingName,contact);
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
                linechart.hideLoading();
                linechart.setOption(option);
            },
            //Cashflow
            async waterfall(date1,date2,settingId,settingName,contact) {
                let chartdata;
                let self = this
                await axios.get(serviceUrl+"invoice", {
                    params: {
                        chart : 'cashflow',
                        status : 'Paid',
                        date1 : date1,
                        date2 : date2,
                        settingId : settingId,
                        contact : contact
                    }
                })
                .then(function (response) {
                    chartdata = response.data[0].data;
                    console.log("waterfall chart data",chartdata)
                })
                .catch(function (error) {
                    console.log("error",error);
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain

                        Cookies.remove('auth_token' ,{domain: location})
                        Cookies.remove('subscriptionId' ,{domain: location})
                        self.$store.commit('logout', self);

                        self.$router.push({
                            name: 'login'
                        });
                        // self.$Notice.error({
                        //     title: error.response.data.name,
                        //     desc: error.response.data.message,
                        //     duration: 10
                        // })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                        self.$Notice.error({
                            title: error.response.statusText,
                            desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                            duration: 4.5
                        })
                    } else if (error.response.data.name === 'GeneralError') {
                        self.$Notice.error({
                            title: 'Credential Error',
                            desc: 'Account credential incorrect for <b>'+settingName+'</b>',
                            duration: 10
                        })

                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                });
                return chartdata;
            },
            async waterfallFun(date1,date2,settingId,settingName,contact) {
                // based on prepared DOM, initialize echarts instance
                let waterfallChart = echarts.init(document.getElementById('waterfall'));
                waterfallChart.showLoading();
                let chart_data = await this.waterfall(date1,date2,settingId,settingName,contact);

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
                waterfallChart.hideLoading();
                waterfallChart.setOption(option);
            },

            async totalAmt(date1,date2,settingId,settingName,contact) {
                let statsData;
                let self = this
                await axios.get(serviceUrl+"invoice", {
                    params: {
                        stats : true,
                        date1 : date1,
                        date2 : date2,
                        settingId : settingId,
                        contact : contact
                    }
                })
                .then(function (response) {
                    statsData = response.data[0].data;
                    // statsdata.reverse();
                    console.log("statsData",statsData)
                })
                .catch(function (error) {
                    console.log("error",error);
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain

                        Cookies.remove('auth_token' ,{domain: location})
                        Cookies.remove('subscriptionId' ,{domain: location})
                        self.$store.commit('logout', self);

                        self.$router.push({
                            name: 'login'
                        });
                        // self.$Notice.error({
                        //     title: error.response.data.name,
                        //     desc: error.response.data.message,
                        //     duration: 10
                        // })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                        self.$Notice.error({
                            title: error.response.statusText,
                            desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                            duration: 4.5
                        })
                    } else if (error.response.data.name === 'GeneralError') {
                        self.$Notice.error({
                            title: 'Credential Error',
                            desc: 'Account credential incorrect for <b>'+settingName+'</b>',
                            duration: 10
                        })

                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                });
                this.count.total = statsData[0].value
                this.count.paid = statsData[1].value
                this.count.unpaid = statsData[2].value
                this.count.draft = statsData[3].value
                this.count.totalInv = statsData[4].value
            },

            async getContacts() {
                let self = this;
                self.contactData = [];
                await axios({
                    method:'get',
                    url: serviceUrl + 'settings/'+self.config,
                    headers:{
                        Authorization : Cookies.get('auth_token'),
                        subscriptionId : Cookies.get('subscriptionId')
                    }
                })
                .then(async function(response) {
                    console.log("setting response",response)
                    if(response.data.domain == 'custom'){

                        let customCustomerUrl = response.data.customer_url;

                        axios({
                            method: 'get',
                            url: customCustomerUrl,
                            params : {
                                settingId : response.data.id
                            },
                            headers:{
                                Authorization : Cookies.get('auth_token')
                            }
                        })
                        .then(function (response) {
                            self.contactData = [];
                            // console.log("customcontact response",response)
                            let contacts = response.data;
                            // console.log("%%%%%%%%%%",contacts.data.length)
                            let cnt = {
                                Id : 'All',
                                Name : 'All'
                            };
                            self.contactData.push(cnt)
                            for (let i=0; i<contacts.data.length; i++) {
                                cnt = {
                                    Id : contacts.data[i].Name,
                                    Name : contacts.data[i].Name
                                }
                                self.contactData.push(cnt)
                            }
                            self.contacts = 'All'
                            // resp = response.data.data
                        })
                        .catch(function (error) {
                            console.log(error.response)
                            // self.$Message.error(error.response.data.data[0].message)
                            if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain

                                Cookies.remove('auth_token' ,{domain: location})
                                Cookies.remove('subscriptionId' ,{domain: location})
                                self.$store.commit('logout', self);

                                self.$router.push({
                                    name: 'login'
                                });
                                // self.$Notice.error({
                                //     title: error.response.data.name,
                                //     desc: error.response.data.message,
                                //     duration: 10
                                // })
                            }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                                self.$Notice.error({
                                    title: error.response.statusText,
                                    desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                                    duration: 4.5
                                })
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });

                    }else{
                        axios.get(serviceUrl+"contacts", {
                        params: {
                            settingId : self.config
                        }
                        })
                        .then(function(response) {
                            self.contactData = [];
                            // console.log("before self.contactData",self.contactData);
                            let contacts = response.data[0];
                            // console.log("%%%%%%%%%%",contacts.data.length)
                            let cnt = {
                                Id : 'All',
                                Name : 'All'
                            };
                            self.contactData.push(cnt)
                            for (let i=0; i<contacts.data.length; i++) {
                                if (contacts.data[i].DisplayName) {
                                    cnt = {
                                        Id : contacts.data[i].Id,
                                        Name : contacts.data[i].DisplayName
                                    }
                                }
                                else {
                                    cnt = {
                                        Id : contacts.data[i].Name,
                                        Name : contacts.data[i].Name
                                    }
                                }
                                self.contactData.push(cnt)
                            }
                            self.contacts = 'All'
                            // console.log("after self.contactData",self.contactData);
                        })
                        .catch(function(error) {
                            console.log("Inside getcontact error",error)
                            if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain

                                Cookies.remove('auth_token' ,{domain: location})
                                Cookies.remove('subscriptionId' ,{domain: location})
                                self.$store.commit('logout', self);

                                self.$router.push({
                                    name: 'login'
                                });
                                // self.$Notice.error({
                                //     title: error.response.data.name,
                                //     desc: error.response.data.message,
                                //     duration: 10
                                // })
                            }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                                self.$Notice.error({
                                    title: error.response.statusText,
                                    desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                                    duration: 4.5
                                })
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        })
                    }
                });
            },

            async init() {
                let self = this
                if(Cookies.get('auth_token')){
                    axios({
                        method: 'get',
                        url: configService.default.userDetail,
                        headers: {'Authorization': Cookies.get('auth_token')}
                    })
                    .then(function(result) {
                        console.log(">>>>>>>>>>>>>>>> " , result)
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain
                        Cookies.set('user',  result.data.data.email  , {domain: location});
                    }).catch(function (error){
                        if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain

                            Cookies.remove('auth_token' ,{domain: location})
                            Cookies.remove('subscriptionId' ,{domain: location})
                            self.$store.commit('logout', self);

                            self.$router.push({
                                name: 'login'
                            });
                            // self.$Notice.error({
                            //     title: error.response.data.name,
                            //     desc: error.response.data.message,
                            //     duration: 10
                            // })
                        }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                            self.$Notice.error({
                                title: error.response.statusText,
                                desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                                duration: 4.5
                            })
                        }else {
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }
                    })
                }

                this.name = await Cookies.get('user');
                //console.log("Cookies.get('auth_token')",Cookies.get('auth_token'));
                let resp;
                await axios.get(serviceUrl+"settings", {
                    params: {
                        isActive : true,
                        //user : Cookies.get('user')
                    },
                    headers: {
                        Authorization : Cookies.get('auth_token'),
                        subscriptionId : Cookies.get('subscriptionId')
                    }
                })
                .then(async function (response) {

                    if (response.data.data.length != 0){

                        let arrIndex = _.findIndex(response.data.data, function(o) { return o.domain == 'custom'; });
                        if(arrIndex != -1){
                            response.data.data.push(response.data.data.splice(arrIndex, 1)[0]);
                        }


                        //     let arr = response.data.data;
                        //    arr.push(arr.splice(arr.indexOf(6), 1)[0]);
                            self.mData = response.data.data;
                            self.config = self.mData[0].id;
                            self.getContacts(self.config)
                            console.log("self.mData[0].id------------",self.mData[0].id,self.mData[0].configName)
                            // self.barChartFun(moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName),
                            // self.pieChartFun(moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName),
                            // self.lineChartFun(moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName),
                            // self.waterfallFun(moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName),
                            // self.totalAmt(moment(self.daterange1[0]).format('YYYY-MM-DD'),moment(self.daterange1[1]).format('YYYY-MM-DD'),self.config,self.mData[0].configName)
                            // self.pieChartData = await self.PieChartFun(moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName)
                            // self.barChartData = await self.ChartFun("bar",moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName)
                            // self.lineChartData = await self.ChartFun("line",moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName)
                            // self.waterfallChartData = await self.waterfall(moment(self.daterange1[0]).format('YYYY,MM,DD'),moment(self.daterange1[1]).format('YYYY,MM,DD'),self.config,self.mData[0].configName)
                    }else{
                        setTimeout(function(){
                                self.$Modal.warning({
                                    title: 'No Configuration available',
                                    okText : "Go to Settings",
                                    content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
                                    onOk: () => {
                                        self.$router.push({
                                            name: 'Settings'
                                        })
                                    }
                                });
                        },2000)
                    }

                })
                .catch(function (error) {
                    self.disabled = false;
                    if(error.message == 'Network Error'){
                        self.$Notice.error({
                            title: "Error",
                            desc: 'API service unavailable',
                            duration: 10
                        })
                    }else if(error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain

                        Cookies.remove('auth_token' ,{domain: location})
                        self.$store.commit('logout', self);

                        self.$router.push({
                            name: 'login'
                        });
                        // self.$Notice.error({
                        //     title: error.response.data.name,
                        //     desc: error.response.data.message,
                        //     duration: 10
                        // })
                    }
                    else if(error.response.status == 403){
                        self.$Notice.error({
                            duration:0,
                            title: error.response.statusText,
                            desc:error.response.data.message+'. Please <a href="'+configService.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                        });
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }

                });
            },

            async changeFilter() {
                let self = this;
                // console.log("daterange",this.daterange1, typeof this.daterange1)
                // alert(moment(this.daterange1[0]).format('YYYY,MM,DD'))
                // alert(moment(this.daterange1[1]).format('YYYY,MM,DD'))
                // let index = _.indexOf(this.mData, this.config);
                let ConfigName = _.filter(this.mData , function(o){
                    return o.id == self.config
                });
                let configName = ConfigName[0].configName;
                console.log("configName",configName)
                this.barChartDom.showLoading();
                this.pieChartDom.showLoading();
                this.lineChartDom.showLoading();
                this.waterfallChartDom.showLoading();
                if (this.contacts == 'All') {
                    // this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName),
                    // this.pieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName),
                    // this.lineChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName),
                    // this.waterfallFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName),
                    this.totalAmt(moment(this.daterange1[0]).format('YYYY-MM-DD'),moment(this.daterange1[1]).format('YYYY-MM-DD'),this.config,configName)
                    this.pieChartData = await this.PieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName)
                    this.barChartData = await this.ChartFun("bar",moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName)
                    this.lineChartData = await this.ChartFun("line",moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName)
                    this.waterfallChartData = await this.waterfall(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName)
                }
                else {
                    // this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts),
                    // this.pieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts),
                    // this.lineChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts),
                    // this.waterfallFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts),
                    this.totalAmt(moment(this.daterange1[0]).format('YYYY-MM-DD'),moment(this.daterange1[1]).format('YYYY-MM-DD'),this.config,configName,this.contacts)
                    this.pieChartData = await this.PieChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts)
                    this.barChartData = await this.ChartFun("bar",moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts)
                    this.lineChartData = await this.ChartFun("line",moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts)
                    this.waterfallChartData = await this.waterfall(moment(this.daterange1[0]).format('YYYY,MM,DD'),moment(this.daterange1[1]).format('YYYY,MM,DD'),this.config,configName,this.contacts)
                }
                // this.barChartFun(moment(this.daterange1[0]).format('YYYY,MM,DD'), moment(this.daterange1[1]).format('YYYY,MM,DD'))
            },

            async getDate(days) {
                const end = new Date();
                const start = new Date();
                await start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
                console.log("!!!!!!!!!!!!",[start, end])
                return [start, end];
            },

            myOrderData() {
                axios({
                    method: 'get',
                    url: configService.default.subscriptionWebsitesapi,
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'subscriptionId': Cookies.get('subscriptionId')
                    } 
                })
                .then((response) => {
                    console.log("------------------------response",response);
                    if(response.data.data.length == 0){
                      console.log("in if condition")
                      this.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{
                        var result = _.uniqBy(response.data.data,'websiteId')
                        console.log("result", result)
                        this.websiteList = result
                        console.log("this.websiteList", this.websiteList[0].websiteId)                    
                        this.website = this.websiteList[0].websiteId
                        axios.get( configService.default.orderapi , {
                            params: {
                                website_id: this.website
                            },
                        }).then(async (response) => {
                            console.log('myorder response---',response.data.data)
                            let orderData = response.data.data;
                            if (orderData.length != 0) {
                                orderData.forEach((order) => {
                                    
                                })
                            }
                        })
                    }                       

                }).catch((error) => {
                    console.log("-------",error.response);
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain
                        
                        Cookies.remove('auth_token' ,{domain: location}) 
                        Cookies.remove('subscriptionId' ,{domain: location}) 
                        self.$store.commit('logout', self);
                        
                        self.$router.push({
                            name: 'login'
                        });
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                        self.$Notice.error({
                            title: error.response.statusText,
                            desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                            duration: 0
                        })
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                });
            }


        },
        async mounted() {

            let self = this
            this.daterange1 = await this.getDate(91);
            // console.log("daterange1",this.daterange1)
            // console.log("daterange1",this.daterange1[0])
            setTimeout(function() {
                self.init()
                self.barChartDom = echarts.init(document.getElementById('barChart1'))
                self.barChartDom.showLoading();
                self.pieChartDom = echarts.init(document.getElementById('pieChart1'));
                self.pieChartDom.showLoading();
                self.lineChartDom = echarts.init(document.getElementById('lineChart1'));
                self.lineChartDom.showLoading();
                self.waterfallChartDom = echarts.init(document.getElementById('waterfallChart1'));
                self.waterfallChartDom.showLoading();
            }, 2000);
            this.myOrderData();
        }

    };
</script>
