<template>
  <div class="container pt-5 pb-1">
    <div class="row justify-content-center">
      <div class="col-lg-12 col-xl-12">
        <div class="page-header">
          <h4>{{info.title}}</h4>
          <div class="card card-body" v-html="info.content">
            asd
          </div>
        </div>
        <hr>

        <b-tabs pills fill variant="danger" active-nav-item-class="text-uppercase bg-white text-blue">
          <b-tab title="Trail" :title-link-class="``">
            <div class="mt-3">
              <div class="content-list-body">
                <ol class="list-group list-group-flush">
                  <li class="list-group-item" v-for="i in messages" :key="i.id">
                    <div class="media">
                      <b-avatar class="avatar mr-2" size="md"></b-avatar>

                      <div class="media-body">
                        <div class="media-title" style="">
                          <span class="h6 mr-1">{{i.userl?i.userl.name:'mumu'}}</span>

                          <span class="float-right text-muted text-xs"
                            v-b-tooltip="{ title: i.created_at, placement: 'bottomLeft' }">
                            {{i.created_at | formatDate('ago')}}
                          </span>
                        </div>
                        <div class="messge-body" style="font-size: .875rem;line-height: 1.3125rem;" v-html="i.content">

                        </div>
                        <template  v-for="(item, index) in i.file" >
                        <div class="media media-attachment" v-if="Boolean(i.file.length)" :key="`f-${index}`">
                     
                         <b-avatar @click="check_mime(item.file_meta.ext)?full_screen_image(i.file):null" button rounded="sm" size="2rem" :src="`${serUrl}${item.thumb}`" variant="primary"  icon="paperclip">
                      
                         </b-avatar>
                          <div class="media-body">
                            <a role="button" @click="check_mime(item.file_meta.ext)?full_screen_image(i.file):null" class="A-filter-by-text">{{item.filename}}</a>
                            <span class="text-muted text-xs">{{item.file_meta.size | bytesToSize(2)}}</span>
                          </div>
                        </div>
                        </template>


                      </div>
                    </div>
                  </li>
                  <li class="list-group-item" style="background-color: transparent;">
                    <sendMessage @sent="get_messages()" :trailid="$route.params.id" />
                  </li>
                </ol>
              </div>
            </div>
          </b-tab>
          <b-tab title="Projects">
            <b-img :src="full_image"></b-img>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <view_image ref="viewer"/>
  </div>
</template>
<style lang="scss">


</style>

<script>
  /*eslint-disable*/
  import { mapState } from 'vuex'
  import sendMessage from './sendmessage'
  import view_image from './view_image'
  export default {
    components: {
      sendMessage,view_image
    },
     computed: mapState([
    'serUrl'
  ]),
    data() {
      return {
        messages: [],
        show_pic:false,
        full_image:'',

        info:{}
      }
    },
    mounted() {
      this.get_messages()
      this.get_trail_details()
      
    },
    methods: {
      check_mime(type){
        return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(type);
      },
      full_screen_image(f){
        var $images = f.filter(x=>{return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(x.file_meta.ext)}).map(x=> `${this.serUrl}/${x.location}`)
        this.$refs.viewer.show($images)
        console.log($images)
      },
      get_trail_details() {
        axios.post(`cors/emails/details/${this.$route.params.id}`)
          .then(res => {
            // console.log(res)
            this.info = res.data
          })
          .catch(err => {
            console.error(err);
          })
      },
      get_messages() {
        axios.post(`cors/trail/${this.$route.params.id}`)
          .then(res => {
            // console.log(res)
            this.messages = res.data
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
  }
</script>