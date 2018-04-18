<template>
  <div>
  <!-- <div class="mj-container"> -->
    <div style="margin:0 auto;background:#f0f0f0">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%;background:#f0f0f0" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;border:1px solid #ddd;direction:ltr;font-size:0;padding:0px 0">
              <p style="font-size:1px;margin:0 auto;border-top:2px solid #c11e18;width:100%"></p>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:10px 20px 0">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px" align="left">
                                  <div style="cursor:auto;color:#f45e43;font-family:helvetica;font-size:20px;line-height:22px;text-align:left">Quote Request</div>
                                </td>
                              </tr>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;" align="left">
                                  <div style="cursor:auto;color:#000;font-family:helvetica;font-size:15px;line-height:22px;text-align:left">Thank you for quote request. ! Below is a summary for your quote.</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:20px 0;padding-bottom:0;padding-left:10px;padding-right:10px;padding-top:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd;border-top:2px solid red" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px 15px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Billing Address</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;background:#fff;display:inline-block;font-size:0;line-height:0;text-align:left;width:100%;border-left: solid 1px #e5e5e5;border-right: solid 1px #e5e5e5;">
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:50%">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;padding-top:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.name}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.street1}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.city}} - {{row.billing_info.postalcode}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;padding-bottom:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.state}}, {{row.billing_info.country}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:50%">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-top:10px;padding-left: 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.phone}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.email}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd;border-top:2px solid red" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px 15px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Product Summary</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-80 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border-right:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="border-left: solid 1px #e8e8e8;">
                                  <img alt="" :src="getImgUrl(row.product_image_url , row.product_description.default_image)" style="height: 70px;width: 105px;margin-left: 15%;">
                                </td>
                                <td style="word-wrap:break-word;font-size:0;" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.product_description.product_name}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;padding: 10px 0px 10px 20px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;text-align:left;font-weight:700">Product Description</div>
                                </td>
                              </tr>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:0;padding-left:35px;padding-bottom:10px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:justify">{{row.product_description.activeSummary}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-bottom:0;padding-left:20px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;text-align:left;font-weight:700">Special Instructions</div>
                                </td>
                              </tr>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:0;padding-left:35px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:justify">{{row.special_instruction}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <!-- <div class="mj-column-per-10 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#868686;border-bottom:1px solid #ddd;border-left:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 10px 10px 20px" align="left">
                                  <div style="cursor:auto;color:#fff;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div> -->
                        <div class="mj-column-per-90 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background: rgb(255, 255, 255);border-width: 2px 1px 1px;border-style: solid;border-color: red rgb(221, 221, 221) rgb(221, 221, 221);border-image: initial;" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px 15px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Product Quantity</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-15 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                        </div>
                        <div class="mj-column-per-65 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <div class="row"  v-for="(item,index) in row.shipping_method.shipping_detail">
                          <div class="col-sm-12">
                          <!-- <div class="estimate-row heading" style="backgroundColor:white;">
                            <span>Quantity {{index+1}}</span>
                          </div> -->
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border-bottom:1px solid #ddd;border-right:1px solid #ddd;border-left: solid 1px #e5e5e5;" width="100%" border="0">
                          <tbody>
                            <tr v-for="(element,inx) in item.color_quantity">
                              <td style="word-wrap:break-word;font-size:0;padding-top:5px;padding-bottom:5px" align="center">
                                <div :style="{ backgroundColor: inx }" style="height:25px;width:25px;border: solid 1px #e8e8e8;">
                                  </div>
                              </td>
                              <td align="center">{{inx}}</td>
                              <td align="left">
                                <strong>Total : {{element}}</strong>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
        
                        </div>
                        <!-- <div class="mj-column-per-20 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border-bottom:1px solid #ddd;border-right:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">{{this}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;background:#fff;display:inline-block;font-size:0;line-height:0;text-align:left;width:100%;border-left: solid 1px #e5e5e5;border-right: solid 1px #e5e5e5;">
                          <!-- <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width: 2%;">
                          </div> -->
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody v-for="(item,index) in row.shipping_method.shipping_detail">
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:10px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Shipping Address</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{item.shipping_address.street1}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{item.shipping_address.city}} - {{item.shipping_address.postalcode}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{item.shipping_address.state}}, {{item.shipping_address.country}}.</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">T: {{item.shipping_address.phone}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody v-for="(item,index) in row.shipping_method.shipping_detail">
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:10px 10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Shipping</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Shipping Type : {{row.shipping_method.shipping_type}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Shipping Carrier : {{item.shipping_detail.shipping_carrier}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">In Hand Date : {{item.shipping_detail.on_hand_date}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Method : {{item.shipping_detail.shipping_method}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody v-for="(item,index) in row.shipping_method.shipping_detail">
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:10px 10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Shipping Charge</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-right:10px;padding-top:0" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Charge:{{item.shipping_detail.shipping_carrier}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  <!-- </div> -->
</div>
</template>
<script>
    import config from '../../config/customConfig.js'
    export default {
        props: {
            row: Object
        },
        data() {
            return {
              imgurl: this.row.product_image_url
            }
        },
        methods: {
          getImgUrl (url, img) {
            // if(this.imgurl == undefined) {
            //   return config.default.productImageUrl + url        
            // }
            console.log(url+img)
                return url + img
          },
        },
        mounted() {
        }
    };
</script>
<style>
</style>