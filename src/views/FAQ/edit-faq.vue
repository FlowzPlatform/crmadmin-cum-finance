<template>
    <div>
        <Row>
            <Col span="12" offset="6">
                <Card style="padding:10px;">
                    <p slot="title">Edit FAQ</p>
                    <Form :model="formItem" label-position="left" :label-width="140" ref="formItem">
                        <FormItem label="Website">
                            <Input v-model="formItem.website" readonly/>
                        </FormItem>
                        <FormItem label="Question">
                            <Input v-model="formItem.que" placeholder="Enter your question..."/>
                        </FormItem>
                        <FormItem label="Answer">
                            <textarea v-model="formItem.ans" placeholder="Write answer" name="editor1"></textarea>
                        </FormItem>
                        <FormItem>
                            <div style="text-align:center;">
                                <Button type="primary" @click="FAQSubmit('formItem')" :loading="loading">Submit</Button>
                                <Button type="ghost" style="margin-left: 8px" @click="Cancel('formItem')">Reset</Button>
                            </div>
                        </FormItem>
                    </Form>
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
                formItem: {
                    website: '',
                    que: '',
                    ans: ''
                }
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
                    this.formItem.website = response.data.websiteName
                })
                .catch(function(error) {
                    console.log(error);
                })
                CKEDITOR.instances.editor1.setData(this.row.ans)
                this.formItem.que = this.row.que
            },
            FAQSubmit() {
                let faqData = {
                    websiteId : this.websiteId,
                    patchFaq: this.row
                }
                console.log('faqdata',faqData);
                faqData.patchFaq.que = this.formItem.que;
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
                })
                .catch(function(error) {
                    console.log(error);
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

