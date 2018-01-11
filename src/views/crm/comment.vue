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
    overflow: auto;
    max-height: 365px;
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
		<div id="block" style="text-align:right;width:100%;display:inline-block">
			<button v-if="isActive" class="form-control"  id="c2611" style="float: right;background-color:rgb(235, 23, 23) !important" @click="close()">Close</button>
			<button v-if="isActive" class="form-control"  id="c2611" style="float: right;" @click="openEditor()">Save</button>
			<button v-else class="form-control"  id="c2611" style="float: right;" @click="openEditor()">New Comment</button>
		</div>

		<textarea style="display:none" id="editor2" name="editor2" ></textarea>
		<div v-for="(item, index) in commentData" style="margin-bottom: 10px;margin-right: 10px;">
			<div class="message"  v-if="item.user_id != userId">
				<Row>
					<Col span="24" >
						<!-- <div v-for="(item, index) in commentData"> -->
						<div >
							<img src="http://mangalayatan.in/wp-content/uploads/2016/01/member1.jpg" />
							<!-- <p class="emailText">{{item.Text}}</p> -->
							<!-- <p class="emailText">I am here </p> -->
              <p class="emailText">{{item.comment}}</p>
							<span class="receivedDate">
								<!-- <span>{{getDate(item.date)}}</span> -->
								<!-- <span>1 day ago</span> -->
                <!-- <span v-if="item.isEdited" style="color:blue;cursor:pointer" v-on:click="clicked(item, index)">Edited</span> -->
                <!-- <span v-else style="color:blue;cursor:pointer" v-on:click="clicked(item, index)">Edit</span> || -->
                    
                <!-- <span style="color:red;cursor:pointer" v-on:click="deleteItem(item)">Delete</span> -->
                <span v-if="item.isEdited">{{getDate(item.edited_at)}}</span>
                <span v-else>{{getDate(item.created_at)}}</span>
                <span v-if="item.isEdited">{{item.edited_by}}</span>
                <span v-else>{{item.created_by}}</span>
							</span>
						</div>
					</Col>
				</Row>
			</div>
			<div v-else class="message me" >
				<Row>
					<Col span="24" >
						<div  >
							<img :src="src" />
							<p class="emailText">{{item.comment}}</p>
							<span class="sentDate">
								<span v-if="item.isEdited" style="color:blue;cursor:pointer" v-on:click="clicked(item, index)">Edited</span>
								<span v-else style="color:blue;cursor:pointer" v-on:click="clicked(item, index)">Edit</span> ||
                    
								<span style="color:red;cursor:pointer" v-on:click="deleteItem(item)">Delete</span>
								<span v-if="item.isEdited">{{getDate(item.edited_at)}}</span>
								<span v-else>{{getDate(item.created_at)}}</span>
								<span v-if="item.isEdited">{{item.edited_by}}</span>
								<span v-else>{{item.created_by}}</span>
							</span>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	</div>
</template>
<script>
  import Cookies from 'js-cookie';
  import gravatar from 'gravatar'
  import moment from 'moment'
  import axios from 'axios'
  import config from '../../config/customConfig.js'
  var userid
  var crm_id
  var created_date
  var new_comment
  var relationshipcomments = config.default.serviceUrl
  export default {
    data() {
      return { 
        isActive:false,
        userId: '',
        // isEdit:false,
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
        document.getElementById("block").style.display = "inline-block";
      },
      deleteItem (item) {
        var itemId = item.id
        console.log('deleteItem', item)
        let self = this
        this.$Modal.confirm({
          okText: 'OK',
          cancelText: 'Cancel',
          title: 'Title',
          content: '<p>Are you sure to delete?<p>',
          onOk: () => {
            var userid = Cookies.get('user')
            var data1= {
              "isDeleted": true,
              "deleted_by": userid,
              "deleted_at": new Date()
            }
            axios({
              method:'patch',
              url: relationshipcomments + 'relationshipcomments/' + itemId,
              data: data1
            })
            .then(function(response) {
              console.log("delete response.....",response)
              for(let i=0;i
			<self.commentData.length;i++){
                console.log("for..................",self.commentData[i])
                if(response.data.id == self.commentData[i].id){
                  self.commentData.splice(i,1)
                }
              }
            });
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        })
      },
      clicked (item, index) {
        var itemId = item.id
        var data1
        var comment = this.commentData[index].comment
        let comment1
        console.log("************",itemId)
        this.$Modal.confirm({
          okText: 'OK',
          cancelText: 'Cancel',
          render: (h) => {
            return h('Input', {
              props: {
                value: comment,
                autofocus: true
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
            var self = this
            var userid = Cookies.get('user')
            console.log("comment....",comment)
            this.$Message.info('Clicked ok');
            this.commentData[index].comment = comment1
            this.commentData[index].created_at = new Date() 
            data1 = {
              "comment": comment1,
              "edited_by": userid,
              "edited_at": new Date(),
              "isEdited": true
              // "created_at": created_date,
              // "created_by": userid,
              // "crm_id": crm_id,
              // "user_id": userid,
              // "isDeleted": false,
              // "deleted_by": "",
              // "deleted_at": ""
            }
            axios({
              method:'patch',
              url: relationshipcomments + 'relationshipcomments/' + itemId,
              data: data1
            })
            .then(function(response) {
              console.log("update response.....",response)
              self.commentData[index].edited_at = new Date() 
              self.commentData[index].isEdited = true
              self.commentData[index].edited_by = userid
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
          CKEDITOR.instances.editor2.setData("")
          this.isActive = !this.isActive
          document.getElementById("block").style.display = "inline-block";
        } 
        else {
          this.$Notice.success({
            title: 'Comment Saved',
            duration: 4.5
          });
          // this.$Message.success('Comment Saved')
          var data1
          var self = this
          console.log('else')
          var content = CKEDITOR.instances['editor2'].getData();
          new_comment = $(content).text();
          created_date = new Date();
          crm_id = self.$route.params.id
          userid = Cookies.get('user')
          console.log("text.....",new_comment,"date.....",created_date)
          console.log("Save called", this.commentData)
          // this.commentData.forEach(function(element) {
            // console.log(element);
            data1 = {
              "comment": new_comment,
              "created_at": created_date,
              "created_by": userid,
              "crm_id": crm_id,
              "user_id": userid,
              "isEdited": false,
              "isDeleted": false,
              "deleted_by": "",
              "deleted_at": "",
              "edited_by": "",
              "edited_at": "",
            }
          // });
          console.log('data1', data1)
          axios({
            method:'post',
            url: relationshipcomments + 'relationshipcomments',
            data: data1
          })
          .then(function(response) {
            console.log("save response.....",response)
            self.commentData.push({comment: new_comment, created_at: created_date, id: response.data.id, created_by: userid})
            console.log("this.commentData", self.commentData)
          });
          
          editor.destroy();
          this.isActive = !this.isActive
          document.getElementById("editor2").style.display = "none";
          document.getElementById("block").style.display = "inline-block";
        }
        console.log('outer',this.isActive)
      },
      getData () {
        var self = this
        var crm_id = self.$route.params.id
        this.userId = Cookies.get('user')
        axios({
          method:'GET',
          url: relationshipcomments + 'relationshipcomments',
        })
        .then(function(response) {
          response.data.data.forEach(function(item,index){
            if (item.crm_id == crm_id && item.isDeleted == false){
            // if (item.crm_id == crm_id){
              self.commentData.push(item);
            }
          })          
          
          console.log("++++++++++++++self.commentData",self.commentData)
          self.commentData = _.sortBy(self.commentData, 'created_at')
        });
      }
    },
    mounted() {
      this.src= gravatar.url('dweepp@officebrain.com', {s: '200', r: 'pg', d: '404'})
      this.getData()
    }
  }

			</script>
