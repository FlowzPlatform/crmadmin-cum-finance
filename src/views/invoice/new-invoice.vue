<template>
<div>
<div class="container">
    <i-form :model="formItem" :label-width="80" class="col-sm-6 mainform">
        <form-item label="Name">
            <i-input v-model="formItem.name" placeholder="Enter customer Name"></i-input>
        </form-item>
        <form-item label="Project">
            <auto-complete v-model="value3":data="data3" :filter-method="filterMethod" placeholder="input here" clearable>
            </auto-complete>
        </form-item>
        <form-item label="Due Date">
            <date-picker type="date" placeholder="Select date"></date-picker>
        </form-item>
        <form-item label="Description">
            <i-input v-model="formItem.description" type="textarea"  placeholder="Enter Description"></i-input>
        </form-item>
        <form-item label="Quantity">
            <i-input v-model="formItem.quantity" placeholder="Enter Quantity"></i-input>
        </form-item>
        <form-item label="Unit Amount" :input-width="40">
            <div class="col-md-3">
            <i-input v-model="formItem.Amount" placeholder="Enter Amount"></i-input>
            </div>
            <div class="col-md-4">
            <i-select v-model="formItem.selectamount">
               <!--  <i-option value="beijing">New York</i-option>
                <i-option value="shanghai">London</i-option>
                <i-option value="shenzhen">Sydney</i-option> -->
            </i-select>
            </div>
        </form-item>
        <form-item>
            <i-button type="primary">Submit</i-button>
            <i-button type="ghost" style="margin-left: 8px">Cancel</i-button>
        </form-item>
    </i-form>
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
</style>