<template>
<div class="container-fluid">
  <div class="row" style="padding-top: 10px;">
    <div class="col-sm-12">
      <div class="panel" id="panel">
        <label>New Invoice</label>
      </div>
    </div>
    <div class="col-sm-12">
      
    <i-form :model="formItem" label-position="left" :label-width="80" class="col-sm-6 mainform panel" id="panel">
        <form-item label="Name">
            <i-input v-model="formItem.name" placeholder="Enter customer Name"></i-input>
        </form-item>
        <form-item label="Project">
            <auto-complete v-model="formItem.selectProject" :data="data3" :filter-method="filterMethod" placeholder="input here" clearable>
            </auto-complete>
        </form-item>
        <form-item label="Description">
            <i-input v-model="formItem.description" type="textarea"  placeholder="Enter Description"></i-input>
        </form-item>
      </i-form>
      <i-form :model="formItem" label-position="left" :label-width="80" class="col-sm-6 mainform panel" id="panel">
        <form-item label="Due Date">
            <date-picker type="date" placeholder="Select date" v-model="formItem.duedate"></date-picker>
        </form-item>
        <form-item label="Quantity">
            <i-input v-model="formItem.qty" placeholder="Enter Quantity" style="width:100%"></i-input>
        </form-item>
        <form-item label="Unit Amount" :input-width="40">
            <i-input v-model="formItem.amount" placeholder="Enter Amount" style="width:49%"></i-input>
            <i-select v-model="formItem.selectamount" style="width:50%">
               <i-option v-for="item in currency" :value="item" :key="item">{{ item }}</i-option>
            </i-select>
        </form-item>
      </i-form>
      <i-form :model="formItem" :label-width="80" class="col-sm-12 mainform panel" id="panel" style="text-align: -webkit-center;">
        <form-item style="text-align: -webkit-center;margin-top: 10px;">
            <i-button type="primary" @click="formData()">Submit</i-button>
            <i-button type="ghost" style="margin-left: 8px" @click="Cancel()">Cancel</i-button>
        </form-item>
      </i-form>
    </div>
    </div>
</div>
</template>

<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
export default {
  name: 'newinvoice',
  data () {
    return {
      formItem: {
        domain: 'Xero',
        name: '',
        duedate: '',
        description: '',
        qty: '',
        amount: '',
        selectamount: '',
        selectProject: ''
      },
      value3: '',
      data3: [],
      currency: []
    }
  },
   methods: {  
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    async projectData () {
      var resp
      var self = this
      await axios.get(config.databaseurl + 'crm-service', {
        params: {
        }
      })
      .then(function (response) {
        resp = response.data
      })
      .catch(function (error) {
        console.log("error",error);
      });
      console.log("response------>iuy",resp.data);
      resp.data.forEach(obj =>{
        self.data3.push(obj.project_name)
        self.currency.push(obj.price)
      })
    },
    async formData () {
      var self = this
      delete this.formItem.selectamount
      delete this.formItem.duedate
      delete this.formItem.selectProject
      this.formItem.amount = parseInt(this.formItem.amount)
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",this.formItem)
      await axios({
          method: 'post',
          url: config.serviceUrl + 'invoice',
          data: this.formItem
        })
        .then(function (res) {
          console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",res)
          self.$Message.success('invoice created successfully');
        })
        .catch(function (err) {
          console.log("errerrerrerrerrerrerrerrerrerrerrerrerr",err)
          this.$Message.error('invoice error')
        });
        this.Cancel();
      // this.formItem.domain = '',
      // this.formItem.name = '',
      // this.formItem.duedate = '',
      // this.formItem.description = '',
      // this.formItem.qty = '',
      // this.formItem.amount = '',
      // this.formItem.selectamount = '',
      // this.formItem.selectProject = ''
    },
    Cancel(){
      this.formItem.domain = '',
      this.formItem.name = '',
      this.formItem.duedate = '',
      this.formItem.description = '',
      this.formItem.qty = '',
      this.formItem.amount = '',
      this.formItem.selectamount = '',
      this.formItem.selectProject = ''
    } 
  },
  mounted() {
   this.projectData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainform{
  background-color: #eee;
  padding: 24px;
}
.ivu-date-picker {
  width: 100% !important;
}
.panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
#panel {
  padding-top: 10px;
      padding-right: 17px;
      padding-bottom: 10px;
      padding-left: 17px;
      background-color: rgb(241, 241, 241);
      border-color: rgb(230, 233, 237);
      margin-right: 10px;
}
.col-sm-6 {
  width: 49%;
}
</style>