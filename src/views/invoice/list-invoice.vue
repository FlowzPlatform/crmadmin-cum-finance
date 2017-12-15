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
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#Customer"></span>
                                    <label>Customer Name</label>
                                </div>
                                <div class="panel-collapse collapse" id="Customer">
                                    <select class="form-control" id="selectCustomer"
                                    multiple="multiple" name="cname"></select>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#status"></span>
                                    <label>status</label>
                                </div>
                                <div class="panel-collapse collapse" id="status">
                                    <select class="form-control mb-2 mb-sm-0" name="status">
                                        <option value="select">Select</option>
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
                                        <input class="form-control" type="date" name="dategt"/>
                                    </div>
                                    <div class="col-xs-3">
                                      <label>To Date</label>
                                        <input class="form-control" type="date" name="datelt" />
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
                                        <input class="form-control" type="text" name="totalgt" placeholder="Min-Amount" 
                                        />
                                    </div>
                                    <div class="col-xs-3">
                                       
                                        <input class="form-control" type="text" name="totallt" placeholder="Max-Amount" 
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
                                        <input class="form-control" type="text" name="duegt" placeholder="Min-Due Amount"/>
                                    </div>
                                    <div class="col-xs-3">
                                        
                                        <input class="form-control" type="text" name="duelt" placeholder="Max-Due Amount"/>
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
    <invoicetable style="padding: 10px; margin: 5px; display: block;" keys="InvoiceID,Name,Total,Date,AmountPaid,AmountDue,status">
        <div class="container">
            <table class="table table-bordered table-striped table-collapsed" id="tbdata">
            <thead>
                <tr>
                    <th id="InvoiceID">InvoiceID</th>
                    <th id="Name">Name</th>
                    <th id="Date">Date</th>
                    <th id="AmountPaid">AmountPaid</th>
                    <th id="AmountDue">AmountDue</th>
                    <th id="Total">Total</th>
                    <th id="status">status</th>
                </tr>
            </thead>
            </table>
            <div class="preload" style="width:100px;height: 100px;position: relative;top: 70%;left: 50%;display: none;">
                <img  src="http://i.imgur.com/KUJoe.gif" style="height:50px;"/>
            </div>
            <div class="pull-right" id="total1"></div>
            <ul id="pagin"></ul>
        </div>
    </invoicetable>
</div>
</div>
</template>



<script>
import config from '../../config/customConfig'
export default {
  name: 'hello',
  data () {
    return {
      hcols: '',
      resdata: '',
      resp: '',
      ids: '',
      titles: '',
      len: ''
    }
  },
   methods: {
    async searchdata() {
      $('.preload').css("display","block")
      this.resdata = await this.apiData();
      console.log("response------------------------>", this.resdata)
        if (this.resdata.Err) {
          console.log("Error")
          productHtml = ''
          productHtml = '<tbody id="tdata"><tr><td colspan="7" style="text-align: center;">No data found</td></tr></tbody>'
          $('table').append(productHtml)  
        }
        else {
            this.tableDataBind();
            /*create table in to datatable*/
            $('#tbdata').dataTable({
              "searching": false,
              "processing": true,
              "destroy": true,
              "responsive": true
            });
        }
       
    },
    async changeData() {
      console.log("Inside change data")
      $('#tdata').remove();
      $('thead').remove();
      $('.preload').css("display","block")
      this.resdata = await this.apiData();
      console.log("_________________________________________", this.resdata)
          console.log("UIULIUIUIIUYUYYTYTYRTCRER", this.resdata)
          if (this.resdata.Err) {
            console.log("Error")
            var productHtml = ''
            productHtml = '<tbody id="tdata"><tr><td colspan="7" style="text-align: center;">No data found</td></tr></tbody>'
            $('table').append(productHtml)
          }
          else {
            this.tableDataBind();
            document.getElementById('tbdata').style = "white-space: nowrap;"
            $('#tbdata').DataTable().clear().destroy();
            $('#tbdata').dataTable({
              "searching": false
            })
          }
        
    },
async getCustomerUrl(){
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
  await $.ajax(settings).done(function (response) {
      res = response
      console.log("$$$$$$$$$$$$$$!!!!!!!!!!!!!!!!!!", response)
    });
      res.forEach (obj => {
    var x = document.getElementById("selectCustomer");
        var option = document.createElement("option");
        option.text = obj.Name;
        // console.log("&&&&&&&&&&",option.text)
        x.add(option);
  })
},
async apiData () {
  var formData = $( 'form' ).serialize();
  var element = formData.split('&');
  var filter = '';
  element.forEach (obj => {
    var pair = obj.split('=');
    console.log("+++++++++++++++++pair++++++++++++++++++++++=", pair)
    filter += '&' + pair[0] + '=' + pair[1]
  })
  console.log("###filter",filter);
  /*ajax call to get api data*/
 
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": config.invoiceurl + filter,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache"
      }
    }
  
  var resp;
  console.log("settings data", settings)
    await $.ajax(settings).done(function (response) {
      resp = response;
      $('.gridsection').css("display","block")
      $('.sorting').css("display","block")
      $('.preload').css("display","none")
    });
    console.log("$$$$$$$$$$$$$$", resp)
    return resp
},
tableDataBind(){
      this.resp = this.resdata.data
      // console.log("inside table data bind",this.resp)
      let id = this.ids.split(',');
      // console.log("TTTTTTTTTTTid", id)
          this.hcols = id
         // console.log("inside table", this.resp)
      /*set length of table*/  
          this.len = this.resp.length
      
        console.log(this.len)
        var productHtml = ''
      /*create table*/
            productHtml = '<tbody id="tdata">'
            // console.log("before productHtml",productHtml)
              for (var item=0; item<this.len; item++) {
                productHtml += '<tr class="line-content">'
              for(var arr1=0; arr1<this.hcols.length; arr1++) {
                // console.log("cols............", this.hcols[arr1])
                if (this.hcols[arr1] == "Name") {
                  productHtml += '<td>'+ this.resp[item].data.Contact[this.hcols[arr1]] + '</td>'
                }
                else if (this.hcols[arr1] == "status") {
                  productHtml += '<td>'+ this.resp[item][this.hcols[arr1]] + '</td>'
                }
                else{
                  productHtml += '<td>'+ this.resp[item].data[this.hcols[arr1]] + '</td>'
                }
              }
                productHtml += '</tr>'
            }
        $('table').append(productHtml)  
}
     
  },
  mounted() {
    let self = this;
    
    this.ids = $('invoicetable').attr('keys');
    console.log('ids:', this.ids);
     $('.maindiv').change(async function() {
      $('#tdata').remove();
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