<template>
  <b-overlay :show="loading">
    <div class="container pt-5" style="padding-bottom:50vh">
      <div class="row justify-content-center">
        <div class="col-lg-12 col-xl-12">
          <div class="page-header">
            <h4>{{info.title}}</h4>


          </div>
          <hr>

          <b-tabs pills fill variant="danger" nav-class="rounded bg-light shadow-sm p-3" active-nav-item-class="bg-white">
            <b-tab title="Trail" :title-link-class="`font-weight-normal`">
              <template #title>
                <div class=" text-primary">
                  Trail <b-badge variant="danger">{{messages.length}}</b-badge>
                </div>
              </template>
              <div class="mt-3">
                <h3 class="text-muted text-lg">Job Trail</h3>
                <div class="content-list-body">
                  <ol class="list-group list-group-flush">

                    <li class="list-group-item shadow">
                      <div class="media">
                        <b-avatar class="avatar mr-2" size="md"></b-avatar>

                        <div class="media-body">
                          <div class="media-title" style="">
                            <span class="h6 mr-1">{{info.user?info.user.name:'mumu'}}</span>

                            <span class="float-right text-muted text-xs"
                              v-b-tooltip="{ title: info.created_at, placement: 'bottomLeft' }">
                              {{info.created_at | formatDate('LLL')}}
                            </span>
                          </div>
                          <div class="messge-body" style="font-size: .875rem;line-height: 1.3125rem;"
                            v-html="info.content">

                          </div>
                          <div class="row" v-if="info.attachments && Boolean(info.attachments.length)">
                            <div class="col-md-12">
                              <hr>
                              <template v-for="(item, index) in info.attachments">
                                <div class="media media-attachment" :key="`f-${index}`">
                                  <b-avatar
                                    @click="check_mime(item.file_meta.ext)?full_screen_image( info.attachments):null"
                                    button rounded="sm" size="2rem" :src="`${serUrl}${item.thumb}`" variant="primary"
                                    icon="paperclip">

                                  </b-avatar>
                                  <div class="media-body">
                                    <a role="button"
                                      @click="check_mime(item.file_meta.ext)?full_screen_image(info.attachments):null"
                                      class="A-filter-by-text">{{item.filename}}</a>
                                    <span class="text-muted text-xs">{{item.file_meta.size | bytesToSize(2)}}</span>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>



                        </div>
                      </div>
                    </li>

                    <li class="list-group-item shadow pb-4" v-for="i in messages" :key="i.id">
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
                          <div class="messge-body" style="font-size: .875rem;line-height: 1.3125rem;"
                            v-html="i.content">

                          </div>
                          <div class="row" v-if="info.attachments && Boolean( info.attachments.length)">
                            <div class="col-md-12">
                              <hr>
                              <template v-for="(item, index) in i.file">
                                <div class="media media-attachment" :key="`f-${index}`">

                                  <b-avatar @click="check_mime(item.file_meta.ext)?full_screen_image(i.file):null"
                                    button rounded="sm" size="2rem" :src="`${serUrl}${item.thumb}`" variant="primary"
                                    icon="paperclip">

                                  </b-avatar>
                                  <div class="media-body">
                                    <a role="button"
                                      @click="check_mime(item.file_meta.ext)?full_screen_image(i.file):null"
                                      class="A-filter-by-text">{{item.filename}}</a>
                                    <span class="text-muted text-xs">{{item.file_meta.size | bytesToSize(2)}} <a
                                        :href="`${serUrl}/cors/downloadFile2/${item.id}`" target="_blank"><i
                                          class="fa fa-download" aria-hidden="true"></i></a></span>


                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>



                        </div>
                      </div>
                    </li>
                    <li class="list-group-item" style="background-color: transparent;padding: 15px;">
                      <sendMessage @sent="get_messages()" :trailid="$route.params.id" />
                    </li>
                  </ol>
                </div>
              </div>
            </b-tab>
            <b-tab title="Projects">
              <b-img :src="full_image"></b-img>
            </b-tab>
            <b-tab title="Files">

            </b-tab>
          </b-tabs>
        </div>
      </div>
      <view_image ref="viewer" />
    </div>
  </b-overlay>
</template>
<style lang="scss">


</style>

<script>
  /*eslint-disable*/
  import {
    mapState
  } from 'vuex'
  import sendMessage from './sendmessage'
  import view_image from './view_image'
  export default {
    components: {
      sendMessage,
      view_image
    },
    computed: mapState([
      'serUrl'
    ]),
    data() {
      return {
        messages: [],
        show_pic: false,
        full_image: '',
        loading: true,
        info: {}
      }
    },
    mounted() {


      axios.all([this.get_messages(), this.get_trail_details()])
        .then(axios.spread((res1, res2) => {
          this.loading = false
        }))
    },
    methods: {
      check_mime(type) {
        return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(type);
      },
      full_screen_image(f) {
        var $images = f.filter(x => {
          return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(x.file_meta.ext)
        }).map(x => `${this.serUrl}/${x.location}`)
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