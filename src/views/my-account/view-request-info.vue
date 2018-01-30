<template>
  <div>
    <Card>
      <div style="text-align:center">
        <div class="row">
          <div class="col-sm-12 header">
            <p slot="header" style="color:white;text-align:center;margin-top: 10px;">
              <icon type="eye"></icon>
              <span>VIEW REQUEST INFO DETAILS</span>
            </p>
          </div>
        </div>
      </div>
      <div style="text-align:center">
        <div class="row">
          <div class="col-sm-12">
            <div class="order-title">
              <div class="col-lg-3 col-lg-offset-2 col-md-4 col-sm-4">
                ID : {{row.id}}
              </div>
              <div class="col-lg-3 col-md-4 col-sm-4">
                Created Date : {{row.created_at}}
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4">
                Total Items : {{row.total_qty}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Collapse accordion>
        <Panel name="1">
          PRODUCT
          <p slot="content">
            <label>                            
          <div class="panel-body" v-for="item in row.productInfo">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12 padding-right-0">
                <div class="detail-image">
                  <img alt="" :src="getImgUrl(item.default_image)" id="order_product_image_0" class="img-responsive">
                  </div>
                </div>
                <div class="col-lg-10 col-md-9 col-sm-12 col-xs-12" style="text-align: -webkit-center;">
                  <h1 class="heading-2">{{item.product_name}}</h1>
                  <div class="skuprice">
                    <div style="text-align: -webkit-center;background: #f5f5f5;
            padding: 7px 0;">Item Number : 
                      <span>{{item.sku}}</span>
                    </div>
                  </div>
                </div>
            </div>
            <div v-for="i in item.pricing">
              <div v-if="i.price_type == 'regular' && i.type == 'decorative' && i.global_price_type == 'global'">
                <h3 class="quantity-price">Quantity Price</h3>
                <div class="quantity-table">
                  <div class="quantity-table-title" style="float: left;width: 23%;">
                    <div class="table-heading js-product-price-unit" data-product-price-unit="each">Quantity </div>
                    <div class="table-content">Price</div>
                  </div>
                  <div class="quantity-table-disc">
                    <div class="quantity-table-col owl-carousel owl-theme" style="opacity: 1; display: block;">
                      <div class="owl-wrapper-outer" v-for="element in i.price_range">
                        <ul class="owl-wrapper" style="width: 808px; left: 0px; display: block; transition: all 0ms ease; transform: translate3d(0px, 0px, 0px);">
                          <li class="owl-item" style="width: 101px;">
                            <div>
                              <div class="table-heading" v-if="element.qty.lte">{{element.qty.gte}} - {{element.qty.lte}}</div>
                              <div class="table-heading" v-else>{{element.qty.gte}} + </div>
                              <div class="table-content">$ {{element.price}}</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="owl-controls clickable" style="display: none;">
                        <div class="owl-pagination">
                          <div class="owl-page active">
                            <span class=""></span>
                          </div>
                        </div>
                        <div class="owl-buttons">
                          <div class="owl-prev"></div>
                          <div class="owl-next"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
            <h3 class="product-summary">Colours</h3>
              <div class="estimate-detail product-section-box">
                <div class="estimate-tag-block border-bottom">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="inquiry-color-block">
                        <ul v-for="i in item.attributes.colors">
                          <li class="color2" data-original-title="i"></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="estimate-tag-block">
                    <h3 class="">Product Description</h3>
                      <div class="row">
                        <div class="estimate-row" v-html="item.description"></div>
                      </div>
                    </div>
                </div>
              <h3>Special Instructions</h3>
              <div class="estimate-tag-block">
                <div>
                 {{row.instruction}}
                </div>
              </div>
              </div>
            </div>
            </label>
          </p>
        </Panel>
        <Panel name="2">
          MY INFORMATION
           <!--  <p slot="content">
              <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
                <h4>Dweep Patel</h4>
                <p>
                  <span class="address">Office Address</span>
                  <br>
                    <span style="font-weight:500">
                      C-112 Girdharpark Soc. 
                    <br>
                      Near New Era School 
                    <br>
                      Opp. Novino Bettery 
                    <br>
                      Makarpura, Vadodara 
                    </span>
                </p>
              </label>
              <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
                <ul>
                  <li>
                    <Icon type="ios-telephone" size="15"></Icon>
                    <label style="font-weight:500">9978532084</label>
                  </li>
                  <li>
                    <Icon type="ios-email" size="15"></Icon>
                    <label style="font-weight:500">dweepp@officebrain.com</label>
                  </li>
                </ul>
              </label>
            </p> -->
          </Panel>
      </Collapse>
    </Card>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
// import eye from '../../images/Eye.png'
export default {
  props: {
    row: Object
  },
  name: 'list-billing',
  data () {
  return {
    imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
    Desc: ''
    }
  },
  methods: {
    getImgUrl (url) {
      return this.imgurl + url
    }
  },
  mounted(){
    var self = this
    console.log('row--------->',this.row)
    // this.row.productInfo.forEach(item => {
    //   self.Desc = item.description.text();
    // })

  }
}
</script>

<style scoped>
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

  .quantity-price, 
  .product-summary {
    background: #f3f2f2;
    border-left: 5px solid #c51327;
    color: #7e7e7e;
    display: block;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 17px;
    margin: 8px 0;
    padding: 5px 0 5px 10px;
    width: 100%;
  }
  .quantity-table {
    margin-top: 15px;
  }
  .quantity-table-title {
        float: left;
    width: 23%;
  }
  .quantity-table-title .table-heading {
    font-size: 16px;
    color: #fff;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 700;
    text-align: center;
    padding: 4px 10px;
}
.quantity-table .table-heading {
    background: #999 none repeat scroll 0 0;
    border-right: 1px solid #fff;
    border-top: 0 none;
    color: #fff;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 300;
    font-size: 16px;
    padding: 6px;
    text-align: center;
    text-transform: uppercase;
}
.quantity-table-title .table-content, .quantity-table .table-content {
    font-size: 16px;
    color: #404040;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 700;
    text-align: center;
    padding: 4px 10px;
}
.quantity-table .table-content {
    background: #e6e6e6 none repeat scroll 0 0;
    border: 1px solid #fff;
    color: #444;
    font-size: 16px;
    padding: 6px;
    text-align: center;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 400;
    margin-left: -1px;
}
.quote-product-summary .estimate-detail {
    background: 0;
    padding: 0;
}
.product-section-box {
    margin-bottom: 20px;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 400;
}
.estimate-tag-block {
    margin-bottom: 5px;
    background: #fff;
    padding: 0px;
    font-size: 14px;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 300;
}
.border-bottom {
    border-bottom: 1px #ebebeb solid;
}
.estimate-row {
    margin-bottom: 8px;
    padding-bottom: 2px;
    font-size: 13px;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    color: #7f7f7f;
}

.estimate-tag-block .heading span {
    font-size: 15px;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    color: #404040;
}
.row {
    margin-right: -15px;
    margin-left: -15px;
}
.product-color-price-table {
    margin-bottom: 20px;
    width: 100%;
    border-color: white;
}
.product-color-price-table td {
    padding-right: 20px;
    display: inline-block;
    min-width: 60px;
    text-align: left;
}
.product-color-price-table td:last-child {
    float: right;
    min-width: 130px;
}
.product-color-price-table td {
    padding-right: 20px;
    display: inline-block;
    text-align: left;
}
i.white-color-box {
    border: solid 1px #ccc;
    height: 30px;
    margin-bottom: 2px;
    background: #fff;
    display: block;
    width: 30px;
}
h3 {
    background: #f3f2f2;
    border-left: 5px solid #c51327;
    color: #7e7e7e;
    display: block;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 17px;
    margin: 8px 0;
    padding: 5px 0 5px 10px;
    width: 100%;
    line-height: 1.1;
}
.product-color-price-table>tr>td{
  border: none;
}
.inquiry-color-block ul li {
    border: 2px solid #ccc;
    width: 25px;
    height: 25px;
    float: left;
    margin-right: 2px;
    margin-bottom: 2px;
}
</style>