<template>
<div>
  <invoicefilter style="padding: 10px; margin: 5px; display: block;">
    <div class="container">
        <h1>Invoice List </h1>
        <div class="panel panel-default panel-group" id="accordion">
            <div class="panel-heading">
                <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
            </div>
            <div class="panel-collapse collapse" id="collapseTwo">
                <div class="panel-body">
                    <form>
                        <div class="collapse-maindiv maindiv">
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#Customer"></span>
                                    <label>Customer Name</label>
                                </div>
                                <div class="panel-collapse collapse" id="Customer">
                                    <select class="form-control" id="selectCustomer" v-model="cname">
                                      <option disabled value="">Please select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#status"></span>
                                    <label>status</label>
                                </div>
                                <div class="panel-collapse collapse" id="status">
                                    <select class="form-control mb-2 mb-sm-0" v-model="status" name="status">
                                        <option disabled value="">Please select</option>
                                        <option value="paid">Paid</option>
                                        <option value="Unpaid">Unpaid</option>
                                    </select>
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
                                        <input class="form-control" type="date" v-model="dategt"/>
                                    </div>
                                    <div class="col-xs-3">
                                      <label>To Date</label>
                                        <input class="form-control" type="date" v-model="datelt" />
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#amount"></span>
                                    <label>Total Amount</label>
                                </div>
                                <div class="form-group row panel-collapse collapse" id="amount">
                                    <div class="col-xs-3">
                                        <input class="form-control" type="text" v-model="totalgt" placeholder="Min-Amount" 
                                        />
                                    </div>
                                    <div class="col-xs-3">
                                       
                                        <input class="form-control" type="text" v-model="totallt" placeholder="Max-Amount" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#dueamount"></span>
                                    <label>Due Amount</label>
                                </div>
                                <div class="form-group row panel-collapse collapse" id="dueamount">
                                    <div class="col-xs-3">
                                        <input class="form-control" type="text" v-model="duegt" placeholder="Min-Due Amount"/>
                                    </div>
                                    <div class="col-xs-3">
                                        
                                        <input class="form-control" type="text" v-model="duelt" placeholder="Max-Due Amount"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</invoicefilter>

<div>
    <invoicetable style="padding: 10px; margin: 5px; display: block;" keys="InvoiceID,Name,Total,Date,AmountPaid,AmountDue,status,action">
        <div class="container">
         <Table border :columns="columns1" :data="data1" id="tbdata"></Table>
         <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div> -->
        </div>
    </invoicetable>
</div>
</div>
</template>



<script>
import config from '../../config/customConfig'
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
       columns1: [
          {
              title: 'InvoiceID',
              key: 'InvoiceID',
              sortable: true
          },
          {
              title: 'Name',
              key: 'Name',
              sortable: true
          },
          {
              title: 'Date',
              key: 'Date',
              sortable: true
          },
           {
              title: 'AmountPaid',
              key: 'AmountPaid',
              sortable: true
          },
          {
              title: 'AmountDue',
              key: 'AmountDue',
              sortable: true
          },
          {
              title: 'Total',
              key: 'Total',
              sortable: true
          },
          {
              title: 'status',
              key: 'status',
              sortable: true
          },
          {
            title: 'Action',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    // text: 'action'
                  },
                  style: {
                    // color: '#CC0000',
                    // marginRight: '3px',
                    // padding: '0px',
                    // fontSize: '20px'
                  },
                  on: {
                    click: () => {
                      alert('111')
                      // alert(this.tabPane)
                      this.performAction(params)
                    }
                  }
                }, 'action')
              ])
            }
          }

      ],
      data1: [],
      resdata: '',
      resp: '',
      ids: '',
      titles: '',
      len: '',
      cname: '',
      status: '',
      dategt: '',
      datelt: '',
      totalgt: '',
      totallt: '',
      duegt: '',
      duelt: ''

    }
  },
   methods: {
    async searchdata() {
      $('.preload').css("display","block")
      this.resdata = await this.apiData();
      console.log("response------------------------>", this.resdata)
      this.tableDataBind(); 
    },
    async changeData() {
      this.data1 = []
      console.log("Inside change data")
      this.resdata = await this.changeApiData();
      console.log("response------------------------>", this.resdata)
      this.tableDataBind();
    },
    async getCustomerUrl(){
      console.log("inside getCustomerUrl")
      var res
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.customerurl,
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      }

      console.log("settings", settings)
      await $.ajax(settings).done(function (response) {
          res = response
          console.log("$$$$$$$$$$$$$$!!!!!!!!!!!!!!!!!!", response)
        });
          res.forEach (obj => {
        var x = document.getElementById("selectCustomer");
            var option = document.createElement("option");
            option.text = obj.Name;
            x.add(option);
      })
    },
    async apiData () {
      var resp;
      console.log("TRTYYTYTT");
      await axios.get(config.invoiceurl, {

        params: {
          // cname: this.cname,
          // status: this.status,
          // totalgt: this.totalgt,
          // totallt: this.totallt,
          // duegt: this.duegt,
          // duelt: this.duelt,
          // datelt: this.datelt,
          // dategt: this.dategt
        }
      })
      .then(function (response) {
        resp = response
        console.log("response------>iuy",resp);
        $('.preload').css("display","none")
      })
      .catch(function (error) {
        console.log("error",error);
      });
      return resp

    },
    async changeApiData () {
      var resp;
      console.log("TRTYYTYTT");
      var params =  {
          cname: this.cname,
          status: this.status,
          totalgt: this.totalgt,
          totallt: this.totallt,
          duegt: this.duegt,
          duelt: this.duelt,
          datelt: this.datelt,
          dategt: this.dategt
        }
        console.log("params api data", params)
      await axios.get(config.invoiceurl, {
        params: params
      })
      .then(function (response) {
        resp = response
        console.log("response------>iuy",resp);
        $('.preload').css("display","none")
      })
      .catch(function (error) {
        console.log("error",error);
      });
      return resp

    },
    tableDataBind(){
          var self = this
          if(this.resdata.data.Err){
            console.log("error in response",this.resdata.data.Err)
          }else{
            this.resp = this.resdata.data.data
            // console.log("inside table data bind",this.resp)
            this.resp.forEach(result =>{
              var myobj = {}
              myobj.Name = result.data.Contact.Name
              myobj.InvoiceID = result.data.InvoiceID
              myobj.AmountDue = result.data.AmountDue
              myobj.AmountPaid = result.data.AmountPaid
              myobj.Date = result.data.Date
              myobj.Total = result.data.Total
              myobj.status = result.status
              self.data1.push(myobj)
              // console.log("result", result)
            })

            }
          
    },
    performAction(index){
      console.log("params", index)
    }
     
  },
  mounted() {
    let self = this;
    
     $('.maindiv').change(async function() {
      // $('#tdata').remove();
      await self.changeData();
    });
    this.getCustomerUrl();
    this.searchdata();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  margin-bottom: 7px;
}
.panel-heading{
  padding: 4px 8px;
}
</style>