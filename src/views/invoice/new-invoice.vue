<template>
<div class="container">
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
            <auto-complete v-model="value3":data="data3" :filter-method="filterMethod" placeholder="input here" clearable>
            </auto-complete>
        </form-item>
        <form-item label="Description">
            <i-input v-model="formItem.description" type="textarea"  placeholder="Enter Description"></i-input>
        </form-item>
      </i-form>
      <i-form :model="formItem" label-position="left" :label-width="80" class="col-sm-6 mainform panel" id="panel">
        <form-item label="Due Date">
            <date-picker type="date" placeholder="Select date"></date-picker>
        </form-item>
        <form-item label="Quantity">
            <i-input v-model="formItem.quantity" placeholder="Enter Quantity" style="width:100%"></i-input>
        </form-item>
        <form-item label="Unit Amount" :input-width="40">
            <!-- <div class="col-md-3"> -->
            <i-input v-model="formItem.Amount" placeholder="Enter Amount" style="width:49%"></i-input>
            <!-- </div> -->
            <!-- <div class="col-md-4"> -->
            <i-select v-model="formItem.selectamount" style="width:50%">
               <!--  <i-option value="beijing">New York</i-option>
                <i-option value="shanghai">London</i-option>
                <i-option value="shenzhen">Sydney</i-option> -->
            </i-select>
            <!-- </div> -->
        </form-item>
      </i-form>
      <i-form :model="formItem" :label-width="80" class="col-sm-12 mainform panel" id="panel" style="text-align: -webkit-center;">
        <form-item style="text-align: -webkit-center;margin-top: 10px;">
            <i-button type="primary">Submit</i-button>
            <i-button type="ghost" style="margin-left: 8px">Cancel</i-button>
        </form-item>
      </i-form>
    </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'newinvoice',
  data () {
    return {
      formItem: {
        name: '',
        duedate: '',
        description: '',
        quantity: '',
        Amount: '',
        selectamount: '',
        project:'',
        selectProject: ''
      },
      value3: '',
      data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive']
    }
  },
   methods: {  
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    } 
  },
  mounted() {
   // // $( "icon" ).click(function() {
   // //    alert( "Handler for .click() called." );
   // //  });
   // var iconvalue = $('auto-complete').attr('icon')
   // console.log("%%%%%%%%%%%%", iconvalue)
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