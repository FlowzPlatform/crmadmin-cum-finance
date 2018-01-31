<template>
  <div>
	<div v-if="spinShow">
                <Spin size="large"></Spin>
	</div>
	<div v-else>
		
		<Tabs  @on-click="tabClicked" :value="tabIndex">
			<TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
			<Table v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
			<Table v-if ="tabPane.domain=='QB'" :columns="columns2" :data="list" border size="small" ref="table" stripe></Table>
			<Table v-if ="tabPane.domain=='custom'" :columns="columns3" :data="list" border size="small" ref="table" stripe></Table>
			
			<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
					<Page :total="len" :current="1" @on-change="changePage"></Page>
				</div>
			</div>
			<!-- <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
			<Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
			-->
		</TabPane>
		</Tabs>  
	</div>
  </div>
</template>

<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';
import _ from 'lodash'
import moment from 'moment'

var pageSize = 10

export default {
	name: 'list-billing',
	data () {
		return {
			spinShow: true,
			tabIndex : 0,
			tabPanes : [],
			data6 : [],
			list : [],
			filterArray : [],
			columns1: [
				{
					title: 'Name',
					key: 'Contact',
					sortable: true,
					render:(h,{row})=>{ return row.Contact.Name }
				},
				{
					title: 'Due Date',
					key: 'DueDate',
					sortable: true,
					render:(h,{row})=>{ 
						var date1 = moment(row.DueDate).format('DD-MMM-YYYY')
						return date1
					}
				},
				{
					title: 'Paid',
					key: 'AmountPaid',
					sortable: true,
					render:(h,{row})=>{ return '$' + row.AmountPaid  }
				},
				{
					title: 'Due',
					key: 'AmountDue',
					sortable: true,
					render:(h,{row})=>{ return '$' + row.AmountDue }
				},
				{
					title: 'Total',
					key: 'Total',
					sortable: true,
					render:(h,{row})=>{ return '$' + row.Total }
				},
				{
					title: 'Status',
					key: 'Status',
					sortable: true
				}
			],
			columns3 : []
		}
	},
	methods: {
		async getAllSettings(){
			let self = this;

			axios.get(config.default.serviceUrl + 'trackusersettings', {
				params: {
					'customerEmail' : Cookies.get('user')
				},
				headers:{
					Authorization : Cookies.get('auth_token')
				},
			})
			.then(async function (response) {
				console.log("track user response------>",response);
				self.tabPanes = [];
				self.spinShow = false;
				if (response.data.data.length != 0)
				{
					let settingArray = response.data.data[0].settingId
					let customerName;
					
					let settingId;
					let settingDomain;
					console.log("setings",settingArray)
					for (let settings in settingArray) {
						await axios.get(config.default.serviceUrl + 'settings/' + settingArray[settings], {
							headers:{
								Authorization : Cookies.get('auth_token')
							},
						})
						.then(function(resp) {
							let finalData = resp.data
							let customername = response.data.data[0].customerName;
							finalData['customerName'] = customername
							// console.log("++++++++++++++++setting response",finalData)
							self.tabPanes.push(finalData);
							// self.tabPanes.push({'customerName' : customerName})
							console.log("tabpane data",self.tabPanes);
							$('.preload').css("display","none")
							settingId = self.tabPanes[0].id;
							settingDomain = self.tabPanes[0].domain;
							customerName = self.tabPanes[0].customerName
						})
						.catch(function(err) {

						})
					}
					console.log("settingId",settingId)	
					console.log("settingDomain",settingDomain)	
					console.log("customerName",customerName)	
					self.getInvoiceBySettingId(settingId , settingDomain, customerName , 0)
				}
				else {
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
				}
			})
			.catch(function (error) {
				
				console.log("error",error);
				self.spinShow = false;
			});
		},

		async tabClicked(data){
			console.log(data)
			this.tabIndex = data;
			let settingId = this.tabPanes[data].id;
			let settingDomain = this.tabPanes[data].domain;
			let customerName = this.tabPanes[data].customerName;
			
			this.getInvoiceBySettingId(settingId ,settingDomain, customerName , data)
		},

		async mockTableData1 (p,size) {
      
			this.len = this.data6.length
			return this.data6.slice((p - 1) * size, p * size);
		},

		async changePage (p) {
			this.page = p
			console.log("not inside",this.filterArray.length)
			if(this.filterArray.length == 0){
				console.log("inside",this.filterArray)
				this.list = await this.mockTableData1(p,pageSize);
			}else{
				this.list = await this.mockTableData2(p,pageSize);
			}
		},

		async getInvoiceBySettingId(settingId , settingDomain, customerName , data){
			// settingID = settingId
			this.$Loading.start();
			this.data6 = [];
			let self = this;
			self.list = [];
			
			if(settingDomain == 'custom'){
				let Invoiceurl = self.tabPanes[data].invoice_url;
				
				axios({
					method: 'get',
					url: Invoiceurl,
					params : {
						settingId : settingId,
						Name : customerName
					}
				})
				.then(async function (response) {
					self.$Loading.finish();
					$('.preload').css("display","none")
					console.log("response------>iuy",response);
					self.data6 = response.data.data;
					let columnArray =  _.union(...(_.chain(self.data6).map(m => { return _.keys(m) }).value()))
					let modifiedArray = _.pull(columnArray, "id", "importTracker_id" ,"Action","settingId" );
					
					console.log("############# " , columnArray);
					columnArray = ["Name", "DueDate","Due",  "Paid",  "Total" , "Status"]
					let arr = [];
					let len = columnArray.length;
					for (let i = 0; i < len; i++) {
						arr.push({
							title: columnArray[i],
							key : columnArray[i],
							sortable: true
						});
					}
					self.list = await self.mockTableData1(1,pageSize)
					self.columns3 = arr;
					
				})
				.catch(function (error) {
					console.log("error",error);
					self.$Loading.error();
					
				});
			}
			else{
				axios.get(config.default.serviceUrl + 'invoice', {
					params : {
						settingId : settingId,
						Name : customerName
					}
				})
				.then(async function (response) {
					self.data6 = response.data[0].data.reverse();
					console.log("response------>iuy",self.data6);
					self.$Loading.finish();
					$('.preload').css("display","none")
					self.list = await self.mockTableData1(1,pageSize)
				})
				.catch(function (error) {
					console.log("error",error);
					self.$Loading.error();			
				});
			}
			
			
			},
	},
	mounted(){
		this.getAllSettings()
	}
}
</script>

<style>

</style>