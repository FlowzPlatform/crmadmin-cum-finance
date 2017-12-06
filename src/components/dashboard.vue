<template>
         <div class="page-wrapper">
   <!-- BEGIN CONTAINER -->
   <div class="page-container">
      <!-- BEGIN SIDEBAR -->
      <!-- <div class="page-sidebar-wrapper"> -->
      <!-- BEGIN SIDEBAR -->
      <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
      <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
      <!-- <div class="page-sidebar navbar-collapse collapse"> -->
      <!-- BEGIN SIDEBAR MENU -->
      <!-- <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
         <li class="nav-item start active open">
             <a href="javascript:;" class="nav-link nav-toggle">
                 <span class="title">Dashboard</span>
             </a>
         </li>
         </ul> -->
      <!-- <div class="nav-side-menu">
         <div class="brand">Brand Logo</div>
         <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
         <div class="menu-list">
            <ul id="menu-content" class="menu-content collapse out">
               <li>
                  <a href="#">
                  <i class="fa fa-dashboard fa-lg"></i> Dashboard
                  </a>
               </li>
               <li  data-toggle="collapse" data-target="#products" class="collapsed">
                  <a href="#"><i class="fa fa-file-text-o fa-lg"></i> CRM <span class="arrow"></span></a>
               </li>
               <ul class="sub-menu collapse" id="products">
                  <li><a href="#">New CRM</a></li>
                  <li><a href="#">CRM List</a></li>
               </ul>
               <li data-toggle="collapse" data-target="#service" class="collapsed">
                  <a href="#"><i class="fa fa-shopping-bag fa-lg"></i> Accounting <span class="arrow"></span></a>
               </li>
               <ul class="sub-menu collapse" id="service" >
                  <li data-toggle="collapse" data-target="#invoice" class="collapsed"><i class="fa fa-inbox"></i> Invoice
                  </li>
                  <ul class="sub-menu collapse" id="invoice">
                     <li><a href="#">New Invoice</a></li>
                     <li><a href="#">List Invoice</a></li>
                  </ul>
                  <li data-toggle="collapse" data-target="#payment" class="collapsed"><i class="fa fa-money"></i> Payment
                  </li>
                  <ul class="sub-menu collapse" id="payment">
                     <li><a href="#">New Payment</a></li>
                     <li><a href="#">List Payment</a></li>
                  </ul>
               </ul>
            </ul>
         </div>
      </div> -->
      <!-- END SIDEBAR MENU -->
      <!-- </div> -->
      <!-- END SIDEBAR -->
      <!-- </div> -->
      <!-- END SIDEBAR -->
      <!-- BEGIN CONTENT -->
          <div class="page-content-wrapper">
                    <!-- BEGIN CONTENT BODY -->
                    <div class="page-content">
                        <!-- BEGIN PAGE HEADER-->
                        <!-- BEGIN PAGE BAR -->
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li>
                                    <span>Dashboard</span>
                                </li>
                            </ul>
                        </div>
                        <!-- END PAGE BAR -->
                        <!-- BEGIN PAGE TITLE-->
                        <h1 class="page-title"> Accounting Dashboard
                            <small>statistics, charts, recent events and reports</small>
                        </h1>
                        <!-- END PAGE TITLE-->
                        <!-- END PAGE HEADER-->
                        <!-- BEGIN DASHBOARD STATS 1-->
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <a class="dashboard-stat dashboard-stat-v2 blue" href="#">
                                    <div class="visual">
                                        <i class="fa fa-comments"></i>
                                    </div>
                                    <div class="details">
                                        <div class="number" v-model="totalAmount">
                                            <span data-counter="counterup" data-value="1349">{{totalAmount}}</span>
                                        </div>
                                        <div class="desc"> Total Amount </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <a class="dashboard-stat dashboard-stat-v2 red" href="#">
                                    <div class="visual">
                                        <i class="fa fa-bar-chart-o"></i>
                                    </div>
                                    <div class="details">
                                        <div class="number" v-model="paidAmount">
                                            <span data-counter="counterup" data-value="12,5">{{paidAmount}}</span></div>
                                        <div class="desc"> Paid Amount </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <a class="dashboard-stat dashboard-stat-v2 green" href="#">
                                    <div class="visual">
                                        <i class="fa fa-shopping-cart"></i>
                                    </div>
                                    <div class="details">
                                        <div class="number" v-model="unpaidAmount">
                                            <span data-counter="counterup" data-value="549">{{unpaidAmount}}</span>
                                        </div>
                                        <div class="desc"> Unpaid Amount </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <a class="dashboard-stat dashboard-stat-v2 purple" href="#">
                                    <div class="visual">
                                        <i class="fa fa-globe"></i>
                                    </div>
                                    <div class="details">
                                        <div class="number" v-model="draftAmount">
                                            <span data-counter="counterup" data-value="89"></span>{{draftAmount}} </div>
                                        <div class="desc"> Draft Amount </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- END DASHBOARD STATS 1-->
                          <!-- Chart Panel 1 -->
                          <div class="row">
                            <draggable :options="{group:'chart'}">
                              <div class="col-lg-6 col-xs-12 col-sm-12">
                                  <!-- BEGIN PORTLET-->
                                  <Widget>
                                    <WidgetHeading :id="4" :Title="'Bar Chart'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                                    <WidgetBody>                                    
                                        <div class="portlet-body">
                                            <div id="chart1_loading" class="display-none">
                                                <img src="../../assets/global/img/loading.gif" alt="loading" /> 
                                            </div>
                                            <div id="chart1_content">
                                                <div id="barChart" style="height:400px;"></div>
                                            </div>
                                        </div>
                                  </WidgetBody>
                                  </Widget>
                                  <!-- END PORTLET-->
                              </div>
                            </draggable>

                            <draggable :options="{group:'chart'}">
                              <div class="col-lg-6 col-xs-12 col-sm-12">
                                  <!-- BEGIN PORTLET-->
                                  <Widget>
                                    <WidgetHeading :id="2" :Title="'Pie Chart'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                                    <WidgetBody>                                    
                                        <div class="portlet-body">
                                          <div id="chart2_loading" class="display-none">
                                            <img src="../../assets/global/img/loading.gif" alt="loading" /> </div>
                                          <div id="chart2_content">
                                              <div id="pieChart" style="height:400px;"></div>
                                          </div>
                                        </div>
                                  </WidgetBody>
                                  </Widget>
                                  <!-- END PORTLET-->
                              </div>
                            </draggable>
                          </div>

                          <!-- Chart Panel 2 -->
                          <div class="row">
                            <draggable :options="{group:'chart'}">
                              <div class="col-lg-6 col-xs-12 col-sm-12">
                                  <!-- BEGIN PORTLET-->
                                  <Widget>
                                    <WidgetHeading :id="3" :Title="'Line Chart'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                                    <WidgetBody>                                    
                                        <div class="portlet-body">
                                          <div id="chart3_loading" class="display-none">
                                              <img src="../../assets/global/img/loading.gif" alt="loading" /> </div>
                                          <div id="chart3_content">
                                              <div id="lineChart" style="height:400px;"> </div>
                                          </div>
                                        </div>
                                  </WidgetBody>
                                  </Widget>
                                  <!-- END PORTLET-->
                              </div>
                            </draggable>

                            <draggable :options="{group:'chart'}">
                              <div class="col-lg-6 col-xs-12 col-sm-12">
                                  <!-- BEGIN PORTLET-->
                                  <Widget>
                                    <WidgetHeading :id="6" :Title="'Paid Amount Cashflow'" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
                                    <WidgetBody>                                    
                                        <div class="portlet-body">
                                          <div id="chart4_loading" class="display-none">
                                              <img src="../../assets/global/img/loading.gif" alt="loading" /> </div>
                                          <div id="chart4_content">
                                              <div id="waterfall" style="height: 400px;"> </div>
                                          </div>
                                        </div>
                                  </WidgetBody>
                                  </Widget>
                                  <!-- END PORTLET-->
                              </div>
                            </draggable>
                          </div>
                      

                    </div>
                    <!-- END CONTENT BODY -->
                </div>
      <!-- END CONTENT -->
   </div>
   <!-- END CONTAINER -->
  
</div>
</template>

<script scoped>
import '../../assets/global/plugins/font-awesome/css/font-awesome.min.css'
import '../../assets/global/plugins/bootstrap/css/bootstrap.min.css'
import '../../assets/global/css/components.min.css'
import '../../assets/layouts/layout/css/layout.min.css'
import '../../assets/layouts/layout/css/themes/darkblue.min.css'
import draggable from 'vuedraggable'

export default {
  name: 'dashboard',
  data () {
    return {
     barChart: '',
     totalAmount: 0,
     paidAmount: 0,
     unpaidAmount: 0,
     draftAmount: 0
    }
  },
  methods: {
      async ChartFun() {
        var chartdata
        await $.ajax({
          type: 'GET',
          url: "http://172.16.230.88:3002/api/xero/invoice/chart?name=Krishna&app=Private%20Demo%20Company&column=3",
          async: true,
          dataType: 'json',
          success: function (data) {
            chartdata = data;
            console.log("chart data",data);
          },error: function(err) {
            console.log("Error",err)
          }
        })
        return chartdata
      },
      // Bar chart
      async barChartFun() {
          // based on prepared DOM, initialize echarts instance
          var barchart = echarts.init(document.getElementById('barChart'))
          var chart_data = await this.ChartFun()
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
          barchart.setOption(option)
      },
      async PieChartFun() {
        var chartdata;
        await $.ajax({
          type: 'GET',
          url: "http://172.16.230.88:3002/api/xero/invoice/pieChart?name=Krishna&app=Private Demo Company&dategt=2017-11-1&datelt=2017-11-30",
          async: true,
          dataType: 'json',
          success: function (data) {
            chartdata = data;
            console.log("pie chart data",data);
          },error: function(err) {
            console.log("Error",err)
          }
        });
        return chartdata;
      },
      
      //Pie Chart
      async pieChartFun() {
        // based on prepared DOM, initialize echarts instance
        var piechart = echarts.init(document.getElementById('pieChart'));
        var chart_data = await this.PieChartFun();
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
        chart_data.arr.forEach(function(piedata) {
          console.log("piedata",piedata);
          option.legend.data.push(piedata.name);
          option.series[0].data.push(piedata);
        })
        // use configuration item and data specified to show chart
        piechart.setOption(option);
      },
      async lineChartFun() {
        // based on prepared DOM, initialize echarts instance
        var linechart = echarts.init(document.getElementById('lineChart'));
        var chart_data = await this.ChartFun();
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
        console.log("Inside line chart",option)
        // use configuration item and data specified to show chart
        linechart.setOption(option);
      },
      async totalAmt() {
        var statsData;
          await $.ajax({
            type: 'GET',
            url: "http://172.16.230.88:3002/api/xero/invoice/totalAmt?name=Krishna&app=Private%20Demo%20Company",
            async: true,
            dataType: 'json',
            success: function (data) {
              statsData = data;
              console.log("statsData",data);
            },error: function(err) {
              console.log("Error",err)
            }
          });
        this.totalAmount = statsData.data[0].value
        this.paidAmount = statsData.data[1].value
        this.unpaidAmount = statsData.data[2].value
        this.draftAmount = statsData.data[3].value
      },
      async waterfall() {
        var chartdata;
        await $.ajax({
          type: 'GET',
          url: "http://172.16.230.88:3002/api/xero/invoice/waterfall?name=Krishna&app=Private Global Company&column=3&status=paid",
          async: true,
          dataType: 'json',
          success: function (data) {
            chartdata = data;
            console.log("waterfall chart data",data);
          },error: function(err) {
            console.log("Error",err)
          }
        });
        return chartdata;
      },

      async waterfallFun() {
        // based on prepared DOM, initialize echarts instance
        var waterfallChart = echarts.init(document.getElementById('waterfall'));
        var chart_data = await this.waterfall();

        var data1 = [];
        var data2 = [];
        var data3 = [];
        // specify chart configuration item and data
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
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
                        position: 'top'
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
                        position: 'bottom'
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
        console.log("waterfall data_arr",data_arr);

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

        console.log("data1",data1);
        console.log("data2",data2);
        console.log("data3",data3);
        
        waterfallChart.setOption(option);
      }
  },
  mounted() {
      this.barChartFun(),
      this.pieChartFun(),
      this.lineChartFun(),
      this.totalAmt(),
      this.waterfallFun()
  }
}
</script>

<style>
.sub-menu sub-menu collapse in {
   margin-left: 10px;
}
.nav-side-menu {
  overflow: auto;
  font-family: verdana;
  text-align: left;
  font-size: 15px;
  font-weight: 200;
  background-color: #010a0f;
  position: fixed;
  top: 0px;
  width: 242px;
  top:60px;
  height: 100%;
  color: #e1ffff;
}
.nav-side-menu .brand {
  background-color: #010a0f;
  line-height: 50px;
  display: block;
  text-align: center;
  font-size: 14px;
}
.nav-side-menu .toggle-btn {
  display: none;
}
.nav-side-menu ul,
.nav-side-menu li {
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 35px;
  cursor: pointer;
  /*    
    .collapsed{
       .arrow:before{
                 font-family: FontAwesome;
                 content: "\f053";
                 display: inline-block;
                 padding-left:10px;
                 padding-right: 10px;
                 vertical-align: middle;
                 float:right;
            }
     }
*/
}
.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
  font-family: FontAwesome;
  content: "\f078";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
  float: right;
}
.nav-side-menu ul .active,
.nav-side-menu li .active {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
  background-color: #07161e;
  border: none;
  line-height: 28px;
  border-bottom: 1px solid #23282e;
  margin-left: 0px;
}
.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
  background-color: #020203;
}
.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
  font-family: FontAwesome;
  content: "";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
}
.nav-side-menu li {
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
  padding: 14px 0px;
  
}
.nav-side-menu li a {
  text-decoration: none;
  color: #fff;
  
}
.nav-side-menu li a i {
  padding-left: 10px;
  width: 20px;
  padding-right: 20px;
}
.nav-side-menu li:hover {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
@media (max-width: 767px) {
  .nav-side-menu {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }
  .nav-side-menu .toggle-btn {
    display: block;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10 !important;
    padding: 3px;
    background-color: #ffffff;
    color: #000;
    width: 40px;
    text-align: center;
  }
  .brand {
    text-align: left !important;
    font-size: 22px;
    padding-left: 20px;
    line-height: 50px !important;
  }
}
@media (min-width: 767px) {
  .nav-side-menu .menu-list .menu-content {
    display: block;
  }
}
body {
  margin: 0px;
  padding: 0px;
}
.sub-menu .sub-menu li {padding-left: 10px}

.menu-content.collapse li .arrow:before{content: "\f078";}
.menu-content.collapse  li.collapsed .arrow:before{content: "\f054";}

.nav-side-menu ul.menu-content > .sub-menu > li[data-toggle="collapse"]:before{content: "\f107";}
.nav-side-menu ul.menu-content > .sub-menu > li.collapsed[data-toggle="collapse"]:before{content: "\f105";}

.page-content{
    margin-left: 0px !important;
}
</style>