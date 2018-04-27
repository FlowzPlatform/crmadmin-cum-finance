<style scoped>
    .demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
    }
    .expand-row{
        margin-bottom: 16px;
    }
    .order-title {
        background: #f5f5f5;
        margin: 0 0 10px;
        margin-top: 10px;
        padding: 10px 0;
        text-align: center;
        color: #404040;
        font-size: 15px;
        overflow: hidden;
        text-transform: uppercase;
    }
    .ivu-table-expanded-cell {
        background-color: white !important;
    }
    .header {
        text-align: center;
        background-color: #3f4145;
        padding: 2px;
        border-top: 3px solid #C11E19
    }
    .data {
        font-weight: 500;
    }
    .address {
        color: #C11E19;
        font-size: 14px;
        font-family: Comic Sans MS
    }
    h4 {
        font-size: 15px;
        font-weight: 700
    }
    .table {
        border: 1px solid #e3e3e3;
        margin-bottom: 0px;
        table-layout: auto;
    }
    .table thead tr th,
     .table1 thead tr th {
        text-align: -webkit-center;
    }
    .table1 {
        width: -webkit-fill-available;
        table-layout: auto;
    }
    .table1 tbody tr td {
        text-align: center;
    }
    .table1 tbody tr th {
        text-align: center;
    }
    .ivu-table-border td,
    .ivu-table-border th {
        border: 1px solid #e9eaec;
    }
    .item_total {
        text-transform: uppercase;
    }
    a {
        color: #4b5262;
        text-decoration: none;
    }
    a:hover {
        color:#C11E19;
    }
    .quantity-table-title {
        float: left;
        width: 23%;
    }
    .quantity-table-disc {
        float: left;
        max-width: 400px;
        overflow: auto;
        width: 100%;
    }
    .quantity-table .table-heading {
        background: #999 none repeat scroll 0 0;
        border-right: 1px solid #fff;
        border-top: 0 none;
        color: #fff;
        font-family: "roboto_condensedlight";
        font-size: 16px;
        padding: 6px;
        text-align: center;
        text-transform: uppercase;
    }
    .quantity-table .table-content {
        background: #e6e6e6 none repeat scroll 0 0;
        border: 1px solid #fff;
        color: #444;
        font-size: 16px;
        padding: 6px;
        text-align: center;
        font-family: "roboto_condensedregular";
        text-transform: uppercase;
        margin-left: -1px;
    }
    .description .quantity-table-disc > ul {
        display: inline-block;
        width: 500px;
        margin-bottom: -5px;
    }

    .description .quantity-table-disc > ul > li {
        display: inline-block;
        float: left;;
    }
    .product-quantity-list {
        width: 100%;
        table-layout: auto;
    }
    .product-quantity-list .item-list-number {
        padding-bottom: 0;
        padding-left: 0;
        padding-top: 0;
        vertical-align: middle;
    }
    .quantity-item {
        background: #898989;
        color: #fff;
        display: inline-block;
        font-size: 14px;
        height: 41px;
        line-height: 41px;
        margin: 0 10px 0 0;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        width: 36px;
    }
    .product-quantity-list thead tr th {
        background: #fafafa!important;
        border-bottom: 1px dashed #e3e3e3;
        border-top: 1px solid #e3e3e3;
        text-align: left;
    }
    .size-quantity-table {
	    width: 83%;
	    margin-top: 15px;
    	margin-left: 30px;
    	table-layout: auto;
    	margin-bottom: 15px;
    }
    
    
</style>
<style>
    .ivu-collapse-content {
        overflow: hidden !important;
    }
    .ulList {
        list-style-type: none ;
    }
</style>

<template>
    <div>
        <div v-for="(item1, inx) in supplierProduct">
            <Card>
                <p slot="title">{{item1.supplier_info.email}}</p>
                
            </Card>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    const accounting = require('accounting-js');
    export default {
        props: {
            row: Object,
            params: Object
        },
        data() {
            return {
                orderDetail: {},
                supplierProduct: []
                // spinShow : true, 
            }
        },
        methods: {
            getImgUrl (url) {
                return this.imgurl + url
            },
            accounting(item){
              return accounting.formatMoney(item)
            },
            getMulti(a, b) {
                return accounting.formatMoney(a * b);
            },
            getShippingCharge(item){
                var sum = 0;
                sum = sum + item;
                return accounting.formatMoney(sum)
            },
            getSubTotal (a, b, c, d) {
                var sum = 0;
                sum = sum + d;
                var res = c.hasOwnProperty('charges')
                if ( res == false) {
                    return accounting.formatMoney((a*b) + parseFloat(sum))
                }
                else {
                    return accounting.formatMoney((a*b + parseFloat(c.charges.setup_charge) + parseFloat(sum)))
                }
            },
            clicked (inx) {
                console.log("Clickeddddd...............", inx);
                $('#description'+inx).slideToggle(700);
                $(document).ready(function(){
                    $('.owl-carousel').owlCarousel({
                        stopOnHover : true,
                        navigation:true,
                        items : 4,
                        itemsDesktop: [1199, 4],
                        itemsDesktopSmall: [979, 4],
                        itemsTablet: [767, 2],
                        itemsMobile: [479, 2]
                    });
                });
                // $(".description").css("display", "table-row");
            },
            splitProduct(orderDetail) {
                let orderProductLIst=orderDetail.products;
                orderProductLIst.forEach(items => {
                    var supplier_id=items.product_description.supplier_id 
                    let supplier_info = items.product_description.supplier_info
                    if(supplier_id)
                    {
                        // var poNewId=generateCustomId("PO",[data.subscription_id,,supplier_id,data.order_id])
                        // console.log("PO Ids:--",poNewId)
                        //    let supplierIndexOf =tempSupllierIds.indexOf(supplier_id);
                        // var posObj=poArray[supplier_id];
                        // if(posObj)
                        // {
                        //         posObj.PO_id=poNewId
                        //         posObj.EmailStatus="Initiated"
                        //         posObj.products.push(items)
                        // }else{
                            var product= {
                                // PO_id:poNewId,
                                // created_at:date,
                                supplier_info : items.product_description.supplier_info,
                                subscription_id: orderDetail.subscription_id,
                                website_id: orderDetail.website_id,
                                websiteName: orderDetail.websiteName,
                                order_id: orderDetail.order_id,
                                setting_id: orderDetail.setting_id,
                                quantity: orderDetail.quantity,
                                total: orderDetail.total,
                                owner_id: orderDetail.owner_id,
                                products:[items],
                                special_information: orderDetail.special_information,
                                user_info: orderDetail.user_info,
                                user_billing_info: orderDetail.user_billing_info,
                                EmailStatus:"Initiated"
                            }
                            // this.supplierProduct[supplier_id]=product
                            this.supplierProduct.push(product)
                            console.log("===============>>>>>>>>>>>>>>>>>>>>>>>>",this.supplierProduct)
                        // }
                    }
                
                });
            }
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
        mounted() {
            console.log("********************///////////////////////",this.$route.params);
            this.orderDetail = this.$route.params;
            this.splitProduct(this.orderDetail);
        }
    }
</script>