<template>
  <div>
<!--<Tabs v-model="activetabs">
    <TabPane label="Configuration" name="Configuration">-->

    <div class="settings_header">
        <Button @click="addNewConfig">Add New Account</Button>
        <Button @click="addNewGeneralSettings">Add New Profile Configuration</Button>
        <Button @click="addNewPaymentSettings">Add New Payment Configuration</Button>
    </div>

    <div>
      <Row>
        <div v-for="(item, inx) in data6">
          <Col :span="12">
            <div style="padding: 5px;">
              <Card style="padding:10px; min-height:500px;">
                  <p slot="title">{{item.configName}}</p>
                  
                  <Tooltip placement="top" slot="extra" content="Toggle active / inactive" style="padding-left:3px;">
                      <i-switch v-model="item.isActive" :disabled="disabled" @on-change="buttonClicked(item)"></i-switch>
                  </Tooltip>
                  <ButtonGroup slot="extra" v-if="item.domain != 'custom'">
                      <Tooltip placement="top" content="Delete" style="padding-left:3px;">
                          <Button class="ButtonGroup" @click="deleteConfig(item)"   type="ghost" icon="trash-b"></Button>
                      </Tooltip>
                  </ButtonGroup>
                                  
                  <div>
                      <div class="firstPanel">
                          <table id="t01">
                                  <tr>
                                      <td>User</td>
                                      <td>{{ item.user}}</td>
                                  </tr>
                                  <tr>
                                      <td>Domain</td>
                                      <td>{{ item.domain}}</td>
                                  </tr>

                                  <tr v-if="item.domain == 'Xero'">
                                      <td >Consumer key </td>
                                      <td>
                                          <Input :type="consumerKeyType" readonly :value='item.consumerKey'>
                                              <Button slot="append" icon="eye" @click="showSecret('consumerKeyType')"></Button>
                                          </Input>                            
                                      </td>
                                  </tr>
                                  <tr v-if="item.domain == 'QB'">
                                      <td >Client ID </td>
                                      <td>
                                          <Input :type="client_idType" readonly :value='item.client_id'>
                                              <Button slot="append" icon="eye" @click="showSecret('client_idType')" ></Button>
                                          </Input>
                                      </td>
                                  </tr>
                                  <tr v-if="item.domain == 'custom'">
                                      <td >Customer Url </td>
                                      <td>
                                          <Input  readonly :value='item.customer_url'>
                                              
                                          </Input>
                                      </td>
                                  </tr>

                                  <tr v-if="item.domain == 'Xero'">
                                      <td >Consumer secret </td>
                                      <td>
                                          <Input :type="consumerSecretType" readonly :value='item.consumerSecret'>
                                              <Button slot="append" icon="eye" @click="showSecret('consumerSecretType')"></Button>
                                          </Input>
                                      </td>
                                  </tr>
                                  <tr v-if="item.domain == 'QB'">
                                      <td >Client secret </td>
                                      <td>
                                          <Input :type="client_secretType" readonly :value='item.client_secret'>
                                              <Button slot="append" icon="eye" @click="showSecret('client_secretType')"></Button>
                                          </Input>
                                      </td>
                                  </tr>
                                  <tr v-if="item.domain == 'custom'">
                                      <td >Invoice Url </td>
                                      <td>
                                          <Input  readonly :value='item.invoice_url'>
                                          </Input>
                                      </td>
                                  </tr>

                                  <tr v-if="item.domain == 'Xero'">
                                      <td >User agent</td>
                                      <td >{{ item.useragent}}</td>
                                  </tr>
                                  <tr v-if="item.domain == 'QB'">
                                      <td >realmId </td>
                                      <td >{{item.realmId}}</td>
                                  </tr>

                                  <tr v-if="item.domain == 'Xero'">
                                      <td >Certificate </td>
                                      <td >{{ item.pem}}</td>
                                  </tr>
                                  <tr v-if="item.domain == 'QB'">
                                      <td >Refresh Token: </td>
                                      <td >{{item.refresh_token}}</td>
                                  </tr>
                              </table>
                              <span>
                                  <div class="actionDiv" v-if="item.domain != 'custom'">
                                      <ButtonGroup>
                                          <Tooltip placement="top" content="Edit">
                                              <Button class="ButtonGroup" @click="editConfig(item)" type="ghost" icon="edit"></Button>
                                          </Tooltip>
                                      </ButtonGroup>
                                  </div>
                              </span>
                      </div>
                      <Collapse v-model="value2" accordion>
                          <Panel :name="item.configName + '2'">
                              Profile
                              <p slot="content" v-if="item.address && item.address !== ''">
                                  <table id="t01">
                                      <tr>
                                          <td>Name</td>
                                          <td>{{ item.address.name}}</td>
                                      </tr>
                                      <tr>
                                          <td>Address</td>
                                          <td>{{ item.address.AddressLine1}}, {{ item.address.AddressLine2}}, {{ item.address.city}}, {{ item.address.state}}, {{ item.address.country}}, {{ item.address.PostalCode}}</td>
                                      </tr>
                                      <tr>
                                          <td>Logo</td>
                                          <td><img style="height:50px" :src="item.logo" alt="No Image Available"/></td>
                                      </tr>
                                  </table>
                                  <span>
                                      <div class="actionDiv">
                                          <Tooltip placement="top" content="Delete">
                                              <Button class="ButtonGroup" @click="deleteGeneralConfig(item,inx)" type="ghost" icon="trash-b"></Button>
                                          </Tooltip>
                                          <Tooltip placement="top" content="Edit">
                                              <Button class="ButtonGroup" @click="editGeneralConfig(item,inx)" type="ghost" icon="edit"></Button>
                                          </Tooltip>
                                      </div>
                                  </span>
                              </p>
                              <p slot="content" v-else-if="item.logo !== ''">
                                  <table id="t01">
                                      <tr>
                                          <td>Logo</td>
                                          <td><img style="height:50px" :src="item.logo" alt="No Image Available"/></td>
                                      </tr>
                                  </table>
                                  <span>
                                      <div class="actionDiv">
                                          <Tooltip placement="top" content="Delete">
                                              <Button class="ButtonGroup" @click="deleteGeneralConfig(item,inx)" type="ghost" icon="trash-b"></Button>
                                          </Tooltip>
                                          <Tooltip placement="top" content="Edit">
                                              <Button class="ButtonGroup" @click="editGeneralConfig(item,inx)" type="ghost" icon="edit"></Button>
                                          </Tooltip>
                                      </div>
                                  </span>
                              </p>
                              <p slot="content" v-else style="text-align:center;color:#fd5e5e">
                                  Profile Information is not Available. <a @click="addNewGeneralSettings">Add new profile configuration.</a>
                              </p>
                          </Panel>
                          <Panel :name="item.configName + '3'">
                              Online Payment
                              <p slot="content" v-if="item.online_payment && item.online_payment !== ''">
                                  <Tabs :value="getTabValue(inx)" @on-click="setTabValue">
                                      <TabPane v-for="(v, k) in item.online_payment" v-if="v.length > 0 && item.online_payment[k].alldeleted === false" :label="keyName(k)" :name="setname(k, inx)" :key="k">
                                          <div class="schema-form ivu-table-wrapper">
                                              <div class="ivu-table ivu-table-border">
                                                  <div v-if="v.length > 0" class="ivu-table-body">
                                                      <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                                          <thead>
                                                              <tr>
                                                                  <th class="" v-for="(value, key) in v[0]" v-if="key !== 'isDeleted'">
                                                                      <div class="ivu-table-cell">
                                                                          <span>{{key}}</span>
                                                                      </div>
                                                                  </th>
                                                                  <th class="ivu-table-column-center">
                                                                      <div class="ivu-table-cell"><span>Action</span>
                                                                      </div>
                                                                  </th>
                                                              </tr>
                                                          </thead>
                                                          <tbody class="ivu-table-tbody">
                                                              <tr class="ivu-table-row" v-for="(row, i) in v" v-if="row.isDeleted == false">
                                                                  <td class="" v-for="(val, key) in row" v-if="key !== 'isDeleted'">
                                                                        <div class="ivu-table-cell" v-if="key === 'isDefault' && val === true" style="text-align:left">
                                                                            <Checkbox label="" v-model="checked" disabled></Checkbox>
                                                                        </div>
                                                                        <div class="ivu-table-cell" v-else-if="key === 'isDefault' && val === false"  style="text-align:left">
                                                                            <Checkbox label="" v-model="unchecked" disabled></Checkbox>
                                                                        </div>
                                                                        <div class="ivu-table-cell" v-else>
                                                                            {{row[key]}}
                                                                        </div>
                                                                  </td>
                                                                  <td class="ivu-table-column-center" style="padding:3px;">
                                                                      <div class="ivu-table-cell">
                                                                      <Tooltip content="Edit" placement="top">
                                                                          <Button class="ButtonGroup" @click="handleEdit(inx, k, i)" type="ghost" icon="edit"></Button>
                                                                          <!-- <a @click="handleEdit(inx, k, i)"><Icon type="edit" size="20" color="blue"></Icon></a> -->
                                                                      </Tooltip>
                                                                      <Tooltip content="Remove" placement="top">
                                                                          <Button class="ButtonGroup" @click="handleDelete(inx, k, i)" type="ghost" icon="android-delete"></Button>
                                                                          <!-- <a @click="handleDelete(inx, k, i)"><Icon type="android-delete" size="20" color="#e74c3c"></Icon></a> -->
                                                                      </Tooltip>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                              
                                                          </tbody>
                                                      </table>
                                                  </div>
                                                  <div v-else class="ivu-table-tip" style="display: none;">
                                                      <table cellspacing="0" cellpadding="0" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td><span>No Data</span></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </div>
                                              </div>
                                          </div>
                                      </TabPane>
                                      <TabPane v-else style="text-align:center;color:#fd5e5e" :label="keyName(k)" :name="setname(k, inx)" :key="k">
                                        {{keyName(k)}} Payment Information is deleted. <a @click="addNewPaymentSettings">Create New One</a>
                                      </TabPane>
                                  </Tabs>
                              </p>
                              <p slot="content" v-else style="text-align:center;color:#fd5e5e">
                                  Payment Information is not Available. <a @click="addNewPaymentSettings">Add new payment configuration.</a>
                              </p>
                          </Panel>
                      </Collapse>
                  </div>
              </Card>
              <Modal
                  v-model="modal1"
                  title="Edit Configuration"
                  ok-text="Save"
                  cancel-text="Cancel"
                  @on-ok="ok"
                  @on-cancel="cancel">
                  
                  <Form :model="editFormItemXero" :label-width="60" v-if='editFormType == "Xero"'>
                      <FormItem label="Config Name">
                          <Input v-model="editData.configName" placeholder="Enter something for QB..."></Input>
                      </FormItem>
                      <FormItem label="User Agent">
                          <Input v-model="editData.useragent"  placeholder="User Agent"></Input>
                      </FormItem>
                      <FormItem label="Consumer Key">
                          <Input v-model="editData.consumerKey"  placeholder="Consumer Key"></Input>
                      </FormItem>
                      <FormItem label="Consumer Secret">
                          <Input v-model="editData.consumerSecret"  placeholder="Consumer Secret"></Input>
                      </FormItem>
                      <FormItem label="Private Key" >
                          <!-- <Input v-model="XeroformValidate.privateKey" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                          -->
                          <Upload v-model="editData.privateKey"
                              :before-upload="handleUpload"
                              action="">
                              <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                          </Upload>
                          <div v-if="file !== ''">Uploaded file: {{ file.name }} </div>
                          <div v-else>Uploaded file: {{ editData.pem }} </div>
                      </FormItem>
                  </Form>
                  <Form :model="editFormItemQB" :label-width="60" v-if='editFormType == "QB"'>
                      <FormItem label="Config Name">
                          <Input v-model="editData.configName" placeholder="Configuaration Name"></Input>
                      </FormItem>
                      <FormItem label="Client ID">
                          <Input v-model="editData.client_id" placeholder="Client ID"></Input>
                      </FormItem>
                      <FormItem label="Client Secret">
                          <Input v-model="editData.client_secret" placeholder="Client Secret"></Input>
                      </FormItem>
                      <FormItem label="Realm ID">
                          <Input v-model="editData.realmId" placeholder="Realm ID"></Input>
                      </FormItem>
                      <FormItem label="Refresh Token">
                          <Input v-model="editData.refresh_token" placeholder="Refresh Token"></Input>
                      </FormItem>
                  </Form>
                  <Form :model="editFormItemCustom" :label-width="60" v-if='editFormType == "custom"'>
                      <FormItem label="Config Name">
                          <Input v-model="editData.configName" placeholder="Configuaration Name"></Input>
                      </FormItem>
                      <FormItem label="Customer Url">
                          <Input v-model="editData.customer_url" placeholder="Customer Url"></Input>
                      </FormItem>
                      <FormItem label="Invoice Url">
                          <Input v-model="editData.invoice_url" placeholder="Invoice Url"></Input>
                      </FormItem>
                      
                  </Form>            
              
              </Modal>
              <Modal
                  v-model="model2"
                  title="Edit Configuration"
                  ok-text="Save"
                  cancel-text="Cancel"
                  @on-ok="okGeneral"
                  @on-cancel="cancel">
                  
                  <Form :model="editGeneral" :label-width="100">
                      <div v-if="editGeneralData">
                          <FormItem label="AddressLine1">
                              <Input v-model="editGeneralData.AddressLine1" placeholder="AddressLine1"></Input>
                          </FormItem>
                          <FormItem label="AddressLine2">
                              <Input v-model="editGeneralData.AddressLine2" placeholder="AddressLine2"></Input>
                          </FormItem>
                          <FormItem label="Country" prop="country">
                              <!--<select v-model="country" id="country" name ="country" placeholder="Select Country">
                              </select> -->                         
                              <Input v-model="editGeneralData.country" placeholder="Country"></Input>
                          </FormItem>
                          <FormItem label="State">
                              <!-- <select v-model="state" id="state" name ="state" placeholder="Select State">
                              </select> -->
                              <Input v-model="editGeneralData.state" placeholder="State"></Input>
                          </FormItem>
                          <FormItem label="City">
                              <Input v-model="editGeneralData.city" placeholder="City"></Input>
                          </FormItem>
                          <FormItem label="Postal Code">
                              <Input v-model="editGeneralData.PostalCode" placeholder="PostalCode"></Input>
                          </FormItem>
                          <FormItem label="Logo">
                              <img style="height:50px" :src="editData.logo" alt="No Image Available"/>
                              <Upload id="fileUpload" v-model="editData.logo" :before-upload="handleUpload" action=''> 
                                  <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                              </Upload>
                              <div v-if="file !== null">Uploaded file: {{ file.name }} </div>
                          </FormItem>
                      </div>
                      <div v-else>
                           <FormItem label="Logo">
                              <img style="height:50px" :src="editData.logo" alt="No Image Available"/>
                              <Upload id="fileUpload" v-model="editData.logo" :before-upload="handleUpload" action=''> 
                                  <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                              </Upload>
                              <div v-if="file !== null">Uploaded file: {{ file.name }} </div>
                          </FormItem>
                      </div>
                  </Form>            
              
              </Modal>
            </div>
          </Col>
        </div>
      </Row>
    </div>
<!--</TabPane>-->

<!--<TabPane label="General" name="General">
  <div class="settings_header">
      <Button @click="addNewGeneralSettings">Add New General Configuration</Button>
  </div>
  <div>
      <Row>
          <div v-for="(item, inx) in data6">
              <Col :span="12">
                  <div v-if="item.address && item.address != ' '" style="padding: 5px">
                      <Card style="padding:10px;height: 365px;">
                          <p slot="title">{{item.configName}}</p>
                          <table id="t01">
                              <tr>
                                  <td>Name</td>
                                  <td>{{ item.address.name}}</td>
                              </tr>
                              <tr>
                                  <td>Address</td>
                                  <td>{{ item.address.AddressLine1}}, {{ item.address.AddressLine2}}, {{ item.address.city}}, {{ item.address.state}}, {{ item.address.country}}, {{ item.address.PostalCode}}</td>
                              </tr>
                              <tr>
                                  <td>Logo</td>
                                  <td><img style="height:50px" :src="item.logo" alt="No Image Available"/></td>
                              </tr>
                          </table>
                          <div class="actionDiv">
                              <Tooltip placement="top" content="Delete">
                                  <Button class="ButtonGroup" @click="deleteGeneralConfig(item)" type="ghost" icon="trash-b"></Button>
                              </Tooltip>
                              <Tooltip placement="top" content="Edit">
                                  <Button class="ButtonGroup" @click="editGeneralConfig(item)" type="ghost" icon="edit"></Button>
                              </Tooltip>
                          </div>
                      </Card>
                      <Modal
                          v-model="model2"
                          title="Edit Configuration"
                          ok-text="Save"
                          cancel-text="Cancel"
                          @on-ok="okGeneral"
                          @on-cancel="cancel">
                          
                          <Form :model="editGeneral" :label-width="100">
                              <FormItem label="AddressLine1">
                                  <Input v-model="editGeneralData.AddressLine1" placeholder="AddressLine1"></Input>
                              </FormItem>
                              <FormItem label="AddressLine2">
                                  <Input v-model="editGeneralData.AddressLine2" placeholder="AddressLine2"></Input>
                              </FormItem>
                              <FormItem label="Country" prop="country">                         
                                  <Input v-model="editGeneralData.country" placeholder="Country"></Input>
                              </FormItem>
                              <FormItem label="State">
                                  <Input v-model="editGeneralData.state" placeholder="State"></Input>
                              </FormItem>
                              <FormItem label="City">
                                  <Input v-model="editGeneralData.city" placeholder="City"></Input>
                              </FormItem>
                              <FormItem label="Postal Code">
                                  <Input v-model="editGeneralData.PostalCode" placeholder="PostalCode"></Input>
                              </FormItem>
                              <FormItem label="Logo">
                                  <img style="height:50px" :src="editData.logo" alt="No Image Available"/>
                                  <Upload id="fileUpload" v-model="editData.logo" :before-upload="handleUpload" action=''> 
                                      <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                                  </Upload>
                                  <div v-if="file !== null">Uploaded file: {{ file.name }} </div>
                              </FormItem>
                          </Form>            
                      
                      </Modal>
                  </div>
              </Col>
          </div>
      </Row>
  </div>
</TabPane>

<TabPane label="Online Payment" name="Online Payment">
  <div class="settings_header">
      <Button @click="addNewPaymentSettings">Add New Payment Configuration</Button>
  </div>
  <div class="dashboard">
      <Row>
          <div v-for="(item, inx) in data6">
              <Col :span="12">
                  <div v-if="item.online_payment && item.online_payment != ' '" style="padding: 5px">
                      <Card style="padding:10px;">
                          <p slot="title">{{item.configName}}</p>
                          <p>
                              <Tabs :value="getTabValue(inx)" @on-click="setTabValue">
                                  <TabPane v-if="v.length > 0" v-for="(v, k) in item.online_payment" :label="k" :name="setname(k, inx)" :key="k">
                                      <div class="schema-form ivu-table-wrapper">
                                          <div class="ivu-table ivu-table-border">
                                              <div v-if="v.length > 0" class="ivu-table-body">
                                                  <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                                      <thead>
                                                          <tr>
                                                              <th class="" v-for="(value, key) in v[0]" v-if="key !== 'isDeleted'">
                                                                  <div class="ivu-table-cell">
                                                                      <span>{{key}}</span>
                                                                  </div>
                                                              </th>
                                                              <th class="ivu-table-column-center">
                                                                  <div class="ivu-table-cell"><span>Action</span>
                                                                  </div>
                                                              </th>
                                                          </tr>
                                                      </thead>
                                                      <tbody class="ivu-table-tbody">
                                                          <tr class="ivu-table-row" v-for="(row, i) in v" v-if="row.isDeleted == false">
                                                              <td class="" v-for="(val, key) in row" v-if="key !== 'isDeleted'">
                                                                  <div class="ivu-table-cell">
                                                                      {{row[key]}}
                                                                  </div>
                                                              </td>
                                                              <td class="ivu-table-column-center" style="padding:3px;">
                                                                  <div class="ivu-table-cell">
                                                                  <Tooltip content="Edit" placement="top">
                                                                      <Button class="ButtonGroup" @click="handleEdit(inx, k, i)" type="ghost" icon="edit"></Button>
                                                                       
                                                                  </Tooltip>
                                                                  <Tooltip content="Remove" placement="top">
                                                                      <Button class="ButtonGroup" @click="handleDelete(inx, k, i)" type="ghost" icon="android-delete"></Button>
                                                                  </Tooltip>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                          
                                                      </tbody>
                                                  </table>
                                              </div>
                                              <div v-else class="ivu-table-tip" style="display: none;">
                                                  <table cellspacing="0" cellpadding="0" border="0">
                                                      <tbody>
                                                          <tr>
                                                              <td><span>No Data</span></td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </div>
                                          </div>
                                      </div>
                                  </TabPane>
                              </Tabs>
                          </p>
                      </Card>
                  </div>
              </Col>
          </div>
      </Row>
  </div>
</TabPane> -->
<!--</Tabs>   -->   
  </div>
</template>

<script>
    import _ from 'lodash'
    import Vue from 'vue'
    import VueWidgets from 'vue-widgets'
    import 'vue-widgets/dist/styles/vue-widgets.css'
    import axios from "axios"
    let config = require("@/config/customConfig.js")
    let feathersUrl =  config.default.serviceUrl;
    let baseUrl = config.default.baseUrl;
    import Cookies from 'js-cookie';
    import psl from 'psl';
    // import customSetting from './General-setting.vue'
    // import onlinePayment from './Online-Payment.vue'
    Vue.use(VueWidgets);


    export default {
        components: {
            
        },
        data () {
            return {
                checked: true,
                unchecked: false,
                value2 : [],
                isDeleteLogo: true,
                isDeleteAddress: true,
                activetabs: '',
                current: '',
                tabValue: '',
                editindex: '',
                exData: '',
                gateway: '',
                country: '',
                state: '',
                editFormItemXero: {
                    input: ''
                },
                editFormItemQB: {
                    input: ''
                },
                editFormItemCustom :{
                    input: ''
                },
                editGeneral : {
                    input: ''
                },
                onlinePayment : {
                    input: ''
                },
                file:'',
                editData : {},
                editGeneralData: {},
                editPaymentData: {},
                editFormType : "",
                modal1: false,
                model2 : false,
                model3 : false,
                disabled:false,
                switch1: false,
                comp: true,
                consumerKeyType:"password",
                client_idType:"password",
                consumerSecretType:"password",
                client_secretType:"password",
                Configurations: "Configurations",
                columns7: [
                    {
                        title: 'User',
                        key: 'user'
                    },
                    {
                        title: 'Domain',
                        key: 'domain'
                    },
                    {
                        title: 'consumerKey',
                        key: 'consumerKey'
                    },
                    {
                        title: 'consumerSecret',
                        key: 'consumerSecret'
                    },
                    {
                        title: 'useragent',
                        key: 'useragent'
                    }
                ],
                data6: [
                ],
                tabarr: [],
                activearr: []
            }
        },
        methods: {
            keyName(k) {
                if (k === 'auth') {
                    return 'Authorize.Net'
                }
                else if (k === 'paypal') {
                    return 'PayPal'
                }
                else {
                    return k
                }
            },
            getTabValue (inx) {
                // console.log('inx', this.tabarr[inx].activetab)
                return this.tabarr[inx].activetab
            },
            setTabValue (name) {
                let inx = parseInt(name.charAt(name.length - 1))
                // console.log('name :: ', name)
                this.tabarr[inx].activetab = name
            },
            setname (k, inx) {
                return k + inx
            },
            handleEdit (card, tabname, rowinx) {
                console.log('Edit :: ', card, tabname, rowinx, '--data--', this.data6[card].online_payment[tabname][rowinx])
                let self = this;
                this.exData = this.data6[card].online_payment[tabname][rowinx];
                let oldData = _.cloneDeep(this.data6[card].online_payment[tabname][rowinx])
                oldData = _.omit(oldData, ['_index', '_rowKey'])
                console.log('...', oldData, this.exData )
                this.$Modal.confirm({
                    title: 'Edit',
                    closable: true,
                    render: (h, params) => {
                        let myFormItem = []
                        for(let k in oldData) {
                            if (k === 'isDefault') {
                                myFormItem.push(
                                h('FormItem', {
                                    props: {
                                        label: k
                                    }
                                }, [
                                    h('Checkbox', {
                                        props: {
                                            value: self.exData[k]
                                        },
                                        on: {
                                            'on-change': (value) => {
                                                console.log(value)
                                                self.exData[k] = value
                                            }
                                        }
                                    })
                                ])
                            )    
                            } else {
                                myFormItem.push(
                                    h('FormItem', {
                                        props: {
                                            label: k
                                        }
                                    }, [
                                        h('Input', {
                                            props: {
                                                value: self.exData[k]
                                            },
                                            on: {
                                                'input': (value) => {
                                                    console.log('Input:: ', value)
                                                    self.exData[k] = value
                                                }
                                            }
                                        })
                                    ])
                                )
                            }
                        } 
                        // console.log('myFormItem', myFormItem)
                        return h('div', {},  
                        [
                            h('Form', {}, myFormItem)
                        ])
                    },
                    onOk() {
                        console.log("edited data", self.exData);
                        let rowIndex = rowinx;
                        // self.exData = _.omit(self.exData, ['_index', '_rowKey'])
                        console.log("rowIndex",rowIndex);
                        let configId = self.data6[card].id;
                        console.log("configId",configId);
                        let patchData = {
                            id : configId,
                            rowIndex : rowIndex,
                            online_payment : {
                                [tabname] : self.exData
                            }
                        };
                        console.log("patchData",patchData)
                        axios({
                            method:'patch',
                            url:feathersUrl +'settings/'+configId,
                            data: patchData,
                            headers:{
                                Authorization : Cookies.get('auth_token'),
                                subscriptionId : Cookies.get('subscriptionId')
                            },
                        }).then(response => {
                            console.log("++++++++++++------------response",response);
                            if(response.status == 200){
                                this.$Message.success("Configuaration updated successfully")
                            }
                            
                        })
                        .catch(error => {
                            console.log(error)
                            if(error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain
                                
                                Cookies.remove('auth_token' ,{domain: location}) 
                                self.$store.commit('logout', self);
                                
                                self.$router.push({
                                    name: 'login'
                                });
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }else if(error.response.status == 403){
                                self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });
                    },
                    onCancel() {
                        console.log('CANCEL!!')
                    }
                })
            },
            handleDelete (card, tabname, rowinx) {
                // console.log("in handleDelete-------------->",handleDelete)
                let self = this;
                console.log('Delete :: ', card, tabname, rowinx, '--data--', this.data6[card].online_payment[tabname][rowinx])
                let configId = self.data6[card].id;
                this.$Modal.confirm({ 
                    title: 'Confirm Delete',
                    okText : "Delete",
                    cancelText: 'Cancel',
                    content: '',
                    onOk: () => {
                        self.exData = self.data6[card].online_payment[tabname][rowinx];
                        console.log("self.exData",self.exData);
                        self.exData.isDeleted = true;
                        let patchData = {
                            id : configId,
                            rowIndex : rowinx,
                            online_payment : {
                                [tabname] : self.exData
                            }
                        };
                        console.log("patchData",patchData)
                        axios({
                            method:'patch',
                            url:feathersUrl +'settings/'+configId,
                            data: patchData,
                            headers:{
                                Authorization : Cookies.get('auth_token'),
                                subscriptionId : Cookies.get('subscriptionId')
                            },
                        }).then(response => {
                            if(response.status == 200){
                                this.$Message.success("Configuaration deleated successfully")
                            }
                            console.log("YYYYYYYYYYYYy",self.exData);
                            console.log("EEEEEEEEEEEEe",self.data6[card].online_payment[tabname][rowinx])
                        })
                        .catch(error => {
                            console.log(error)
                            if(error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain
                                
                                Cookies.remove('auth_token' ,{domain: location}) 
                                self.$store.commit('logout', self);
                                
                                self.$router.push({
                                    name: 'login'
                                });
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }else if(error.response.status == 403){
                                self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });
                    },
                    render: (h) => {
                        return h('div', {
                        }, [
                            h('span', {
                                style:{
                                    fontSize:'25px'
                                },
                                props: {
                                },
                                on: {
                                    input: (val) => {
                                    }
                                }
                            },'This Payment Configuration Will Be Deleted for ' + self.data6[card].configName),
                        ])
                    }
                })
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            addNewConfig(){
                 this.$store.state.settingData = ""
                this.$router.push({
                        name: 'Account Settings'
                    });
            },
            addNewGeneralSettings() {
                this.$store.state.settingData = ""
                this.$router.push({
                    name: 'Profile Settings'
                });
            },
            addNewPaymentSettings() {
                console.log("here")
                this.$store.state.settingData = ""
                this.$router.push({
                    name: 'Payment Settings'
                });
            },
            defaultChanged(e){
                
                console.log(e)
            },
            change (status) {
                
            },
            deleteConfig(data){
                this.$Modal.confirm({ 
                    title: 'Confirm Delete',
                    okText : "Delete",
                    cancelText: 'Cancel',
                    content: '',
                    onOk: () => {
                        axios({
                            method:'patch',
                            url:feathersUrl +'settings/'+data.id,
                            data:{isDeleated : true },
                            headers:{
                                Authorization : Cookies.get('auth_token'),
                                subscriptionId : Cookies.get('subscriptionId')
                            },
                        }).then(response => {
                            if(response.status == 200){
                                this.$Message.success("Configuaration deleated successfully")
                                console.log("TTTTTTTTTTTTTTTTT------------------")
                                let deletedData =  this.data6.filter(function(el) {
                                    return el.id !== data.id;
                                });
                                this.data6 = deletedData, null, ' '
                            }
                            
                        })
                        .catch(error => {
                            console.log(error)
                            if(error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain
                                
                                Cookies.remove('auth_token' ,{domain: location}) 
                                self.$store.commit('logout', self);
                                
                                self.$router.push({
                                    name: 'login'
                                });
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }else if(error.response.status == 403){
                                self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });
                    },
                    render: (h) => {
                        return h('div', {
                        }, [
                            h('span', {
                                style:{
                                    fontSize:'25px'
                                },
                                props: {
                                },
                                on: {
                                    input: (val) => {
                                    }
                                }
                            },'This Account Will Be Deleted Permanently'),
                        ])
                    }
                })
                
            },
            deleteGeneralConfig(data,index){
                this.$Modal.confirm({ 
                    title: 'Confirm Delete',
                    okText : "Delete",
                    cancelText: 'Cancel',
                    content: '',
                    onOk: () => {
                      console.log("this.isDeleteLogo============>",this.isDeleteLogo)
                      console.log("this.isDeleteAddress============>",this.isDeleteAddress)
                      if(this.isDeleteLogo == true){
                        console.log("inside logo"); 
                        this.editData.logo = '';
                      }
                      if(this.isDeleteAddress == true){
                        console.log("inside address");
                        this.editData.address = '';
                      }
                        console.log("TTTTTTTTTTTTT",this.editData)
                        axios({
                            method:'patch',
                            url:feathersUrl +'settings/'+data.id,
                            data: this.editData,
                            headers:{
                                Authorization : Cookies.get('auth_token'),
                                subscriptionId : Cookies.get('subscriptionId')
                            },
                        }).then(response => {
                            console.log("response-------------->",response)
                            let configName = response.data.configName;
                            // console.log("configName",configName);
                            // console.log("this.data6",this.data6);
                            console.log("this.data6[response.data.configName]",this.data6[index])
                            this.data6[index].logo = response.data.logo;
                            this.data6[index].address = response.data.address;
                            console.log("this.editData",this.editData)
                            console.log("this.editGeneralData",this.editGeneralData)
                            // this.data6[index] = response.data
                            // console.log("this.data6[card]",this.data6[card])
                            if(response.status == 200){
                                this.$Message.success("Configuaration deleated successfully")
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            if(error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain
                                
                                Cookies.remove('auth_token' ,{domain: location}) 
                                self.$store.commit('logout', self);
                                
                                self.$router.push({
                                    name: 'login'
                                });
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }else if(error.response.status == 403){
                                self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });
                    },

                    render: (h) => {
                      this.isDeleteAddress = true;
                      this.isDeleteLogo = true;
                      return h('div', [
                        h('span', {
                                style:{
                                    fontSize:'20px'
                                },
                                props: {
                                },
                                on: {
                                    input: (val) => {
                                    }
                                }
                            },'This Profile Will Be Deleted for ' + data.configName),
                        h('Row', [
                          h('Checkbox', {
                            style:{
                              marginTop: '15px'
                            },
                            props: {
                                value: true
                            },
                            on: {
                                input: (val) => {
                                    console.log("val", val)
                                    this.isDeleteLogo = val
                                }
                            }
                        }, 'Delete logo?'),
                      ]),
                      h('Row', [
                        h('Checkbox', {
                            props: {
                                value: true
                            },
                            on: {
                                input: (val) => {
                                  console.log("val-------->", val)
                                  this.isDeleteAddress = val
                                }
                            }
                        }, 'Delete Address?')])
                      ])
                        // return h('div', {
                        // }, [
                        //     h('span', {
                        //         style:{
                        //             fontSize:'22px'
                        //         },
                        //         props: {
                        //         },
                        //         on: {
                        //             input: (val) => {
                        //             }
                        //         }
                        //     },'This Address Will Be Deleted for ' + data.configName),
                        // ])
                    }
                })
                
            },
            editConfig(data){
                this.editData = data;
                this.editFormType = data.domain;
                this.modal1 = true;

            },
            editGeneralConfig(data,inx) {
                console.log("inside edit")
                var newassignData = _.cloneDeep(data);
                this.editindex = inx
                this.editData = newassignData
                this.editGeneralData = newassignData.address;
                this.model2 = true;
            },
            editPaymentConfig(data) {
                this.editData = data;
                this.editPaymentData = data.online_payment;
                this.model3 = true;
            },
            async ok () {
                let self = this
                
                let EditModifiedData = await this.editedData() 
                console.log(EditModifiedData)
                let patchData = _.cloneDeep(EditModifiedData)
                delete patchData.online_payment;
                console.log("--------------",patchData);
                axios({
                    method:'patch',
                    url:feathersUrl +'settings/'+this.editData.id,
                    data: patchData,
                    headers: {
                        Authorization : Cookies.get('auth_token'),
                        subscriptionId : Cookies.get('subscriptionId')
                    },
                })
                .then(response => {
                    if(response.status == 200){
                        this.$Message.success("Configuaration updated successfully")
                    }
                    this.disabled = false;
                })
                .catch(error => {
                        console.log(error)
                        this.disabled = false;
                        if(error.response.status == 401){
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                            
                            Cookies.remove('auth_token' ,{domain: location}) 
                            self.$store.commit('logout', self);
                            
                            self.$router.push({
                                name: 'login'
                            });
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }else if(error.response.status == 403){
                            self.$Notice.error({
                            duration:0, 
                            title: error.response.statusText,
                            desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                            });
                        }else {
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }
                });
            },
            async okGeneral () {
                let self = this
                let EditModifiedData

                // self.editData.address = self.editGeneralData
                // console.log("*****************self.editGeneralData",self.editGeneralData)

                if( self.file != '' && (self.file.type === "image/png" || self.file.type === "image/jpeg")){
                    console.log('this.file',this.file)
                    var reader = new FileReader();
                    var file = this.file
                    reader.addEventListener("load",function () {
                    EditModifiedData = reader.result
                    console.log('reader------->',self.editData.logo)
                    let patchData = {
                      id : self.editData.id,
                      address : self.editData.address,
                      logo : EditModifiedData
                    };
                    axios({
                      method:'patch',
                      url:feathersUrl +'settings/'+self.editData.id,
                      data: patchData,
                      headers:{
                          Authorization : Cookies.get('auth_token'),
                          subscriptionId : Cookies.get('subscriptionId')
                      },
                      }).then(response => {
                        console.log("response--------------->",response.data, response.data.id, self.data6)
                        let fInx = _.findIndex(self.data6, {id: response.data.id})
                        console.log('My Index ::', fInx)
                        if (fInx !== undefined && fInx >= 0) {
                          // this.data6.splice(fInx, 1)
                          // this.data6.splice(fInx, 0, response.data)
                          self.data6[fInx].address = response.data.address
                          // this.data6[fInx].logo = ''
                          self.data6[fInx].logo = response.data.logo
                          console.log('Done!!!')
                        }
                          if(response.status == 200){
                              self.$Message.success("Configuaration updated successfully")
                          }
                          self.disabled = false;
                      }).catch(error => {
                          console.log(error)
                          self.disabled = false;
                          if(error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain
                                
                                Cookies.remove('auth_token' ,{domain: location}) 
                                self.$store.commit('logout', self);
                                
                                self.$router.push({
                                    name: 'login'
                                });
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }else if(error.response.status == 403){
                                self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });
                    }, false);

                    if (file) {
                        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',reader)
                        reader.readAsDataURL(file);
                    }
                }
                else if (self.file == '') {

                     let patchData = {
                      id : self.editData.id,
                      address : self.editData.address
                    };
                    axios({
                      method:'patch',
                      url:feathersUrl +'settings/'+self.editData.id,
                      data: patchData,
                      headers:{
                          Authorization : Cookies.get('auth_token'),
                          subscriptionId : Cookies.get('subscriptionId')
                      },
                      }).then(response => {
                         console.log("response--------------->",response.data)
                        console.log('this.data6-------------->',this.data6)
                        let fInx = _.findIndex(this.data6, {id: response.data.id})
                        if (fInx !== undefined && fInx >= 0) {
                          this.data6[fInx].address = response.data.address
                          console.log('Done!!!')
                        }
                        // console.log('index of data------->',this.editindex)
                        // console.log("this.data6[this.editindex]",this.data6[this.editindex])
                        // this.data6[this.editindex]=response.data
                        // console.log("after assign this.data6[this.editindex]",this.data6[this.editindex])
                        // this.data6[this.editindex] = response.data
                        // console.log("*****************self.editGeneralData",self.editGeneralData)
                          if(response.status == 200){
                              self.$Message.success("Configuaration updated successfully")
                          }
                          self.disabled = false;
                      }).catch(error => {
                          console.log(error)
                          self.disabled = false;
                          if(error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain
                                
                                Cookies.remove('auth_token' ,{domain: location}) 
                                self.$store.commit('logout', self);
                                
                                self.$router.push({
                                    name: 'login'
                                });
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }else if(error.response.status == 403){
                                self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });

                }else {
                    self.$Message.error(' Please, attach a .jpg or .png file!');
                }

            },
            async editedData (){
                let self= this;
                let reader  = new FileReader();
                return new Promise ((resolve , reject) =>{
                    if (this.file && this.editData.domain == "Xero") {
                        console.log("Is file uploaded = yes")
                            reader.readAsDataURL(this.file);
                            
                             reader.addEventListener("load", function () {
                                let lastModified = self.file.lastModified +"-"+self.file.name;
                                self.editData.certificate = reader.result.substring( reader.result.indexOf(",")+1),
                                self.editData.pem = lastModified;
                                
                                resolve(self.editData)
                            })
                          }else {
                            
                            resolve(self.editData)
                        }
                })
            },
            // async getGeneralEditedData() {
            //     let self = this;
            //     // return new Promise ((resolve , reject) =>{ 
            //         console.log('**************',this.file)
            //         console.log("self.file.type", this.file.type)
            //         console.log("-------------config id",this.editData.id)              
            //         // self.editData['logo'] = '';
            //         if( self.file != '' && (self.file.type === "image/png" || self.file.type === "image/jpeg")){
            //             console.log('this.file',this.file)
            //             var reader = new FileReader();
            //             var file = this.file
                        
            //             // var logoData1 = {'logo': reader.result}
            //             await reader.addEventListener("load",function () {
            //                 self.editData.logo = reader.result
            //                 console.log('reader------->',self.editData.logo)
            //             }, false);

            //             if (file) {
            //                 // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',reader)
            //                 reader.readAsDataURL(file);
            //             }
            //         }
            //         else if (self.file == '') {

            //         }else {
            //             self.$Message.error(' Please, attach a .jpg or .png file!');
            //         }

            //         console.log("=====++++++++++++self.editData",self.editData.logo)
            //         return(self.editData.logo);
            //     // })
            // },
            cancel () {
                this.file = ''
                //this.$Message.info('Clicked cancel');
            },
           async handleUpload (file) {
              var self = this
              console.log('file',file)
              if(file.size >= 51200){
                  this.$Notice.error({
                    title: 'File Limit',
                    desc: 'File size should be less than or equal to 50Kb. ',
                    duration: 4.5
                  });
                  self.file = ''
                  return true
              }
              else {
                self.file = file
              }
              return false;
            },
            showSecret(data){
                console.log("----------=================",this[data])
                if(this[data] == "password" ){
                    this[data] = "text"
                }else{
                    this[data] = "password"
                }
                //if(data == show[0].id){
                
                // if(this.client_idType == "password" ){
                //     this.client_idType = "text"
                // }else{
                //     this.client_idType = "password"
                // }

                // if(this.client_secretType == "password"){
                //     this.client_secretType = "text"
                // }else{
                //     this.client_secretType = "password"
                // }

                // if(this.consumerKeyType == "password"){
                //     this.consumerKeyType = "text"
                // }else{
                //     this.consumerKeyType = "password"
                // }

                // if(this.consumerSecretType == "password"){
                //     this.consumerSecretType = "text"
                // }else{
                //     this.consumerSecretType = "password"
                // }
                //}
                
                
            },
            buttonClicked(data){
                this.disabled = true;
                axios({
                    method:'patch',
                    url:feathersUrl +'settings/'+data.id,
                    data:{isActive : data.isActive },
                    headers:{
                        Authorization : Cookies.get('auth_token'),
                        subscriptionId : Cookies.get('subscriptionId')
                    },
                }).then(response => {
                    if(response.status == 200){
                        this.$Message.success("Configuaration updated successfully")
                    }
                    this.disabled = false;
                })
                .catch(error => {
                        console.log(error)
                        this.disabled = false;
                        if(error.response.status == 401){
                                let location = psl.parse(window.location.hostname)
                                location = location.domain === null ? location.input : location.domain
                                
                                Cookies.remove('auth_token' ,{domain: location}) 
                                self.$store.commit('logout', self);
                                
                                self.$router.push({
                                    name: 'login'
                                });
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }else if(error.response.status == 403){
                                self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                });
            }
        },
        computed: {
            productChunks(){
                return _.chunk(this.data6, 2);
            }
        },
        async mounted(){
            this.$Loading.start()
            // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&",this.$route.params)
            // if (this.$route.params.tabName) {
            //     this.activetabs = this.$route.params.tabName
            // }
            let self = this;   
            self.loading = true;
            let  data = {
                "configName": "Custom Configuration",
                "customer_url" :  feathersUrl+"customcustomer",
                "invoice_url" : feathersUrl+"custominvoice",
                "domain" : 'custom',
                "isActive" : true,
                "isDeleated" : false,
                "subscriptionId" : Cookies.get('subscriptionId')
            };

            // ------------------------
            axios({
                method:'get',
                url:feathersUrl +'settings',
                headers:{
                    Authorization : Cookies.get('auth_token'),
                    subscriptionId : Cookies.get('subscriptionId')
                },
            })
            .then(async response => {
                console.log("---------response",response)
                localStorage.clear();
                self.data6 = response.data.data
                console.log("+++++++++++++++++++++data6",self.data6);
                let arrIndex = _.findIndex(response.data.data, function(o) { return o.domain == 'custom'; });
                console.log("arrIndex",arrIndex)
                if (arrIndex < 0) {
                    await axios({
                        method: 'post',
                        url: feathersUrl +'settings',
                        headers:{
                            Authorization : Cookies.get('auth_token'),
                            subscriptionId : Cookies.get('subscriptionId')
                        },
                        data: data
                    })
                    .then(function (response) {
                        console.log("-----------settings response",response)
                        self.data6.push(response.data);
                        // self.data6.push(response.data);
                        // self.$Message.success('Success!');
                    })
                    .catch(function (error) {
                        console.log("error in get settings",error)
                        if(error.response.status == 401){
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                            
                            Cookies.remove('auth_token' ,{domain: location}) 
                            Cookies.remove('subscriptionId' ,{domain: location}) 
                            this.$store.commit('logout', this);
                            
                            this.$router.push({
                                name: 'login'
                            });
                        }else if(error.response.status == 403){
                            console.log("error.response",error.response)
                            if (error.response.data.data.errorCode === 'ERR-LIMIT-OVER' || error.response.data.data.errorCode === 'ERR-PERMISSION') {
                                self.$Notice.error({
                                    duration:0, 
                                    title: error.response.statusText,
                                    desc:error.response.data.message
                                });
                            }
                            else {
                                self.$Notice.error({
                                    duration:0, 
                                    title: error.response.statusText,
                                    desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                                });
                            }
                        }else {
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }
                    });
                }
                console.log("after post self.data6",self.data6);
                for (let [inx, item] of self.data6.entries()) {

                    if (item.hasOwnProperty('online_payment')) {
                        let i = 0
                        // console.log('item:: ', item.online_payment)
                        if (item.online_payment !== '') {
                            for (let k in item.online_payment) {
                                console.log("before",item.online_payment[k])
                                item.online_payment[k] = _.reject(item.online_payment[k], {isDeleted: true})
                                if (item.online_payment[k].length > 0) {
                                    if (i === 0) {
                                        // self.alldata = false;
                                        // item.online_payment[k].alldeleted = false;
                                        self.tabarr.push({activetab : k+inx})
                                        i++
                                    }
                                    item.online_payment[k].alldeleted = false;
                                }
                                else {
                                    //message
                                    console.log(2);
                                    // self.alldata = true;
                                    item.online_payment[k].alldeleted = true;
                                    self.tabarr.push({activetab : ''})
                                }
                                console.log("after",item.online_payment[k])
                            }
                        }
                        else {
                            self.tabarr.push({activetab : ''})
                        }
                    } else {
                        self.tabarr.push({activetab : ''})
                    }
                }
                console.log("self.tabarr",self.tabarr)
                self.$Loading.finish();
            })
            .catch(error => {
                if(error.response.status == 401){
                    let location = psl.parse(window.location.hostname)
                    location = location.domain === null ? location.input : location.domain
                    
                    Cookies.remove('auth_token' ,{domain: location}) 
                    Cookies.remove('subscriptionId' ,{domain: location}) 
                    self.$store.commit('logout', self);
                    
                    self.$router.push({
                        name: 'login'
                    });
                }else if(error.response.status == 403){
                    console.log("error.response.data.data.errorCode",error.response.data.data.errorCode)
                    if (error.response.data.data.errorCode === 'ERR-LIMIT-OVER' || error.response.data.data.errorCode === 'ERR-PERMISSION') {
                        self.$Notice.error({
                            duration:0, 
                            title: error.response.statusText,
                            desc:error.response.data.message
                        });
                    }
                    else {
                        self.$Notice.error({
                            duration:0, 
                            title: error.response.statusText,
                            desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                        });
                    }
                    // self.$Notice.error(
                    //     {duration:0, 
                    //     title: error.response.statusText,
                    //     desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'}
                    //     );
                
                }else {
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }
                self.$Loading.error();
            });
            // -------------------------


            // axios({
            //     method: 'post',
            //     url: feathersUrl +'settings',
            //     headers:{
            //         Authorization : Cookies.get('auth_token'),
            //         subscriptionId : Cookies.get('subscriptionId')
            //     },
            //     data: data
            // })  
            // .then(function (response) {
            //     console.log("-----------settings response",response)
            //     // self.$Message.success('Success!');
            //     self.loading = false;
            //     axios({
            //         method:'get',
            //         url:feathersUrl +'settings',
            //         headers:{
            //             Authorization : Cookies.get('auth_token'),
            //             subscriptionId : Cookies.get('subscriptionId')
            //         },
            //     })
            //     .then(response => {
            //         console.log(response)
            //         localStorage.clear();
            //         self.data6 = response.data.data
            //         console.log("+++++++++++++++++++++data6",self.data6);
            //         for (let [inx, item] of self.data6.entries()) {

            //             if (item.hasOwnProperty('online_payment')) {
            //                 let i = 0
            //                 // console.log('item:: ', item.online_payment)
            //                 if (item.online_payment !== '') {
            //                     for (let k in item.online_payment) {
            //                         item.online_payment[k] = _.reject(item.online_payment[k], {isDeleted: true})
            //                         if (item.online_payment[k].length > 0) {
            //                             if (i === 0) {
            //                                 self.tabarr.push({activetab : k+inx})
            //                                 i++
            //                             }
            //                         }
            //                     }
            //                 }
            //                 else {
            //                     self.tabarr.push({activetab : ''})
            //                 }
            //             } else {
            //                 self.tabarr.push({activetab : ''})
            //             }
            //         }
            //         console.log("self.tabarr",self.tabarr)
            //         self.$Loading.finish();
            //     })
            //     .catch(error => {
            //         if(error.response.status == 401){
            //             let location = psl.parse(window.location.hostname)
            //             location = location.domain === null ? location.input : location.domain
                        
            //             Cookies.remove('auth_token' ,{domain: location}) 
            //             Cookies.remove('subscriptionId' ,{domain: location}) 
            //             self.$store.commit('logout', self);
                        
            //             self.$router.push({
            //                 name: 'login'
            //             });
            //         }else if(error.response.status == 403){
            //             self.$Notice.error(
            //                 {duration:0, 
            //                 title: error.response.statusText,
            //                 desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'}
            //                 );
                    
            //         }
            //         self.$Loading.error();
            //     });
            // })
            // .catch(function (error) {
            //     console.log(error)
            //     if(error.response.status == 401){
            //         let location = psl.parse(window.location.hostname)
            //         location = location.domain === null ? location.input : location.domain
                    
            //         Cookies.remove('auth_token' ,{domain: location}) 
            //         Cookies.remove('subscriptionId' ,{domain: location}) 
            //         this.$store.commit('logout', this);
                    
            //         this.$router.push({
            //             name: 'login'
            //         });
            //     }else if(error.response.status == 403){
            //         console.log("error.response",error.response)
            //         // if (error.response.data.data.errorCode === 'ERR-LIMIT-OVER') {
            //             axios({
            //                 method:'get',
            //                 url:feathersUrl +'settings',
            //                 headers:{
            //                     Authorization : Cookies.get('auth_token'),
            //                     subscriptionId : Cookies.get('subscriptionId')
            //                 },
            //             })
            //             .then(response => {
            //                 console.log(response)
            //                 localStorage.clear();
            //                 self.data6 = response.data.data
            //                 console.log("+++++++++++++++++++++data6",self.data6);
            //                 for (let [inx, item] of self.data6.entries()) {
            //                     if (item.hasOwnProperty('online_payment')) {
            //                         let i = 0
            //                         // console.log('item:: ', item.online_payment)
            //                         for (let k in item.online_payment) {
            //                             item.online_payment[k] = _.reject(item.online_payment[k], {isDeleted: true})
            //                             if (item.online_payment[k].length > 0) {
            //                                 if (i === 0) {
            //                                     self.tabarr.push({activetab : k+inx})
            //                                     i++
            //                                 }
            //                             }
            //                         }
            //                     } else {
            //                         self.tabarr.push({activetab : ''})
            //                     }
            //                 }
            //                 console.log("self.tabarr",self.tabarr)
            //                 self.$Loading.finish();
            //             })
            //         // }
            //         // else {
            //         //     self.$Notice.error({
            //         //         duration:0, 
            //         //         title: error.response.statusText,
            //         //         desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
            //         //     });
            //         // }
            //     }
            // }); 
        }
    }
</script>

<style scoped>
.settings_header{
    padding : 10px;
    text-align:right;
    background: #cacaca;
    width:100%;
    margin:14px 2px;
}

.ivu-radio-group {
    display: block !important;
    font-size: 14px !important;
    /* vertical-align: middle; */
}

.default_radio {
    background: #cacaca;
    max-width: 126px;
    color: #5a5252;
    padding: 12px 5px;
    width: auto;
    float: right;
}

table {
    width:100%;
}
table, th, td {
    border:  1px solid #d6d6d6;
    border-collapse: collapse;
}
th, td {
    padding: 5px;
    text-align: left;
}
table#t01 tr:nth-child(even) {
    background-color: #eee;
}
table#t01 tr:nth-child(odd) {
   background-color:#fff;
}
table#t01 th {
    background-color: #232038;
    color: white;
}
.actionDiv{
   padding: 6px;
    text-align: -webkit-right;
    background: #f3f3f3;
    margin-top: 3px;
}

.ButtonGroup  {
    margin-left : 0px
}
.eyeIcon{
    float:right;
    font-size:16px 
}
#state{
    width: 100%;
    background: white;
    height: 32px;
    border-color: #e2e2e2;
    border-radius: 4px;
}
#country{
    width: 100%;
    background: white;
    height: 32px;
    border-color: #e2e2e2;
    border-radius: 4px;
}
.ivu-icon-arrow-right-b {
    padding-right: 10px;
}
.firstPanel {
    background: white;
    padding: 10px;
    border: 1px solid #e0e1e3;
    border-radius: 2px;
}
</style>
