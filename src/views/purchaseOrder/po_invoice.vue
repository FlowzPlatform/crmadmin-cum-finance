<template>
	<div>
		<div style="width: 100%;text-align: right;">
			<h4 class="panel-title" style="text-align:right;display: inline-block;">
				<a data-toggle="collapse" data-parent="#accordion13" href="#collapseTwo">
					<button class="btn btn-default btn-sm" type="button">
						<span class="glyphicon glyphicon-filter"></span> Filter 
					</button>
				</a>
			</h4>
		</div>
			<div class="panel panel-default panel-group" id="accordion13" style="border: none;margin-top:1%;text-align: left;font-size:10px;">
				<div class="panel-collapse collapse" id="collapseTwo">
					<div class="panel-body">
						<form>
							<div class="collapse-maindiv maindiv" >
								<div class="panel panel-default">
									<div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#po"></span>
										<label>PO Number</label>
									</div>
									<div class="panel-collapse collapse" id="po">
										<AutoComplete v-model="ponum" :data="ponumFilter" :filter-method="filterMethod" placeholder="input here" clearable>
										</AutoComplete>
									</div>
								</div>
								<div class="panel panel-default">
									<div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#invoice"></span>
										<label>Invoice Number</label>
									</div>
									<div class="panel-collapse collapse" id="invoice">
										<AutoComplete v-model="invoicenum" :data="invoicenumFilter" :filter-method="filterMethod" placeholder="input here" clearable>
										</AutoComplete>
									</div>
								</div>
								<div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                      data-target="#date"></span>
                                      <label>Date</label>
                                  </div>
                                  <div class="form-group row panel-collapse collapse" id="date">
                                      <div class="col-xs-3">
                                        <label>From Date</label>
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="dategt" style="width: 100%;"></DatePicker>
                                      </div>
                                      <div class="col-xs-3">
                                        <label>To Date</label>
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="datelt" style="width: 100%;"></DatePicker>
                                      </div>
                                  </div>
                              </div>
							  <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                      data-target="#duedate"></span>
                                      <label>Due Date</label>
                                  </div>
                                  <div class="form-group row panel-collapse collapse" id="duedate">
                                      <div class="col-xs-3">
                                        <label>From Date</label>
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="duedategt" style="width: 100%;"></DatePicker>
                                      </div>
                                      <div class="col-xs-3">
                                        <label>To Date</label>
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="duedatelt" style="width: 100%;"></DatePicker>
                                      </div>
                                  </div>
                              </div>
							  <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#supplier"></span>
                                      <label>Supplier</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="supplier">
                                      <select class="form-control"  v-model="email" id="selectEmail">
                                        <option value="">All</option>
                                      </select>
                                  </div>
                              </div>
								<div style="margin-top: 5px;">
									<Button type="warning" @click= "reset()" style= "float:right;margin-right: 5px;">Reset</Button>
									<Button type="primary" @click= "changeData()" style= "float:right;    margin-right: 5px;">Apply</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		
		<Table stripe :columns="columns1" :data="list"></Table>
		<div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
            </div>
        </div>

	</div>
</template>
<script>
import config from '../../config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';
import money from '../../images/Payment.png'
import _ from 'lodash';
import psl from 'psl';
var crmpostapiurl = config.default.serviceUrl;
import expandRow from './view-po_invoice.vue';

export default {
  data(){
    return {
      money,
      ponum: '',
	  ponumFilter: [],
	  invoicenum: '',
	  invoicenumFilter: [],
	  optionsPage:[10,20,50,100,200],
	  dategt: '',
	  datelt: '',
	  email: '',
	  pageSize: 10,
	  duedategt: '',
	  duedatelt: '',
      columns1:[
		{
			type: 'expand',
			width: 50,
			render: (h, params) => {
				return h(expandRow, {
					props: {
						row: params.row
					}
				})
			}
		},
        {
          title: 'Invoice Number',
          align:  'center',
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.invoiceId)
              ]);
          }
        },
        {
          title: 'P.O. Number',
          align:  'center',
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.PO_id)
              ]);
          }
        },
        {
          title: 'Total Amount',
          align:  'center',
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.total_amount)
              ]);
          }
        },
        {
          title: 'Supplier',
          align:  'center',
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.supplier_email)
              ]);
          }
        },
        {
          title: 'Date',
          align:  'center',
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.createdAt)
              ]);
          }
        },
        {
          title: 'Due Date',
          align:  'center',
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.dueDate)
              ]);
          }
        },
        {
          title: 'Status',
          align:  'center',
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.status)
              ]);
          }
        },
        {
          title: 'Action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            console.log("params-------------------------------------->",params.row.status)
            if(params.row.status == 'pending'){
              return h('div', [
                h('Tooltip', {
                  props: {
                    placement: 'top',
                    content: 'Pay Now'
                  },
                  style:{
                    cursor:'pointer'
                  }
                },[
                    h('img', {
                      attrs: {
                        src:this.money
                      },
                      style: {
                        height:'20px',
                        width:'20px',
                        margin: '2px'
                      },
                      on: {
                        click: () => {
                          this.makepayment(row )
                        }
                      }
                    },'')
                  ]),          
              ]);
            }else{
               return h('div', [
                h('Tooltip', {
                  props: {
                    placement: 'top',
                    content: 'Pay Now'
                  },
                  style:{
                    cursor:'pointer'
                  }
                },[
                    h('Checkbox', {
                      props: {
                        value: true
                      },
                      on: {
                        input: (val) => {
                          console.log("val",val)
                        }
                      }
                    },'mark as a paid')
                  ]),          
              ]);
            }
					}
				}
      ],
	  list:[],
	  data: [],
	  len: 1
    }
  },
  methods:{
	async reset(){
		this.ponum = '';
		this.dategt = '';
		this.datelt = '';
		this.duedatelt = '';
		this.duedategt = '';
		this.email = '';
		this.invoicenum = '';
		this.init();
	},
	async changepagesize(pageSize){
		console.log("####################################",pageSize)
		this.pageSize = pageSize
		this.changePage(1)
	},
	async mockTableData1 (p,size) {
		this.len = this.data.length
		return this.data.slice((p - 1) * size, p * size);
	},
	async mockTableData2 (p,size) {
		console.log("p-------------->",p)
		console.log("p-------------->",size)
		console.log("console.log------------>",this.filterArray)
		this.len = this.filterArray.length
		return this.filterArray.slice((p - 1) * size, p * size);
	},
	async changePage (p) {
		var self = this
		console.log("not inside",self.filterArray.length)
		if(self.filterArray.length == 0){
			console.log("inside",self.filterArray)
			self.list = await self.mockTableData1(p,self.pageSize);
		}else{
			self.list = await self.mockTableData2(p,self.pageSize);
		}
	},
	async changeData() {
		this.filterArray = this.data
        var self = this

        if(this.ponum != ''){
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)
            return item.PO_id === self.ponum;
          });
		  console.log("myarr",this.filterArray)
		//   this.list = this.filterArray
          this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.invoicenum != ''){
          this.filterArray = _.filter(this.filterArray,  function(item){
            return item.invoiceId === self.invoicenum;
		  });
		//    this.list = this.filterArray
           this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.dategt != ''){
          console.log("this.dategt", this.dategt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            if(moment(item.createdAt).diff(moment(self.dategt).format(), 'days') >= 0){
                console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                return item;
            }
          });
		  console.log("myarr",this.filterArray)
		//   this.list = this.filterArray
          this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.datelt != ''){
          console.log("this.datelt", this.datelt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item.DueDate)
              if(moment(item.createdAt).diff(moment(self.datelt).format(), 'days') <= 0){
              return item;
              }
          });
		   console.log("myarr",this.filterArray)
		//    this.list = this.filterArray
        	this.list = await this.mockTableData2(1,self.pageSize)
		}
		
		if(this.duedategt != ''){
          console.log("this.dategt", this.dategt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            if(moment(item.dueDate).diff(moment(self.duedategt).format(), 'days') >= 0){
                console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                return item;
            }
          });
		  console.log("myarr",this.filterArray)
		//   this.list = this.filterArray
        	this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.duedatelt != ''){
          console.log("this.datelt", this.datelt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item.DueDate)
              if(moment(item.dueDate).diff(moment(self.duedatelt).format(), 'days') <= 0){
              return item;
              }
          });
		   console.log("myarr",this.filterArray)
		//    this.list = this.filterArray
         this.list = await this.mockTableData2(1,self.pageSize)
		}
		
		if(this.email != ''){
			this.filterArray = _.filter(this.filterArray, function (item) {
				return item.supplier_email === self.email
			})
		}


    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    async init(){
      var self = this
      axios({
        method:'get',
        url: crmpostapiurl + 'po-invoice',
        headers:{
        }
      })
      .then(async function(response) {
		console.log('response-------------->',response)
		self.data = _.orderBy(response.data.data, ['createdAt'], ['desc']);
		self.list = await self.mockTableData1(1,self.pageSize)
		var Emailarr = [];
        $('#selectEmail').children('option:not(:first)').remove();
        self.data.forEach(item => {
		  self.ponumFilter.push(item.PO_id)
		  self.invoicenumFilter.push(item.invoiceId)
		   Emailarr.push(item.supplier_email);
		})
		
		Emailarr.forEach(item => {
			var x = document.getElementById("selectEmail");
			var option = document.createElement("option");
			option.text = item;
			console.log()
			x.add(option);
		})
        console.log('response-------------->list',self.list)
        
      }).catch(function (error){
        console.log("error------------------->",error)
      })
    }
  },
  mounted(){
    this.init();
  }
}
</script>

