
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
}
.chat .message.me div {
  order: 1;
  padding: 0 8px 0 0;
}
.chat .message.me div p {
  float: right;
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
}
.chat .message img {
  /*display: block;*/
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
  /*display: block;*/
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
  width: 95%;
}
.chat .message div p {
  display: inline-block;
  margin: 0;
  /*width: auto;*/
  max-width: 80%;
  padding: 8px 10px 8px 10px;
  background: #fff;
  word-wrap: break-word;
  /*font-family: Monospace;*/
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.chat .message div:before {
  position: relative;
  float: left;
  content: '';
  margin: 7px 0 0 -8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 8px 0;
  border-color: transparent #fff transparent transparent;
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
  /*font-family: arial, sans-serif;*/
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
  /*font-family: arial, sans-serif;*/
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
  float: right;
  width: 65%;
  text-align: right;
  margin-left: 86%;
}
.sentDate i{
  color: green;
}
.receivedDate{
  display: block;
  margin-left: 1%;
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
      <button v-if="isActive" class="form-control"  id="c2611" style="float: right;" @click="openEditor()">Save Comment</button>
      <button v-else class="form-control"  id="c2611" style="float: right;" @click="openEditor()">New Comment</button>
    </div>
    <textarea style="display:none" id="editor2" name="editor2" ></textarea>
    <div style="margin-bottom: 10px;margin-right: 10px;">
      <div class="message">
      <Row >
        <Col span="24" >
        <div v-for="(item, index) in commentData">
            <p class="emailText">{{item.Text}}</p>
            <span class="receivedDate">
              <span>{{getDate(item.date)}}</span>
            </span>
          </div>
        </Col>
      </Row>        
        <!-- <div> -->
         <!--  <p class="emailText">Email</p>
          <span class="receivedDate">
            <span>12/12/2017</span>
          </span> -->
          
        </div>

      <!-- </div> -->
    </div>
  </div>

</template>

<script>
import moment from 'moment'
export default {
    data() {
        return { 
          isActive:false,
          commentData: []
        }
    },
    methods: {
      getDate (date) {
        return moment(date).fromNow()
      },
      openEditor(textarea) {

        var editor = CKEDITOR.instances.editor2
        console.log(">>>>>", editor)
        if (!this.isActive) {
          CKEDITOR.replace("editor2")
          this.isActive = true
          document.getElementById("block").style.display = "inline-block";
        }else{
          var content = CKEDITOR.instances['editor2'].getData();
          var text = $(content).text();
          console.log('Content', text)
          // var d = new Date()
          var date = new Date();
          this.commentData.push({Text: text, date: date})
          editor.destroy();
          this.isActive = false
          document.getElementById("editor2").style.display = "none";
          document.getElementById("block").style.display = "inline";
        }
      }
    },
    mounted() {
    }
  }
</script>
