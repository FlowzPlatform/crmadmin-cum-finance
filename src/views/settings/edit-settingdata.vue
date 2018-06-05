<template>
    <div>
        <Card v-if="dataEditIn == 'Profile'">
            <Form :model="editGeneralData" :label-width="110" ref="editGeneralData" :rules="ruleValidate">
                <div v-if="editGeneralData">
                    <FormItem label="AddressLine1" prop="AddressLine1">
                        <Input v-model="editGeneralData.AddressLine1" placeholder="AddressLine1"></Input>
                    </FormItem>
                    <FormItem label="AddressLine2" prop="AddressLine2">
                        <Input v-model="editGeneralData.AddressLine2" placeholder="AddressLine2"></Input>
                    </FormItem>
                    <FormItem label="Country" prop="country">
                        <!--<select v-model="country" id="country" name ="country" placeholder="Select Country">
                    </select> -->
                        <Input v-model="editGeneralData.country" placeholder="Country"></Input>
                    </FormItem>
                    <FormItem label="State" prop="state">
                        <!-- <select v-model="state" id="state" name ="state" placeholder="Select State">
                    </select> -->
                        <Input v-model="editGeneralData.state" placeholder="State"></Input>
                    </FormItem>
                    <FormItem label="City" prop="city">
                        <Input v-model="editGeneralData.city" placeholder="City"></Input>
                    </FormItem>
                    <FormItem label="Postal Code" prop="PostalCode">
                        <Input v-model="editGeneralData.PostalCode" placeholder="PostalCode"></Input>
                    </FormItem>
                    <FormItem label="Logo">
                        <img style="height:50px" :src="editData.logo" alt="No Image Available" />
                        <Upload id="fileUpload" v-model="editData.logo" :before-upload="handleUpload" action=''>
                            <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                        </Upload>
                        <div v-if="file !== null">Uploaded file: {{ file.name }} </div>
                    </FormItem>
                </div>
                <div v-else>
                    <FormItem label="Logo">
                        <img style="height:50px" :src="editData.logo" alt="No Image Available" />
                        <Upload id="fileUpload" v-model="editData.logo" :before-upload="handleUpload" action=''>
                            <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                        </Upload>
                        <div v-if="file !== null">Uploaded file: {{ file.name }} </div>
                    </FormItem>
                </div>
                <div style="text-align:center;">
                    <Button type="primary" @click="okGeneral('editFormItem')" :loading="loading1">Submit</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="Cancel('editFormItem')">Back</Button>
                </div>
            </Form>
        </Card>
        <Card v-else-if="dataEditIn == 'Configuration'">
            <Form :model="editData" :label-width="90" v-if='editData.domain == "Xero"' ref="editData" :rules="ruleValidate">
                <FormItem label="Config Name" prop="configName">
                    <Input v-model="editData.configName" placeholder="Enter something for Xero..."></Input>
                </FormItem>
                <FormItem label="User Agent" prop="useragent">
                    <Input v-model="editData.useragent" placeholder="User Agent"></Input>
                </FormItem>
                <FormItem label="Consumer Key" prop="consumerKey">
                    <Input v-model="editData.consumerKey" placeholder="Consumer Key"></Input>
                </FormItem>
                <FormItem label="Consumer Secret" prop="consumerSecret">
                    <Input v-model="editData.consumerSecret" placeholder="Consumer Secret"></Input>
                </FormItem>
                <FormItem label="Private Key">
                    <Upload v-model="editData.privateKey" :before-upload="handleUpload1" action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                    </Upload>
                    <div v-if="file !== ''">Uploaded file: {{ file.name }} </div>
                    <div v-else>Uploaded file: {{ editData.pem }} </div>
                </FormItem>
                <div style="text-align:center;">
                    <Button type="primary" @click="okconfig('editData')" :loading="loading2">Submit</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="Cancel('editData')">Back</Button>
                </div>
            </Form>
            <Form :model="editData" :label-width="90" v-if='editData.domain == "QB"'>
                <FormItem label="Config Name" prop="configName">
                    <Input v-model="editData.configName" placeholder="Configuaration Name"></Input>
                </FormItem>
                <FormItem label="Client ID" prop="client_id">
                    <Input v-model="editData.client_id" placeholder="Client ID"></Input>
                </FormItem>
                <FormItem label="Client Secret" prop="client_secret">
                    <Input v-model="editData.client_secret" placeholder="Client Secret"></Input>
                </FormItem>
                <FormItem label="Realm ID" prop="realmId">
                    <Input v-model="editData.realmId" placeholder="Realm ID"></Input>
                </FormItem>
                <FormItem label="Refresh Token" prop="refresh_token">
                    <Input v-model="editData.refresh_token" placeholder="Refresh Token"></Input>
                </FormItem>
            </Form>
        </Card>
        <div v-else>
            <Card>
                <Form :model="editFormItem" :label-width="120" ref="editFormItem" :rules="ruleValidate">
                    <div v-for="(i,j) in this.data">
                        <div v-if="i == 'Secret_Key'">
                            <FormItem label="Secret_Key" prop="Secret_Key">
                                <Input v-model="editFormItem.Secret_Key" placeholder="Secret_Key"></Input>
                            </FormItem>
                        </div>
                        <div v-else-if="i == 'Signature_Key'">
                            <FormItem label="Signature_Key" prop="Signature_Key">
                                <Input v-model="editFormItem.Signature_Key" placeholder="Signature_Key"></Input>
                            </FormItem>
                        </div>
                        <div v-else-if="i == 'Transaction_Key'">
                            <FormItem label="Transaction_Key" prop="Transaction_Key">
                                <Input v-model="editFormItem.Transaction_Key" placeholder="Transaction_Key"></Input>
                            </FormItem>
                        </div>
                        <div v-else-if="i == 'client_id'">
                            <FormItem label="client_id" prop="Client Id">
                                <Input v-model="editFormItem.client_id" placeholder="client_id"></Input>
                            </FormItem>
                        </div>
                        <div v-else-if="i == 'secret'">
                            <FormItem label="secret" prop="Secret">
                                <Input v-model="editFormItem.secret" placeholder="secret"></Input>
                            </FormItem>
                        </div>
                        <div v-else-if="i == 'isDefault'">
                            <FormItem label="isDefault">
                                <Checkbox v-model="editFormItem.isDefault" @on-change="paymentIsDefaultChange"></Checkbox>
                            </FormItem>
                        </div>
                        <div v-else-if="i == 'isDeleted'">
                            <FormItem label="isDeleted">
                                <Checkbox v-model="editFormItem.isDeleted" @on-change="paymentIsDefaultChange"></Checkbox>
                            </FormItem>
                        </div>
                    </div>
                    <div style="text-align:center;">
                        <Button type="primary" @click="formData('editFormItem')" :loading="loading3">Submit</Button>
                        <Button type="ghost" style="margin-left: 8px" @click="Cancel('editFormItem')">Back</Button>
                    </div>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
    let config = require("@/config/customConfig.js")
    let feathersUrl = config.default.serviceUrl;
    import axios from "axios"
    import Cookies from 'js-cookie';
    export default {
        props: {
            settingEditData: Object,
            dataEditIn: String,
            indexOfData: Number,
            tabName: String,
            rowIndex: Number
        },
        data() {
            return {
                editData: {},
                data: [],
                editGeneralData: {},
                editFormItemXero: '',
                editFormItemQB: '',
                loading2: false,
                loading3: false,
                loading1: false,
                editFormItem: {
                    'Signature_Key': '',
                    'Transaction_Key': '',
                    'isDefault': true,
                    'isDeleted': false,
                    'Secret_Key': '',
                    'client_id': '',
                    'secret': ''
                },
                ruleValidate: {
                    AddressLine1: [
                        { required: true, message: 'The AddressLine1 cannot be empty', trigger: 'blur' }
                    ],
                    AddressLine2: [
                        { required: true, message: 'The AddressLine2 cannot be empty', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'The City cannot be empty', trigger: 'blur' }
                    ],
                    state: [
                        { required: true, message: 'The State can not be empty', trigger: 'blur' }
                    ],
                    country: [
                        { required: true, message: 'The Country can not be empty', trigger: 'blur' }
                    ],
                    PostalCode: [
                        { required: true, message: 'The PostalCode cannot be empty', trigger: 'blur' },
                        // { validator: validateNum, trigger: 'blur' }
                    ],
                    Secret_Key: [
                        { required: true, message: 'The Secret_Key can not be empty', trigger: 'blur' }
                    ],
                    Signature_Key: [
                        { required: true, message: 'The Signature_Key can not be empty', trigger: 'blur' }
                    ],
                    Transaction_Key: [
                        { required: true, message: 'The Transaction_Key can not be empty', trigger: 'blur' }
                    ],
                    client_id: [
                        { required: true, message: 'The client_id can not be empty', trigger: 'blur' }
                    ],
                    Secret: [
                        { required: true, message: 'The secret can not be empty', trigger: 'blur' }
                    ],
                    configName: [
                        { required: true, message: 'The configName can not be empty', trigger: 'blur' }
                    ],
                    useragent: [
                        { required: true, message: 'The useragent can not be empty', trigger: 'blur' }
                    ],
                    consumerKey: [
                        { required: true, message: 'The consumerKey can not be empty', trigger: 'blur' }
                    ],
                    consumerSecret: [
                        { required: true, message: 'The consumerSecret can not be empty', trigger: 'blur' }
                    ]
                },
                file: '',
                // editFormType:'Xero'
            }
        },
        methods: {
            async handleUpload(file) {
                var self = this
                console.log('file', file)
                if (file.size >= 1e+8) {
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
            async handleUpload1(file) {
                var self = this
                console.log('file', file)
                if (file.size >= 1e+8) {
                    this.$Notice.error({
                        title: 'File Limit',
                        desc: 'File size should be less than or equal to 100mb. ',
                        duration: 4.5
                    });
                    self.file = ''
                    return true
                }
                else {
                    self.file = file
                    console.log(this.file)
                    let file_ext = this.file.name.split('.').pop()
                    console.log("self.file.type file_ext", file_ext)
                    if (self.file == null || file_ext !== "pem") {
                        self.$Message.error({
                            content: ' Please, attach a .pem file!',
                            duration: 4.5
                        });
                    }
                    return false;
                }
            },
            paymentIsDefaultChange(value) {
                console.log("getchangecall", value)
                this.editFormItem['isDefault'] = value
            },
            paymentIsDeletedChange(value) {
                console.log("getchangecall", value)
                this.editFormItem['isDeleted'] = value
            },
            async formData(name) {
                console.log(name)
                var self = this
                self.loading3 = true
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log("edited data", self.editFormItem);
                        let patchData = {
                            id: self.settingEditData.id,
                            rowIndex: this.rowIndex,
                            online_payment: {
                                [self.tabName]: self.editFormItem
                            }
                        }
                        console.log("patchData--------->", patchData)
                        axios({
                            method: 'patch',
                            url: feathersUrl + 'settings/' + self.settingEditData.id,
                            data: patchData,
                            headers: {
                                Authorization: Cookies.get('auth_token'),
                                subscriptionId: Cookies.get('subscriptionId')
                            },
                        }).then(response => {
                            console.log("++++++++++++------------response", response);
                            self.loading3 = false
                            if (response.status == 200) {
                                this.$Message.success("Configuaration updated successfully")
                                this.$router.push({
                                    name: 'Settings'
                                })
                            } Object.keys(this.editFormItem)

                        })
                            .catch(error => {
                                self.loading3 = false
                                console.log(error)
                                if (error.response.status == 401) {
                                    let location = psl.parse(window.location.hostname)
                                    location = location.domain === null ? location.input : location.domain

                                    Cookies.remove('auth_token', { domain: location })
                                    self.$store.commit('logout', self);

                                    self.$router.push({
                                        name: 'login'
                                    });
                                    self.$Notice.error({
                                        title: error.response.data.name,
                                        desc: error.response.data.message,
                                        duration: 10
                                    })
                                } else if (error.response.status == 403) {
                                    self.$Notice.error({
                                        duration: 0,
                                        title: error.response.statusText,
                                        desc: error.response.data.message + '. Please <a href="' + config.default.flowzDashboardUrl + '/subscription-list" target="_blank">Subscribe</a>'
                                    });
                                } else {
                                    self.$Notice.error({
                                        title: error.response.data.name,
                                        desc: error.response.data.message,
                                        duration: 10
                                    })
                                }
                            });
                    } else {
                        self.loading3 = false
                        this.$Message.error('Please Enter valid Inputs');
                    }
                })
            },
            Cancel() {
                this.$router.push({
                    name: 'Settings'
                })
            },
            async okGeneral(event) {
                let self = this
                self.loading1 = true
                let EditModifiedData
                if (self.file != '' && (self.file.type === "image/png" || self.file.type === "image/jpeg")) {
                    self.$refs['editGeneralData'].validate((valid) => {
                        if (valid) {
                            console.log('this.file', this.file)
                            var reader = new FileReader();
                            var file = this.file
                            reader.addEventListener("load", function () {
                                EditModifiedData = reader.result
                                console.log('reader------->', self.editData.logo)
                                let patchData = {
                                    id: self.editData.id,
                                    address: self.editData.address,
                                    logo: EditModifiedData
                                };
                                axios({
                                    method: 'patch',
                                    url: feathersUrl + 'settings/' + self.editData.id,
                                    data: patchData,
                                    headers: {
                                        Authorization: Cookies.get('auth_token'),
                                        subscriptionId: Cookies.get('subscriptionId')
                                    },
                                }).then(response => {
                                    console.log("response--------------->", response.data)
                                    self.loading1 = false;
                                    if (response.status == 200) {
                                        self.$Message.success("Configuaration updated successfully")
                                    }
                                    self.disabled = false;
                                    self.$router.push({
                                        name: 'Settings'
                                    });
                                }).catch(error => {
                                    console.log(error)
                                    self.loading1 = false;
                                    if (error.response.status == 401) {
                                        let location = psl.parse(window.location.hostname)
                                        location = location.domain === null ? location.input : location.domain
                                        Cookies.remove('auth_token', { domain: location })
                                        self.$store.commit('logout', self);
                                        self.$router.push({
                                            name: 'login'
                                        });
                                        self.$Notice.error({
                                            title: error.response.data.name,
                                            desc: error.response.data.message,
                                            duration: 10
                                        })
                                    } else if (error.response.status == 403) {
                                        self.$Notice.error({
                                            duration: 0,
                                            title: error.response.statusText,
                                            desc: error.response.data.message + '. Please <a href="' + config.default.flowzDashboardUrl + '/subscription-list" target="_blank">Subscribe</a>'
                                        });
                                    } else {
                                        self.$Notice.error({
                                            title: error.response.data.name,
                                            desc: error.response.data.message,
                                            duration: 10
                                        })
                                    }
                                });
                            }, false);

                            if (file) {
                                reader.readAsDataURL(file);
                            }
                        } else {
                            self.loading1 = false
                            self.$Message.error("Please Enter Valid Inputs")
                        }
                    })

                }
                else if (self.file == '') {
                    self.$refs['editGeneralData'].validate((valid) => {
                        if (valid) {
                            let patchData = {
                                id: self.editData.id,
                                address: self.editData.address
                            };
                            axios({
                                method: 'patch',
                                url: feathersUrl + 'settings/' + self.editData.id,
                                data: patchData,
                                headers: {
                                    Authorization: Cookies.get('auth_token'),
                                    subscriptionId: Cookies.get('subscriptionId')
                                },
                            }).then(response => {
                                console.log("response--------------->", response.data)
                                if (response.status == 200) {
                                    self.loading1 = false
                                    self.$Message.success("Configuaration updated successfully")
                                    self.$router.push({
                                        name: 'Settings'
                                    })
                                }
                            }).catch(error => {
                                console.log(error)
                                self.loading1 = false
                                if (error.response.status == 401) {
                                    let location = psl.parse(window.location.hostname)
                                    location = location.domain === null ? location.input : location.domain

                                    Cookies.remove('auth_token', { domain: location })
                                    self.$store.commit('logout', self);

                                    self.$router.push({
                                        name: 'login'
                                    });
                                    self.$Notice.error({
                                        title: error.response.data.name,
                                        desc: error.response.data.message,
                                        duration: 10
                                    })
                                } else if (error.response.status == 403) {
                                    self.$Notice.error({
                                        duration: 0,
                                        title: error.response.statusText,
                                        desc: error.response.data.message + '. Please <a href="' + config.default.flowzDashboardUrl + '/subscription-list" target="_blank">Subscribe</a>'
                                    });
                                } else {
                                    self.$Notice.error({
                                        title: error.response.data.name,
                                        desc: error.response.data.message,
                                        duration: 10
                                    })
                                }
                            });
                        }
                        else {
                            self.loading1 = false
                            self.$Message.error("Please Enter Valid Inputs")
                        }
                    })


                } else {
                    self.$Message.error(' Please, attach a .jpg or .png file!');
                }

            },
            async editedData() {
                let self = this;
                let reader = new FileReader();
                return new Promise((resolve, reject) => {
                    if (this.file && this.editData.domain == "Xero") {
                        console.log("Is file uploaded = yes")
                        reader.readAsDataURL(this.file);
                        reader.addEventListener("load", function () {
                            let lastModified = self.file.lastModified + "-" + self.file.name;
                            self.editData.certificate = reader.result.substring(reader.result.indexOf(",") + 1),
                                self.editData.pem = lastModified;
                            resolve(self.editData)
                        })
                    } else {
                        resolve(self.editData)
                    }
                })
            },
            async okconfig() {
                let self = this
                self.loading2 = true
                self.$refs['editData'].validate(async (valid) => {
                    if (valid) {
                        let EditModifiedData = await this.editedData()
                        console.log(EditModifiedData)
                        let patchData = _.cloneDeep(EditModifiedData)
                        delete patchData.online_payment;
                        console.log("settingEditData--------------", patchData);
                        axios({
                            method: 'patch',
                            url: feathersUrl + 'settings/' + this.editData.id,
                            data: patchData,
                            headers: {
                                Authorization: Cookies.get('auth_token'),
                                subscriptionId: Cookies.get('subscriptionId')
                            },
                        })
                            .then(response => {
                                self.loading2 = false
                                if (response.status == 200) {
                                    this.$Message.success("Configuaration updated successfully")
                                    this.$router.push({
                                        name: 'Settings'
                                    })
                                }
                                // this.disabled = false;
                            })
                            .catch(error => {
                                console.log(error)
                                this.disabled = false;
                                self.loading2 = false
                                if (error.response.status == 401) {
                                    let location = psl.parse(window.location.hostname)
                                    location = location.domain === null ? location.input : location.domain

                                    Cookies.remove('auth_token', { domain: location })
                                    self.$store.commit('logout', self);

                                    self.$router.push({
                                        name: 'login'
                                    });
                                    self.$Notice.error({
                                        title: error.response.data.name,
                                        desc: error.response.data.message,
                                        duration: 10
                                    })
                                } else if (error.response.status == 403) {
                                    self.$Notice.error({
                                        duration: 0,
                                        title: error.response.statusText,
                                        desc: error.response.data.message + '. Please <a href="' + config.default.flowzDashboardUrl + '/subscription-list" target="_blank">Subscribe</a>'
                                    });
                                } else {
                                    self.$Notice.error({
                                        title: error.response.data.name,
                                        desc: error.response.data.message,
                                        duration: 10
                                    })
                                }
                            });
                    } else {
                        self.loading2 = false
                        self.$Message.error("Please Enter Valid Inputs")
                    }
                })

            }


        },
        mounted() {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@", this.settingEditData)
            if (this.dataEditIn == 'Online Payment') {
                this.editFormItem = this.settingEditData.online_payment[this.tabName][this.rowIndex]
                this.data = Object.keys(this.editFormItem)
                console.log("this.editFormItem-------->", this.data)
            }
            if (this.dataEditIn == 'Configuration') {
                this.editData = this.settingEditData
            }
            if (this.dataEditIn == 'Profile') {
                this.editGeneralData = this.settingEditData.address
                this.editData = this.settingEditData
            }

        }
    }
</script>