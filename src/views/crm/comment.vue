<style scoped>
  .col-md-8 .chat .composeView {
    width: 96%;
    margin-left: 2%;
    margin-bottom: 1%;
  }
  .chat {
    display: block;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background: #eee;
  }
  .chat .message {
    display: flex;
    margin: 10px 0 0 10px;
    min-height: 30px;
    height: auto;
    text-align: left;
  }
  .chat .message.me img {
    order: 2;
    margin: 0 0 0 2px;
    float: right;
  }
  .chat .message.me div {
    order: 1;
    padding: 0 8px 0 0;
  }
  .chat .message.me div p {
    float: right;
    margin-right: 15px;
  }
  .chat .message.me div:before {
    position: relative;
    float: right;
    content: '';
    margin: 7px -8px 0 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 0 8px 8px;
    border-color: transparent transparent transparent #fff;
    display: none;
  }
  .chat .message img {
    order: 1;
    margin: 0 10px 0 0;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }
  .chat .message span img {
    order: 1;
    margin: 0 2px 0 0;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }
  .chat .message div {
    display: block;
    flex: 1;
    order: 2;
    width: 100%;
  }
  .chat .message div p {
    display: inline-block;
    margin: 0;
    max-width: 80%;
    padding: 8px 10px 8px 10px;
    background: #fff;
    word-wrap: break-word;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .chat .message div .emailText {
    min-height: 33px;
  }
  .chat .message.me div .emailText:before {    position: relative;
      float: right;
      content: "";
      width: 0px;
      height: 0px;
      margin: 7px -8px 0px 0px;
      border-style: solid;
      border-width: 8px 0px 8px 8px;
      border-color: transparent transparent transparent rgb(255, 255, 255);
      left: 9px;
  }
  .chat .message div .emailText:before {
    position: relative;
    float: left;
    content: '';
    margin: 7px 0 0 -8px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent #fff transparent transparent;
    right:10px;
    top: -5px;
  }
  .chat {
    border-radius: 5px;
  }
  #device {
    margin: -50px auto 0 auto;
    padding: 20px 20px 40px 20px;
    width: 350px;
    height: 100%;
    border-radius: 10px;
    border-bottom: 5px solid #222f3d;
    background: #34495e;
  }
  #device #size {
    -webkit-appearance: none;
    margin: 15px 0 0 0;
    width: 100%;
    height: 10px;
    vertical-align: middle;
    border-radius: 5px;
    background-color: #46627f;
    outline: none;
  }
  #device #size::-moz-range-track {
    margin: 15px 0 0 0;
    width: 100%;
    height: 10px;
    vertical-align: middle;
    border-radius: 5px;
    background-color: #46627f;
    outline: none;
  }
  #device #size::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    height: 20px;
    width: 20px;
    background-color: #4f6f8f;
    border-radius: 50%;
  }
  #device #size::-moz-range-thumb {
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    background-color: #4f6f8f;
    border-radius: 50%;
  }
  .track {
    margin: 15px 0 0 0;
    width: 100%;
    height: 10px;
    vertical-align: middle;
    border-radius: 5px;
    background-color: #46627f;
    outline: none;
  }
  .thumb {
    height: 20px;
    width: 20px;
    background-color: #4f6f8f;
    border-radius: 50%;
  }
  #drag {
    position: absolute;
    margin: 50px 0 0 -10px;
    padding: 5px 10px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    border-bottom: 2px solid #217dbb;
    background: #3498db;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }
  #drag:after {
    content: '';
    position: absolute;
    top: -20px;
    left: 10px;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #3498db transparent;
  }
  #preview {
    display: none;
    margin: -100px auto 0 auto;
    padding: 0;
    width: 350px;
    height: 500px;
  }
  #preview .chat {
    background: transparent;
    overflow: hidden;
    overflow-y: hidden;
  }
  #preview .chat #text {
    color: #fff;
    font-size: 12px;
  }
  @media (max-height: 400px) {
    #device {
      display: none;
    }
    #preview {
      display: block;
    }
  }
  .giveReply{
    position: relative;
    margin-top: 10px;
    border: 1px solid #36c6d3;
    height: 28px;
    margin-left: 5%;
    display: inline-block;
  }
  .giveReply:hover{
    cursor: pointer;
  }
  .sentDate{
    display: inline-block;
    /*float: right;*/
    width: 65%;
    text-align: right;
    margin-left: 30%;
    font-size: 11px;
  }
  .sentDate i{
    color: green;
  }
  .receivedDate{
    display: block;
    margin-left: 5%;
    font-size: 11px;
  }
  .modalCloseButton{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 41px;
    text-align: center;
    background: white;
    border: none;
    border-top: 1px solid #eee;
  }
  .modalCloseButton:focus{
    outline: none;
  }
  .emailText:hover{
    cursor: pointer;
  }

  #c2611 {
    background-color: rgb(0, 200, 169);
    font-weight: bold;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    color: rgb(255, 255, 255);
    width: auto !important;
  }
</style> 

 
<template>
   <div class="chat">
      <div id="block" style="text-align:right;width:100%">
         <button v-if="isActive" class="form-control"  id="c2611" style="float: right;background-color:rgb(235, 23, 23) !important" @click="close()">Close</button>
         <button v-if="isActive" class="form-control"  id="c2611" style="float: right;" @click="openEditor()">Save</button>
         <button v-else class="form-control"  id="c2611" style="float: right;" @click="openEditor()">New Comment</button>
      </div>
      <textarea style="display:none" id="editor2" name="editor2" ></textarea>
      <div style="margin-bottom: 10px;margin-right: 10px;">
         <div class="message">
            <Row>
               <Col span="24" >
               <!-- <div v-for="(item, index) in commentData"> -->
               <div >
                  <img src="http://mangalayatan.in/wp-content/uploads/2016/01/member1.jpg" />
                  <!-- <p class="emailText">{{item.Text}}</p> -->
                  <p class="emailText">I am here </p>
                  <span class="receivedDate">
                     <!-- <span>{{getDate(item.date)}}</span> -->
                     <span>1 day ago</span>
                  </span>
               </div>
               </Col>
            </Row>
         </div>
         <div class="message me" >
            <Row>
               <Col span="24" >
               <div v-for="(item, index) in commentData">
                  <img :src="src" />
                  <p class="emailText">{{item.comment}}</p>
                  <span class="sentDate">
                  <span style="color:blue;cursor:pointer" v-on:click="clicked(item, index)">Edit</span>|
                  <span style="color:red;cursor:pointer" v-on:click="deleteItem(item)">Delete</span>
                  <span>{{getDate(item.created_at)}}</span>
                  </span>
               </div>
               </Col>
            </Row>
         </div>
      </div>
   </div>
</template>

<script>
  import gravatar from 'gravatar'
  import moment from 'moment'
  import axios from 'axios'
  import config from '../../config/customConfig.js'
  var relationshipcomments = config.default.serviceUrl

  export default {
    data() {
      return { 
        isActive:false,
        src : '',
        commentData: []
      }
    },
    methods: {
      close () {
        var editor = CKEDITOR.instances.editor2
        editor.destroy();
        this.isActive = !this.isActive
        document.getElementById("editor2").style.display = "none";
        document.getElementById("block").style.display = "inline";
      },
      deleteItem (item) {
        var itemId = item.id
        console.log('deleteItem', item)
        let self = this
        axios({
          method:'delete',
          url: relationshipcomments + 'relationshipcomments/' + itemId
        })
        .then(function(response) {
          console.log("delete response.....",response)
          for(let i=0;i<self.commentData.length;i++){
            console.log("for..................",self.commentData[i])
            if(response.data.id == self.commentData[i].id){
              self.commentData.splice(i,1)
            }
          }
        });
      },
      clicked (item, index) {
        var itemId = item.id
        var data1
        var comment = this.commentData[index].comment
        let comment1
        console.log("************",itemId)
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: comment,
                autofocus: true,
                placeholder: 'Please enter your name...'
              },
              on: {
                input: (val) => {
                  console.log('val', val)
                  comment1 = val;
                }
              }
            })
          },
          onOk: () => {
            console.log("comment....",comment)
            this.$Message.info('Clicked ok');
            this.commentData[index].comment = comment1
            this.commentData[index].created_at = new Date() 
            data1 = {
              "comment": comment1,
              "created_at": new Date()
            }
            axios({
              method:'put',
              url: relationshipcomments + 'relationshipcomments/' + itemId,
              data: data1
            })
            .then(function(response) {
              console.log("update response.....",response)
            });
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        })
      },
      getDate (date) {
        return moment(date).fromNow()
      },
      openEditor() {
        var editor = CKEDITOR.instances.editor2
        if (!this.isActive) {
          CKEDITOR.replace("editor2")
          this.isActive = !this.isActive
          document.getElementById("block").style.display = "inline-block";
        } 
        else {
          var data1
          var self = this
          console.log('else')
          var content = CKEDITOR.instances['editor2'].getData();
          var text = $(content).text();
          var date = new Date();
          console.log("text.....",text,"date.....",date)
          console.log("Save called", this.commentData)
          // this.commentData.forEach(function(element) {
            // console.log(element);
            data1 = {
              "comment": text,
              "created_at": date
            }
          // });
          console.log('data1', data1)
          axios({
            method:'post',
            url: relationshipcomments + 'relationshipcomments',
            data: data1
          })
          .then(function(response) {
            self.commentData.push({comment: text, created_at: date, id: response.data.id})
            console.log("save response.....",response)
            console.log("this.commentData", self.commentData)
          });
          editor.destroy();
          this.isActive = !this.isActive
          document.getElementById("editor2").style.display = "none";
          document.getElementById("block").style.display = "inline";
        }
        console.log('outer',this.isActive)
      },
      getData () {
        var self = this
        axios({
          method:'GET',
          url: relationshipcomments + 'relationshipcomments',
        })
        .then(function(response) {
          response.data.data.forEach(function(item,index){
            self.commentData.push(item)
          })          
          
          console.log("++++++++++++++",self.commentData)
          console.log("save response.....",response.data.data)
        });
      }
    },
    mounted() {
      this.src= gravatar.url('dweepp@officebrain.com', {s: '200', r: 'pg', d: '404'})
      console.log(this.src)
      this.getData()
    }
  }
</script>
 

