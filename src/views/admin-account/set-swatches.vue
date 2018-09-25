<template>
  <div style="text-align: center">
    <Select v-model="websiteName" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="getvidData">
      <Option v-for="item in websiteList" :value="item" :key="item">{{item}}</Option>
    </Select>
    <Tabs type="card" v-if= "showtabs" @on-click="tabclicked">
      <TabPane label="Color">
        <Table border :columns="columns1" :data="list1" @on-row-click="myrwoclick"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="len" :current="1" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="Imprint Color">
        <Table border :columns="columns2" :data="list2" ></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="len" :current="1" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'lodash';
import config from '@/config/customConfig'

var pageSize = 10

export default {
  name: 'set-swatches',
  data () {
  return {
    websiteid: '',
    rowIndex:'',
    tabIndex: 0,
    showtabs: false,
    data: '',
    vid: '',
    len:1,
    file:'',
    list1: [],
    list2: [],
    listData: [],
    websiteList: [],
    websiteName: '',
    page:1,
    selectRadio1:'',
    selectRadio2:'',
    hexcode1:'',
    imgurl1:'',
    flagHaxCode1: false,
    flagImageUrl1: false,
    flagHaxCode2: false,
    flagImageUrl2: false,
    columns1: [
      {
        title: 'Attribute Value',
        key: 'key',
        align: 'center',
      },
      {
        title: 'Select',
        key: '',
        align: 'center',
        render: (h, params) => {
          return h('RadioGroup', {
            props: {
              vertical: true,
              value: this.list1[params.index].checkvalue,
              size: 'small'
            },
            on: {
              'on-change': (value) => {
                this.list1[params.index].checkvalue = value
                if (value === 'Hexcode') {
                  this.list1[params.index].ishexDisable = false
                  this.list1[params.index].isimgurlDisable = true
                } else {
                  this.list1[params.index].ishexDisable = true
                  this.list1[params.index].isimgurlDisable = false
                }
              }
            }
          }, [
            h('Radio', {
              props: {
                size: 'small',
                label: 'Hexcode'
              },
              style:{
                display: 'inline-table',
                fontWeight:'200'
              }
            }, 'Hexcode'),
            h('Radio', {
              props: {
                size: 'small',
                label: 'ImageUrl'
              },
              style:{
                display: 'inline-table',
                fontWeight:'200'
              }
            }, 'ImageUrl')
          ])
        },
      },
      {
        title: '#Haxcode',
        key: '',
        align: 'center',
        className: '#Haxcode',
        render: (h, params) => {
          return h('Input', {
            props: {
              // value: this.list1[(this.page - 1) * 10 + (params.index)].hexcode1,
              value: this.list1[params.index].hexcode1,
              disabled: this.list1[params.index].ishexDisable
            },
            on: {
              input: (val) => {
                this.list1[params.index].hexcode1 = val;
              }
            }
          })
        }
      },
      {
        title: 'Upload Image',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Upload', {
                              props: {
                                  action: '',
                                  beforeUpload	: this.handleUpload
                              }
                            },[
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        icon: 'ios-cloud-upload-outline',
                                        disabled: this.list1[params.index].isimgurlDisable
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {

                                    }
                                }, 'Upload Image'),
                                h('div', {
                                    style: {
                                        // marginRight: '5px'
                                    }
                                }, this.list1[params.index].imgurl1),
                            ]);
                        }
                    },
      {
        title: 'Color Swatch',
        key: '',
        align: 'center',
        render: (h, params) => {
          return  h('Icon', {
              props: {
                type: 'android-checkbox-blank',
                // color: this.list1[(this.page - 1) * 10 + (params.index)].colorBox1
                color: this.list1[params.index].colorBox1
              },
              style: {
                fontSize: '40px'
              }
            })
          }
      },
      {
        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.save1(params.index)
                                        }
                                    }
                                }, 'Save'),
                            ]);
                        }
                    }
                ],
    data1: [],
    columns2: [
      {
        title: 'Attribute Value',
        key: 'key',
        align: 'center',
      },
      {
        title: 'Select',
        key: '',
        align: 'center',
        render: (h, params) => {
          return h('RadioGroup', {
            props: {
              vertical: true,
              value: this.data2[params.index].checkvalue,
              size: 'small'
            },
            on: {
              'on-change': (value) => {
                this.data2[params.index].checkvalue = value
                if (value === 'Hexcode') {
                  this.data2[params.index].ishexDisable = false
                  this.data2[params.index].isimgurlDisable = true
                } else {
                  this.data2[params.index].ishexDisable = true
                  this.data2[params.index].isimgurlDisable = false
                }
              }
            }
          }, [
            h('Radio', {
              props: {
                size: 'small',
                label: 'Hexcode'
              },
              style:{
                display: 'inline-table',
                fontWeight:'200'
              }
            }, 'Hexcode'),
            h('Radio', {
              props: {
                size: 'small',
                label: 'ImageUrl'
              },
              style:{
                display: 'inline-table',
                fontWeight:'200'
              }
            }, 'ImageUrl')
          ])
        },
      },
      {
        title: '#Haxcode',
        key: '',
        align: 'center',
        className: '#Haxcode',
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.data2[params.index].hexcode2,
              disabled: this.data2[params.index].ishexDisable
            },
            on: {
              input: (val) => {
                this.data2[params.index].hexcode2 = val;
              }
            }
          })
        }
      },
      // {
      //   title: 'ImageUrl',
      //   key: '',
      //   align: 'center',
      //   className: 'ImageUrl',
      //   render: (h, params) => {
      //     return h('Upload', {
      //       props: {
      //         type: 'file',
      //         size: 'small',
      //         value: '',
      //         disabled: this.data1[params.index].isimgurlDisable
      //       },
      //       style: {
      //           marginRight: '5px'
      //       },
      //       on: {
      //         // input: (val) => {
      //         //   this.data1[params.index].imgurl1 = val;
      //         // }
      //       }
      //     },'upload')
      //   }
      // },
      {
        title: 'Upload Image',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Upload', {
                              props: {
                                  action: '',
                                  beforeUpload	: this.handleUpload
                              }
                            },[
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        icon: 'ios-cloud-upload-outline',
                                        disabled: this.data2[params.index].isimgurlDisable
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        // click: () => {
                                        //     this.save1(params.index)
                                        // }
                                    }
                                }, 'Upload Image'),
                            ]);
                        }
                    },
      {
        title: 'Color Swatch',
        key: '',
        align: 'center',
        render: (h, params) => {
          return h('Icon', {
            props: {
              type: 'android-checkbox-blank',
              color: this.data2[params.index].colorBox2
            },
            style: {
              fontSize: '40px'
            }
          })
        }
      },
      {
        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.save2(params.index)
                                        }
                                    }
                                }, 'Save'),
                            ]);
                        }
                    }
              ],
    data2: []
    }
  },
  methods: {
    myrwoclick (val, i) {
      this.rowIndex = i
      return this.rowIndex
    },
    tabclicked(name){
      this.tabIndex = name
      this.getvidData()
    },
    handleUpload(file){
      this.list1[this.rowIndex].imgurl1 = file
    },
    async changePage (p) {
      this.page = p
      if(this.tabIndex == 0){
        this.list1 = await this.mockTableData1(p,pageSize)
      } else if(this.tabIndex == 1){
        this.list2 = await this.mockTableData2(p,pageSize)
      }
    },
    async mockTableData1 (p,size) {
      let mydata = _.cloneDeep(this.data1)
      this.len = mydata.length
      return mydata.slice((p - 1) * size, p * size);
    },
    async mockTableData2 (p,size) {
      this.len = this.data2.length
      return this.data2.slice((p - 1) * size, p * size);
    },
    async getColorTableData(){
      var self = this
      let colorTableData;
      await axios({
        method: 'get',
        url: config.default.colorTableUrl
      }).then(function (res) {
        self.data = res.data.data
      })
      .catch(function (error) {
        self.$Message.error(error)
      });
    },
    async getvidData(){
      this.showtabs = true,
      this.$Loading.start();
      var testdata = []
      var self = this
      let object
      object = await _.find(self.listData, function(o) {
        if(self.websiteName == o.websiteName){
          return o.vid;
        }
      });
      this.vid = object.vid
      this.websiteid = object.id
      // fetch data using vid
      if(this.tabIndex == 0){
        await axios({
        method: 'get',
        url: config.default.filterColorUrl,
        headers: {'Authorization': Cookies.get('auth_token'),
                  'vid': object.vid}
        }).then(async function (response) {
          await self.getColorTableData()
          $.each(response.data.aggregations.group_by_attributes.buckets,function(index,item){

            item.checkvalue = 'Hexcode'
            item.ishexDisable= false
            item.isimgurlDisable= true
            item.colorBox1 = 'white'
            _.find(self.data, function(o) {
              if(o.colorname == item.key && o.attribute_name == 'color'){
                testdata.push({hexcode:o.hexcode, index:index})
              }
             });
          })
          self.data1 = response.data.aggregations.group_by_attributes.buckets
          $.each(testdata,function(index,item){
            self.data1[item.index].colorBox1 = item.hexcode
            self.data1[item.index].hexcode1 = item.hexcode
          })
          self.list1 = await self.mockTableData1(1,pageSize)
          self.$Loading.finish();
        }).catch(function (error) {
          self.$Loading.error();
            self.$Message.error(error)
        });
      } else if(this.tabIndex == 1){
        await axios({
        method: 'get',
        url: config.default.filterColorUrl,
        headers: {'Authorization': Cookies.get('auth_token'),
                  'vid': object.vid}
        }).then(async function (response) {
          await self.getColorTableData()
          $.each(response.data.aggregations.group_by_attributes.buckets,function(index,item){
            item.checkvalue = 'Hexcode'
            item.ishexDisable= false
            item.isimgurlDisable= true
            item.colorBox2 = 'white'
            _.find(self.data, function(o) {
              if(o.colorname == item.key && o.attribute_name == 'imprintcolor'){
                // testdata = o;
                testdata.push({hexcode:o.hexcode, index:index})
                // self.data1[index].colorBox1 = o.hexcode
              }
             });
          })
          self.data2 = response.data.aggregations.group_by_attributes.buckets
          self.list2 = response.data.aggregations.group_by_attributes.buckets
          $.each(testdata,function(index,item){
            self.data2[item.index].colorBox2 = item.hexcode
            self.data2[item.index].hexcode2 = item.hexcode
          })
          // self.list2 = await self.mockTableData2(1,pageSize)
          self.$Loading.finish();
        }).catch(function (error) {
          self.$Loading.error();
            self.$Message.error(error)
        });
      }
    },
    // setselect1(index){
    //   if(this.data1[index].checkvalue == 'Hexcode'){
    //     this.flagHaxCode1 = false
    //     this.flagImageUrl1 = true
    //   } else{
    //     this.flagImageUrl1 = false
    //     this.flagHaxCode1 = true
    //   }
    //
    // },
    // setselect2(){
    //   if(this.data2[index].checkvalue == 'Hexcode'){
    //     this.flagHaxCode2 = false
    //     this.flagImageUrl2 = true
    //   } else{
    //     this.flagImageUrl2 = false
    //     this.flagHaxCode2 = true
    //   }
    //
    // },
    async save1 (index) {
      //validation
      if(this.list1[index].hexcode1 == undefined && this.list1[index].imgurl1 == undefined){
        this.$Message.error('Please enter hexcode or imageurl');
      } else {
        let param1
        let regex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.list1[index].hexcode1);
        if(this.list1[index].checkvalue == 'Hexcode'){
          if(!regex){
            this.$Message.error('Please enter valid hexcode');
            return false;
          } else {
            param1 = {
              // colorname :this.list1[(this.page - 1) * 10 + (index)].key,
              colorname :this.list1[index].key,
              hexcode : this.list1[index].hexcode1,
              attribute_name : 'color',
              vid: this.vid,
              websiteid: this.websiteid,
              websitename: this.websiteName
             }
             var self = this
                   await self.getColorTableData()
                  var data = _.find(self.data, function(o) {
                      return o.colorname==self.list1[index].key && o.attribute_name == 'color'; });

                        if(data != null){
                               axios({
                                      method: 'patch',
                                      url: config.default.colorTableUrl +'/'+ data.id,
                                      data: param1,
                               }).then(function (res) {
                                      // self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.data1[index].hexcode1
                                      self.list1[index].colorBox1 = self.list1[index].hexcode1
                                      self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.list1[index].hexcode1
                                      self.data1[(self.page - 1) * 10 + (index)].hexcode1 = self.list1[index].hexcode1

                                      self.$Message.success("update successfully")

                               }).catch(function (error) {
                                   self.$Message.error(error)
                               });
                        } else {
                               //post data in api
                               axios({
                                      method: 'post',
                                      url: config.default.colorTableUrl,
                                      data: param1,
                               }).then(function (res) {
                                    self.$Message.success("saved successfully")
                                    // self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.data1[index].hexcode1
                                    self.list1[index].colorBox1 = self.list1[index].hexcode1
                                    self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.list1[index].hexcode1
                                    self.data1[(self.page - 1) * 10 + (index)].hexcode1 = self.list1[index].hexcode1
                               }).catch(function (error) {
                                   self.$Message.error(error)
                               });

                        }

          }
        } else if(this.list1[index].checkvalue == 'ImageUrl'){
          if(this.list1[index].imgurl1.type != 'image/png' && this.list1[index].imgurl1.type != 'image/jpeg'){
            this.$Message.error('Please upload valid file');
            return false;
          } else {
            param1 = {
              colorname :this.list1[index].key,
              attribute_name : 'color',
              vid: this.vid,
              websiteid: this.websiteid,
              websitename: this.websiteName
             }
             var self = this
                   await self.getColorTableData()
                  var data = _.find(self.data, function(o) {
                      return o.colorname==self.list1[index].key && o.attribute_name == 'color'; });
                      var reader = new FileReader();
                      reader.readAsDataURL(this.list1[index].imgurl1);
                      reader.addEventListener("load", function () {
                      var filebase64 = reader.result
                      param1['imagefile'] = filebase64
                        if(data != null){
                               axios({
                                      method: 'patch',
                                      url: config.default.colorTableUrl +'/'+ data.id,
                                      data: param1,
                               }).then(function (res) {
                                      // self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.data1[index].hexcode1
                                      self.list1[index].colorBox1 = self.list1[index].hexcode1
                                      self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.list1[index].hexcode1
                                      self.data1[(self.page - 1) * 10 + (index)].hexcode1 = self.list1[index].hexcode1

                                      self.$Message.success("update successfully")

                               }).catch(function (error) {
                                   self.$Message.error(error)
                               });
                        } else {
                               //post data in api
                               axios({
                                      method: 'post',
                                      url: config.default.colorTableUrl,
                                      data: param1,
                               }).then(function (res) {
                                    self.$Message.success("saved successfully")
                                    // self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.data1[index].hexcode1
                                    self.list1[index].colorBox1 = self.list1[index].hexcode1
                                    self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.list1[index].hexcode1
                                    self.data1[(self.page - 1) * 10 + (index)].hexcode1 = self.list1[index].hexcode1
                               }).catch(function (error) {
                                   self.$Message.error(error)
                               });

                        }
                      })
          }
        }
        // var self = this
        //       await self.getColorTableData()
        //      var data = _.find(self.data, function(o) {
        //          return o.colorname==self.list1[index].key && o.attribute_name == 'color'; });
        //          // console.log('this.list1[index].checkvalue',this.list1[index].checkvalue)
        //          var reader = new FileReader();
        //          reader.readAsDataURL(this.list1[index].imgurl1);
        //          reader.addEventListener("load", function () {
        //          var filebase64 = reader.result
        //          param1['imagefile'] = filebase64
        //            if(data != null){
        //                   axios({
        //                          method: 'patch',
        //                          url: config.default.colorTableUrl +'/'+ data.id,
        //                          data: param1,
        //                   }).then(function (res) {
        //                          // self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.data1[index].hexcode1
        //                          self.list1[index].colorBox1 = self.list1[index].hexcode1
        //                          self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.list1[index].hexcode1
        //                          self.data1[(self.page - 1) * 10 + (index)].hexcode1 = self.list1[index].hexcode1
        //
        //                          self.$Message.success("update successfully")
        //
        //                   }).catch(function (error) {
        //                          // console.log("-------",error);
        //                       self.$Message.error(error)
        //                   });
        //            } else {
        //                   //post data in api
        //                   axios({
        //                          method: 'post',
        //                          url: config.default.colorTableUrl,
        //                          data: param1,
        //                   }).then(function (res) {
        //                        self.$Message.success("saved successfully")
        //                        // self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.data1[index].hexcode1
        //                        self.list1[index].colorBox1 = self.list1[index].hexcode1
        //                        self.data1[(self.page - 1) * 10 + (index)].colorBox1 = self.list1[index].hexcode1
        //                        self.data1[(self.page - 1) * 10 + (index)].hexcode1 = self.list1[index].hexcode1
        //                   }).catch(function (error) {
        //                        // console.log("-------",error);
        //                       self.$Message.error(error)
        //                   });
        //
        //            }
        //          })




      }

    },
    async save2 (index) {
      if(this.data2[index].hexcode2 == undefined && this.data2[index].imgurl2 == undefined){
        this.$Message.error('Please enter hexcode or imageurl');
      } else {
        let regex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.data2[index].hexcode2);
        if(this.data2[index].checkvalue == 'Hexcode'){
          if(!regex){
            this.$Message.error('Please enter valid hexcode');
            return false;
          }
        }
        var self = this
              await self.getColorTableData()
             var data = _.find(self.data, function(o) {
               return o.colorname==self.data2[index].key && o.attribute_name == 'imprintcolor'; });
             let param1 = {
               colorname :self.data2[index].key,
               hexcode : self.data2[index].hexcode2,
               attribute_name : 'imprintcolor',
               vid: self.vid
              }
                   if(data != null){
                          axios({
                                 method: 'patch',
                                 url: config.default.colorTableUrl +'/'+ data.id,
                                 data: param1,
                          }).then(function (res) {
                                 self.list1[index].colorBox1 = self.list1[index].hexcode1
                                 self.$Message.success("update successfully")

                          }).catch(function (error) {
                              self.$Message.error(error)
                          });
                   } else {
                          //post data in api
                          axios({
                                 method: 'post',
                                 url: config.default.colorTableUrl,
                                 data: param1,
                          }).then(function (res) {
                               self.$Message.success("saved successfully")
                               self.data2[index].colorBox2 = self.data2[index].hexcode2
                          }).catch(function (error) {
                              self.$Message.error(error)
                          });
                   }
      }

    }
  },
  mounted(){
    var self = this
    axios({
      method: 'get',
      url: "http://localhost:3032/project-configuration",
      params: {subscriptionId:Cookies.get('subscriptionId')}
      }).then(async function (response) {
        self.listData = response.data.data
        $.each(response.data.data,function(index,item){
          self.websiteList.push(item.websiteName)
        })
      })
      .catch(function (error) {
        // // console.log("-------",error);
          self.$Message.error(error)
      });
  }
}
</script>

<style>
/* .ivu-radio-group-vertical .ivu-radio-wrapper{
  display: 'inline-table';
} */
  .ivu-table td.swatch-box .ivu-table-cell{
    /* border: solid 1px #ccc; */
    height: 30px;
    margin-bottom: 2px;
    /* background: red; */
    display: inline-block;
    width:30px;
    margin-left: 2px;
  }
  .ivu-tabs-nav-container{
    margin-top: 20px;
  }
  .ivu-table-cell {
        word-break: break-word;
    }

</style>
