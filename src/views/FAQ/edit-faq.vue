<template>
    <div>
        <Row>
            <Col span="16" offset="4">
                <Card style="padding:10px;">
                    <p slot="title">Edit FAQ</p>
                    <div>
                        <div class="row" style="padding:10px;">
                            <div class="col-sm-2">
                                <span style="color:red">*</span>
                                <label>Website</label>
                            </div>
                            <div class="col-sm-10">
                                <label style="font-weight:normal;">{{website}}</label>
                            </div>
                        </div>
                        <div class="row" style="padding:10px;">
                            <div class="col-sm-2">
                                <span style="color:red">*</span>
                                <label>Question</label> 
                            </div>
                            <div class="col-sm-10">
                                <Input v-model="que" placeholder="Enter your question..."/>
                            </div>
                        </div>
                        <div class="row" style="padding:10px;">
                            <div class="col-sm-2">
                                <span style="color:red">*</span>
                                <label>Answer</label>
                            </div>
                            <div class="col-sm-10">
                                <textarea v-model="ans" placeholder="Write answer" id="editor1" name="editor1"></textarea>
                            </div>
                        </div>
                        <div style="text-align:center;">
                            <Button type="primary" @click="FAQSubmit()" :loading="loading">Submit</Button>
                            <Button type="ghost" style="margin-left: 8px" @click="back()">Back</Button>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import config from '@/config/customConfig.js';
    import axios from 'axios';
    export default {
        props: {
            row: Object,
            listId: String,
            websiteId: String
        },
        data() {
            return {
                loading: false,
                website: '',
                que: '',
                ans: ''
            }
        },
        methods: {
            async setFaqData() {
                await axios({
                    method: 'get',
                    url: config.default.projectConfigurationUrl + '/' + this.websiteId
                })
                .then((response) => {
                    console.log(response)
                    this.website = response.data.websiteName
                })
                .catch(function(error) {
                    console.log(error);
                })
                CKEDITOR.instances.editor1.setData(this.row.ans)
                this.que = this.row.que
            },
            FAQSubmit() {
                let que = this.que.trim();
                let ans = CKEDITOR.instances.editor1.document.getBody().getChild(0).getText().trim();
                // let ans = CKEDITOR.instances.editor1.getData();
                console.log('ans',ans)
                if((que != '') && (ans != '')) {
                    delete this.row._index;
                    delete this.row._rowKey;
                    let faqData = {
                        websiteId : this.websiteId,
                        patchFaq: this.row
                    }
                    console.log('faqdata',faqData);
                    faqData.patchFaq.que = this.que;
                    faqData.patchFaq.ans = CKEDITOR.instances.editor1.getData();
                    // faqData['updatedAt'] = new Date().toISOString();
                    console.log('after edit',faqData);
                    axios({
                        method: 'patch',
                        url: config.default.serviceUrl + 'faq/' + this.listId,
                        data: faqData,
                    })
                    .then(function(response) {
                        console.log(response);
                        this.$router.push({
                            name: 'List FAQ'
                        });
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                }
                else {
                    this.$Message.error('Please fill up all the fields correctly');
                }
            },
            back() {
                this.$router.push({
                    name: 'List FAQ'
                })
            }
        },
        async mounted() {
            console.log(this.listId);
            CKEDITOR.replace("editor1");
            this.setFaqData();
        }
    }
</script>

