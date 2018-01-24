<template>
    <div class="productlisting">
        <Row>
            <h4>Product-Listing</h4>
        </Row>
        <Row>
            <div class="panel panel-default panel-group" id="accordion">
                <div class="panel-heading">
                    <h4 class="panel-title" style="text-align:-webkit-right;"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
                </div>
                <div class="panel-collapse collapse" id="collapseTwo">
                    <div class="panel-body">
                        <div class="collapse-maindiv maindiv" >
                            <!-- <Form> -->
                                <Row>
                                    <Col :span='10' style="padding: 0px 5px 0px 5px">
                                        <!-- <FormItem > -->
                                            <Input v-model.trim="filterobj.product_name" placeholder="Title"></Input>
                                        <!-- </FormItem> -->
                                    </Col>
                                    <Col :span='10' style="padding: 0px 5px 0px 5px">
                                        <!-- <FormItem > -->
                                            <Input v-model.trim="filterobj.sku" placeholder="SKU"></Input>
                                        <!-- </FormItem> -->
                                    </Col>
                                    <Col :span='4' style="">
                                        <Button type="warning" @click="handleReset" style= "float:right;margin-right: 5px;">Reset</Button>
                                        <Button type="primary" @click="handleFilter" style= "float:right;margin-right: 5px;">Apply</Button>
                                    </Col>
                                </Row>
                            <!-- </Form> -->
                        </div>
                    </div>
                </div>
            </div>
        </Row>
        <Row>
            <Table stripe border :loading="loading" :columns="productColumns" :data="productData"></Table>
        </Row>
        <Row style="padding-top: 4px; float: right;">
            <Page :total="tcount" :current="cpage" :page-size="limit" @on-change="changePage" show-sizer @on-page-size-change="changePageSize"></Page>
        </Row>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Cookies from 'js-cookie';
let customconfig = require("@/config/customConfig.js")
let token = Cookies.get('auth_token')
export default {
    name: 'product-listing',
    data () {
        return {
            tcount: 0,
            cpage: 1,
            skip: 0,
            limit: 10,
            loading: false,
            filterobj: {
                product_name: '',
                sku: ''
            },
            productColumns: [
                {
                    title: 'TITLE',
                    key: 'product_name'
                },
                {
                    title: 'SKU',
                    key: 'sku'
                },
                {
                    title: 'STATUS',
                    key: 'status',
                    render: (h, params) => {
                    return h('i-switch', {
                        props: {
                          value: this.productData[params.index].status,
                          size: 'small'
                        },
                        on: {
                          'on-change': (value) => {
                            this.productData[params.index].status = value
                            this.$Modal.confirm({
                              title: 'Confirm',
                              content: '<p>Are you sure you want to ' + (value ? 'enable' : 'disable') + ' this status?</p>',
                              onOk: async () => {
                                // console.log('this.productData[params.index]', this.productData[params.index])
                                // await this.handleEnableDisable(this.productData[params.index])
                              },
                              onCancel: () => {
                                this.productData[params.index].status = !value
                              }
                            })
                          }
                        }
                      })
                    }
                }
            ],
            productData: [],
            pdmURL: '',
            myvid: {
                vid : ''
            }
        }
    },
    methods: {
        changePage (page) {
            this.cpage = page
            this.skip = (page * this.limit) - this.limit
            let query = this.pdmURL
            if(this.filterobj.product_name != '') {
                query += '&product_name='+ this.filterobj.product_name
            }
            if(this.filterobj.sku != '') {
                query += '&sku='+ this.filterobj.sku
            }
            var string = query + '&$skip=' + this.skip + '&$limit=' + this.limit
            this.init(string)
        },
        changePageSize (size) {
            this.limit = size
            this.skip = 0
            let query = this.pdmURL
            if(this.filterobj.product_name != '') {
                query += '&product_name='+ this.filterobj.product_name
            }
            if(this.filterobj.sku != '') {
                query += '&sku='+ this.filterobj.sku
            }
            var string = query + '&$skip=' + this.skip + '&$limit=' + this.limit
            this.init(string)
        },
        handleFilter () {
            var query = ''
            if(this.filterobj.product_name != '') {
                query += '&product_name='+ this.filterobj.product_name
            }
            if(this.filterobj.sku != '') {
                query += '&sku='+ this.filterobj.sku
            }
            var string = '&$skip=' + this.skip + '&$limit=' + this.limit
            let nurl = this.pdmURL + query + string
            this.init(nurl)
        },
        handleReset () {
            this.filterobj.product_name = ''
            this.filterobj.sku = ''
            var string = this.pdmURL + '&$skip=' + this.skip + '&$limit=' + this.limit
            this.init(string)
        },
        async init (url) {
            // console.log('.....', customconfig.default.pdmUrl)
            this.loading = true
            this.productData = await (axios.get(url, {headers: this.myvid}).then(res => {
                // console.log('resp........', res)
                this.tcount = res.data.hits.total
                return _.map(res.data.hits.hits, (d) => {
                    d._source.status = false
                    var obj = d._source
                    obj._id = d._id
                    return obj
                })
            }).catch(err => {
                console.log('Error', err)
                return []
            }))
            this.loading = false
        },
        async getVid () {
            var obj = {
                authorization: token
            }
            var uid = await (axios.post(customconfig.default.userDetail, '' ,{headers: obj}).then(res => {
                return res.data.data._id
            }))
            return uid   
        },
        async setvid(id) {
            var sobj = {
                authorization: token
            }
            var url = customconfig.default.vshopListUrl + '/' + id
            var s = await (axios.get(url, {headers: sobj}).then(res => {
                return res.data
            }).catch(err => {
                return ''
            }))
            this.myvid.vid = s[0].id
        }
    },
    async mounted () {
        this.pdmURL = customconfig.default.pdmUrl + '?source=sku,product_name,status'
        var mvid = await this.getVid()
        await this.setvid(mvid)
        await this.init(this.pdmURL)
    },
    watch: {
    }
};
</script>

<style scoped>
.productlisting {
    padding: 20px;
}
</style>

