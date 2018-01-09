<template>
    <div>
        <div v-if="spinShow">
                <Spin size="large"></Spin>
        </div>
        <div v-else>
            
            <Tabs  @on-click="tabClicked">
                <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
                <Table v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
                <Table v-else :columns="columns2" :data="list" border size="small" ref="table" stripe></Table>
                
                <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                        <Page :total="len" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
                
            </TabPane>
            </Tabs>  
        </div>
    </div>
</template>

<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';

var pageSize = 10
export default {
  name: '',
  data() {
      return {
        tabPanes : [],
        spinShow: true,
        data : [],
        list: [],
        columns1: [
          {
              title: 'Payment Id',
              key: 'PaymentId',
              sortable: true,
              render:(h,{row})=>{ return row.paymentGateway.id }
          },
          {
              title: 'Accounting Id',
              key: 'AccountingId',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.PaymentID }
          },
          {
              title: 'Account Name',
              key: 'Name',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.Account.Name }
          },
          {
              title: 'Invoice No.',
              key: 'InvoiceNumber',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.Invoice.InvoiceNumber }
          },
          {
              title: 'Customer Name',
              key: 'Contact',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.Contact.Name }
          },
          {
              title: 'Date',
              key: 'Date',
              sortable: true,
              render:(h,{row})=>{ 
  
               var date = new Date(row.paymentAccounting.Invoice.Date); 
               var date1 = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
                return date1
              }
          },
          {
              title: 'Amount',
              key: 'Amount',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.Amount }
          }
        ],
        columns2: [
            {
              title: 'Payment Id',
              key: 'PaymentId',
              sortable: true,
              render:(h,{row})=>{ return row.paymentGateway.id }
            },
            {
                title: 'Accounting Id',
                key: 'AccountingId',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.PaymentID }
            },
            {
                title: 'Account Id',
                key: 'value',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Account.value }
            },
            {
                title: 'Invoice No',
                key: 'InvoiceId',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Invoice.InvoiceID }
            },
            {
                title: 'Customer Name',
                key: 'Contact',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Contact.Name }
            },
            {
                title: 'Date',
                key: 'Date',
                sortable: true,
                render:(h,{row})=>{ 
    
                var date = new Date(row.paymentAccounting.Invoice.Date); 
                var date1 = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
                    return date1
                }
            },
            {
                title: 'Amount',
                key: 'Amount',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Amount }
            }
        ]
      }
  },
  methods: {
    async getAllSettings(){
      let self = this;
      axios.get(config.default.serviceUrl + 'settings', {
        params : {
            user : Cookies.get('user')
        },
        headers:{
            Authorization : Cookies.get('auth_token')
        },
      })
      .then(function (response) {
        // console.log("setting response",response);
        self.spinShow = false;
        if (response.data.data.length != 0)
        {
          self.tabPanes = response.data.data;
          $('.preload').css("display","none")
          let settingId = self.tabPanes[0].id;
          self.getTransaction(settingId)
        }
        else {
            self.$Modal.warning({
            title: 'No Configuration available',
            okText : "Go to Settings",
            content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
            onOk: () => {
                self.$router.push({
                    name: 'newsettings'
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
      let settingId = this.tabPanes[data].id
      this.getTransaction(settingId);
    },
    async mockTableData1 (p,size) {
              this.len = this.data.length
              return this.data.slice((p - 1) * size, p * size);
    },
    async changePage (p) {
        this.page = p
        this.list = await this.mockTableData1(p,pageSize);
    },
    async getTransaction(settingId) {
        this.$Loading.start();
        this.data = [];
        let self = this;
        self.list = [];
        await axios.get(config.default.serviceUrl + 'transaction', {
            params : {
                user : Cookies.get('user'),
                settingId : settingId
            }
        })
        .then(async function (response) {
            console.log("transaction response",response);
            
            self.data = response.data.data;
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
  mounted() {
      this.getAllSettings()
  }
}
</script>