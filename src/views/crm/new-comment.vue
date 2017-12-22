 <template>
  <v-list two-line id="conversation">
    <template>
      <v-layout row wrap >
        <v-flex xs2 sm1 md1 lg1 style="text-align: center;">
          <v-tooltip bottom>
            <v-avatar slot="activator">
              <img src="../assets/man.png">
            </v-avatar>
            <span></span>
          </v-tooltip>
        </v-flex>
        <v-flex xs7 sm8 md8 lg8>
          <v-list-tile @click="" class="you">
            <v-list-tile-content>
              <v-list-tile-title class="message" >
              </v-list-tile-title>
              <v-list-tile-title class="message" >
                
              </v-list-tile-title>
              <v-list-tile-sub-title class="conDate">
                
                <v-tooltip bottom >
                  <v-avatar slot="activator">
                    <img src="../assets/man.png" style="height: 25px;width: 25px;">
                  </v-avatar>
                  <span>Cc:- </span>
                </v-tooltip>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </v-layout>


      <v-layout row wrap >
        <v-flex xs7 sm8 md8 lg8 offset-xs3 offset-sm3 offset-md3 offset-lg3>
          <v-list-tile @click="" class="me">
            <v-list-tile-content>
              <v-list-tile-title class="message" >
              </v-list-tile-title>
              <v-list-tile-sub-title class="conDate">
                <v-tooltip bottom >
                  <v-avatar slot="activator">
                    <img src="../assets/man.png" style="height: 25px;width: 25px;">
                  </v-avatar>
                  <span>Cc:- </span>
                </v-tooltip>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
        <v-flex xs2 sm1 md1 lg1 style="text-align: center;">
          <v-tooltip bottom>
            <v-avatar slot="activator">
              <img src="../assets/man.png">
            </v-avatar>
            <span>{{ conv.data.from }}</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </template>

    <!-- <v-dialog v-model="dialog" max-width="80%" lazy v-if="detailEmail!=null">
      <v-card style="background-color: #eff4f5;color: #34495e;">
        <v-card-title>
          <v-layout align-center row spacer slot="header">
            <v-flex xs1>
              <v-avatar size="36px" slot="activator">
                <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">
              </v-avatar>
            </v-flex>
            <v-flex xs3>
              <v-list-tile-content>{{ detailEmail.from.text }}</v-list-tile-content>
              <v-list-tile-sub-title>{{ detailEmail.date | moment("from", "now") }}</v-list-tile-sub-title>
            </v-flex>
          </v-layout>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-text v-html="detailEmail.html"></v-card-text>
        
        <v-card-actions>
          <v-btn color="primary" @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- <v-chip outline color="primary" id="replyButton" @click="openReply" v-if="!$store.state.showReply">reply</v-chip>
    <v-chip outline color="primary" id="replyButton" @click="cancelReply" v-if="$store.state.showReply">cancel</v-chip>
    <kcomposeview v-if="$store.state.showReply"></kcomposeview> -->
  </v-list>
</template>


<style>
@media screen and (min-width: 1024px){
  #conversation{
    margin-left: 15px;
    padding: 15px;
  }
}
#conversation a:hover{
  background-color: transparent !important;
}
#conversation{
  margin-top: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
}
#conversation a{
  height: auto !important;
  padding: 0 !important;
}
.message{
  padding: 0.657rem 1.375rem;
  color: #34495e;
  border-radius: 30px;
  font-size: 1rem;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 300;
  line-height: 1.5 !important;
  text-align: justify !important;
  height: auto !important;
  word-wrap: break-word !important;
  white-space: inherit !important;
}
.you .message{
  background-color: #eff4f5;
  border-top-left-radius: 0;
}
.me .message{
  background-color: #74e487;
  border-top-right-radius: 0;
}
.conDate{
  color: #34495e !important;
}
#replyButton{
  margin-top: 10px;
}
#replyButton .chip__content:hover{
  cursor: pointer;
}
</style>