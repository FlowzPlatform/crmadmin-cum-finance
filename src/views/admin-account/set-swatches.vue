<template>
  <div>
    <Tabs type="card">
        <TabPane label="Color">
          <Select v-model="websiteName" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="getvidData">
              <Option v-for="item in websiteList" :value="item" :key="item">{{item}}</Option>
          </Select>
          <Table border :columns="columns1" :data="list1"></Table>
          <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="len" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
        </TabPane>
        <TabPane label="Imprint Color">
          <Table border :columns="columns2" :data="data2" ></Table>
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
    data: '',
    vid: '',
    len:1,
    list1:[],
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
                                  value: this.data1[params.index].checkvalue,
                                  size: 'small'
                                },
                                style: {
                                  // paddingTop: '20px'
                                },
                                on: {
                                  'on-change': (value) => {
                                    this.data1[params.index].checkvalue = value
                                    if (value === 'Hexcode') {
                                      this.data1[params.index].ishexDisable = false
                                      this.data1[params.index].isimgurlDisable = true
                                    } else {
                                      this.data1[params.index].ishexDisable = true
                                      this.data1[params.index].isimgurlDisable = false
                                    }
                                  }
                                }
                            }, [
                              h('Radio', {
                                props: {
                                  size: 'small',
                                  label: 'Hexcode'
                                  // value: selectradio[params.key]
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
                            value: this.data1[params.index].hexcode1,
                            disabled: this.data1[params.index].ishexDisable
                          },
                          on: {
                                input: (val) => {
                                    this.data1[params.index].hexcode1 = val;
                                }
                            }
                        })
                        }


                    },
                    {
                        title: 'ImageUrl',
                        key: '',
                        align: 'center',
                        className: 'ImageUrl',
                        render: (h, params) => {
                          return h('Input', {
                          props: {
                            value: '',
                            disabled: this.data1[params.index].isimgurlDisable
                          },
                          on: {
                                input: (val) => {
                                    this.data1[params.index].imgurl1 = val;
                                }
                            }

                        })
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
                              color: this.data1[params.index].colorBox1
                            },
                            style: {
                              fontSize: '40px'
                            }
                          })
                        }
                        // className: 'swatch-box'
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
    columns2: [
                  {
                      title: 'Attribute Value',
                      key: 'name'
                  },
                  {
                      title: 'Select',
                      key: 'name',
                      render: (h, params) => {
                          return h('RadioGroup', {
                              props: {
                                vertical: true,
                                value: this.selectRadio2,
                                size: 'small'
                              },
                              style: {
                                // paddingTop: '20px'
                              },
                              on: {
                                'on-change': (value) => {
                                  this.selectRadio2 = value
                                  this.setselect2()
                                }
                              }
                          }, [
                            h('Radio', {
                              props: {
                                size: 'small',
                                label: '#Hexcode'
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
                      key: 'name',
                      className: '#Haxcode',
                      render: (h, params) => {
                        return h('Input', {
                        props: {
                          value: '',
                          disabled: this.flagHaxCode2
                        }
                      })
                      }


                  },
                  {
                      title: 'ImageUrl',
                      key: 'name',
                      className: 'ImageUrl',
                      render: (h, params) => {
                        return h('Input', {
                        props: {
                          value: '',
                          disabled: this.flagImageUrl2
                        }
                      })
                      }

                  },
                  {
                      title: 'Color Swatch',
                      key: 'name'
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
    data1: [
                  // {
                  //       name: 'John Brown',
                  //       age: 18,
                  //       address: 'New York No. 1 Lake Park'
                  //   },
                ],
    data2: [
        {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
        },
    ]
    }
  },
  methods: {
    async changePage (p) {
      this.page = p
      this.list1 = await this.mockTableData1(p,pageSize)
    },
    async mockTableData1 (p,size) {
      this.len = this.data1.length
      return this.data1.slice((p - 1) * size, p * size);
    },
    async getvidData(){
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
      // fetch data using vid
      await axios({
        method: 'get',
        url: config.default.filterColorUrl,
        headers: {'Authorization': Cookies.get('auth_token'),
                  'vid': object.vid}
        }).then(async function (response) {

          await axios({
            method: 'get',
            url: config.default.colorTableUrl
          }).then(function (res) {
            self.data = res.data.data
          })
          .catch(function (error) {
            self.$Message.error(error)
          });
          $.each(response.data.aggregations.group_by_attributes.buckets,function(index,item){

            item.checkvalue = 'Hexcode'
            item.ishexDisable= false
            item.isimgurlDisable= true
            item.colorBox1 = 'white'
            _.find(self.data, function(o) {
              if(o.colorname == item.key){
                // testdata = o;
                testdata.push({hexcode:o.hexcode, index:index})
                // self.data1[index].colorBox1 = o.hexcode
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
        })
        .catch(function (error) {
          console.log("-------",error);
          self.$Loading.error();
            self.$Message.error(error)
        });
    },
    setselect1(index){
      if(this.data1[index].checkvalue == 'Hexcode'){
        this.flagHaxCode1 = false
        this.flagImageUrl1 = true
      } else{
        this.flagImageUrl1 = false
        this.flagHaxCode1 = true
      }

    },
    setselect2(){
      if(this.selectRadio2 == '#Hexcode'){
        this.flagHaxCode2 = false
        this.flagImageUrl2 = true
      } else{
        this.flagImageUrl2 = false
        this.flagHaxCode2 = true
      }

    },
    save1 (index) {
      //validation
      if(this.data1[index].hexcode1 == undefined && this.data1[index].imgurl1 == undefined){
        this.$Message.error('Please enter hexcode or imageurl');
      } else {
        let regex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.data1[index].hexcode1);
        if(this.data1[index].checkvalue == 'Hexcode'){
          if(!regex){
            this.$Message.error('Please enter valid hexcode');
            return false;
          }
        }
        var self = this

             var data = _.find(self.data, function(o) { return o.colorname==self.data1[index].key ; });
             let param1 = {
               colorname :self.data1[index].key,
               hexcode : self.data1[index].hexcode1,
               attribute_name : 'color',
               vid: self.vid
              }
                   if(data != null){
                          axios({
                                 method: 'patch',
                                 url: config.default.colorTableUrl +'/'+ data.id,
                                 data: param1,
                          }).then(function (res) {
                                 self.data1[index].colorBox1 = self.data1[index].hexcode1
                                 self.$Message.success("update successfully")

                          }).catch(function (error) {
                                 console.log("-------",error);
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
                               self.data1[index].colorBox1 = self.data1[index].hexcode1
                          }).catch(function (error) {
                               console.log("-------",error);
                              self.$Message.error(error)
                          });
                   }




      }

    },
    save2 (index) {
      console.log('index2------>', index)
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
        console.log("-------",error);
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

</style>