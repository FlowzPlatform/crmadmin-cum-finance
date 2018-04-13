<template>
    <div>
        <div v-if="spinShow" class="demo-spin-container">
            <Spin fix></Spin>
        </div>
        <div v-else>
            <div class="panel-heading">
                <h4 class="panel-title" style="text-align:-webkit-right;">
                    <button class="btn btn-default btn-sm" type="button" style="background-color: red;color: white; font-weight: bold;">
                        <span class="glyphicon glyphicon-file"></span> Generate Purchase Order 
                    </button>
                </h4>
            </div>

            <Table stripe :columns="columns1"></Table>
        </div>
    </div>
</template>


<script>
    import config from '../../config/customConfig.js'
    let axios = require('axios'); 
    import Cookies from 'js-cookie';
    export default {
        data() {
            return {
                // spinShow : true,
                columns1 : [
                    {
                        title: 'PO Id',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', 'Id')
                            ]);
                        }
                    },
                    {
                        title: 'Generated Date',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', 'Date')
                            ]);
                        }
                    },
                    {
                        title: 'Distriutor',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', 'Distributor')
                            ]);
                        }
                    },
                    {
                        title: 'Supplier',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', 'Supplier')
                            ]);
                        }
                    },
                    {
                        title: 'Status',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', 'Status')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {

        },
        mounted() {

        }
    }    
</script>

<style>
    .demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
    }
</style>