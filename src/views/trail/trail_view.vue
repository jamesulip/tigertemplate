<template>
  <b-overlay :show="loading">
    <div class="pt-5" style="padding-bottom:50vh">
      <div class="flex justify-center">
        <div class="col-lg-10 col-xl-8">
          <div class="page-header">
            <h4 class="h4">{{info.title}}</h4>


          </div>
          <hr>

          <b-tabs pills fill variant="danger" nav-class="rounded bg-tab p-3" active-nav-item-class="bg-white">
            <b-tab title="Trail" :title-link-class="`font-weight-normal`">
              <template #title>
                <div class=" text-primary">
                  Trail <b-badge variant="danger">{{messages.length}}</b-badge>
                </div>
              </template>

              <div class="mt-3">

                <h3 class="text-muted text-lg py-3">Job Trail</h3>
                <div class="content-list-body">


                  <ol class="list-group list-group-flush">



                    <li class="list-group-item  pb-5" v-if="!info.user">
                      <div class="media">

                        <b-skeleton type="avatar" class="mr-2"></b-skeleton>
                        <div class="media-body">
                          <div class="media-title" style="">
                            <span class="h6 mr-1">
                              <b-skeleton animation="wave" width="200px"></b-skeleton>
                            </span>
                            <span class="float-right text-muted text-xs"
                              v-b-tooltip="{ title: info.created_at, placement: 'bottomLeft' }">
                              <b-skeleton animation="wave" width="100px"></b-skeleton>
                            </span>
                          </div>
                          <div class="messge-body" style="font-size: .875rem;line-height: 1.3125rem;">
                            <b-skeleton animation="wave" width="85%"></b-skeleton>
                            <b-skeleton animation="wave" width="55%"></b-skeleton>
                            <b-skeleton animation="wave" width="70%"></b-skeleton>
                            <b-skeleton animation="wave" width="85%"></b-skeleton>
                            <b-skeleton animation="wave" width="55%"></b-skeleton>
                            <b-skeleton animation="wave" width="70%"></b-skeleton>
                          </div>
                        </div>
                      </div>
                    </li>


                    <li class="list-group-item  pb-5" v-else>
                      <div class="flex items-center">
                        <b-avatar class="avatar mr-2 " :src="`${serUrl}${info.user.img}`" size="md"></b-avatar>
                        <div class="ml-2">
                          <div class="text-sm ">
                            <span class="font-semibold">{{info.user?info.user.name:'mumu'}}</span>
                          </div>
                          <div class="text-gray-500 text-xs " v-html="info.user?info.user.role:'mumu'"></div>
                          <div class="text-gray-500 text-xs flex">
                            <span class="inline-block">{{info.created_at | formatDate('ago')}}</span>
                          </div>
                        </div>
                      </div>
                      <p class="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed" v-html="info.content"></p>
                      <div class="row text-sm" v-if="info.attachments && Boolean( info.attachments.length)">
                        <div class="col-md-12">
                          <hr>
                          <div class="row">
                            <template v-for="(item, index) in info.attachments">
                              <div class="col-md-3 p-2" :key="`f-${index}`">
                                <div class="media media-attachment ">

                                  <b-avatar
                                    @click="check_mime(item.file_meta.ext)?full_screen_image(info.attachments):null"
                                    button rounded="sm" size="2rem" :src="`${serUrl}${item.thumb}`" variant="primary"
                                    icon="paperclip">

                                  </b-avatar>
                                  <div class="media-body  text-truncate">
                                    <a role="button" v-b-tooltip="{ title: item.filename, placement: 'bottom' }"
                                      @click="check_mime(item.file_meta.ext)?full_screen_image(info.attachments):null"
                                      class=" text-truncate">{{item.filename}}</a>
                                    <span class="text-muted text-xs">{{item.file_meta.size | bytesToSize(2)}} <a
                                        v-b-tooltip="'download'" :href="`${serUrl}/cors/downloadFile2/${item.id}`"
                                        target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="list-group-item  pb-4" v-for="(i,index) in messages" :key="i.id">

                      <proposal v-if="i.Type=='proposal'" v-model="messages[index]" />
                      <template v-else>
                        <div class="flex items-center">
                          <b-avatar class="avatar mr-2 " :src="`${serUrl}${i.userl.img}`" size="md"></b-avatar>
                          <div class="ml-2">
                            <div class="text-sm ">
                              <span class="font-semibold">{{i.userl?i.userl.name:'mumu'}}</span>
                            </div>
                            <div class="text-gray-500 text-xs " v-html="i.userl?i.userl.role:'mumu'"></div>
                            <div class="text-gray-500 text-xs flex">
                              <span class="inline-block">{{i.created_at | formatDate('ago')}}</span>
                            </div>
                          </div>
                        </div>
                        <p class="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed" v-html="i.content"></p>
                        <div class="row text-sm" v-if="Boolean(i.file.length)">
                          <div class="col-md-12">
                           
                            <div class="row">
                              <template v-for="(item, index) in i.file">
                                <div class="col-md-3 p-2" :key="`f-${index}`">
                                  <div class="media media-attachment ">

                                    <b-avatar @click="check_mime(item.file_meta.ext)?full_screen_image(i.file):null"
                                      button rounded="sm" size="2rem" :src="`${serUrl}${item.thumb}`" variant="primary"
                                      icon="paperclip">

                                    </b-avatar>
                                    <div class="media-body  text-truncate">
                                      <a role="button" v-b-tooltip="{ title: item.filename, placement: 'bottom' }"
                                        @click="check_mime(item.file_meta.ext)?full_screen_image(i.file):null"
                                        class=" text-truncate">{{item.filename}}</a>
                                      <span class="text-muted text-xs">{{item.file_meta.size | bytesToSize(2)}} <a
                                          v-b-tooltip="'download'" :href="`${serUrl}/cors/downloadFile2/${item.id}`"
                                          target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                      </template>
                    </li>
                    <li class="list-group-item w-full overflow-hidden">
                      <sendMessage @sent="get_messages()" :trailid="$route.params.id" />
                    </li>
                  </ol>
                </div>
              </div>
            </b-tab>
            <b-tab title="Projects">
              <template #title>
                <div class=" text-primary">
                  Projects <b-badge variant="danger">{{$evaluate('info.projects?.length')}}</b-badge>
                </div>
              </template>
               <div class="card-body  p-0 table-responsive" style="min-height:600px">
                    <table
                        class="table table-hover   table-striped table-condensed table-sm  table-valign-middle">
                        <thead>
                            <tr>
                                <th>TYPE</th>
                                <th>Number</th>
                                <th>Project Name</th>
                                <th>Company</th>
                                <th>Media</th>
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(Project, index) in info.projects" :key="index">
                                <td>
                                    <p class="h3 font-weight-bold m-0">{{Project.TYPE}}</p>
                                </td>
                                <td>
                                    {{Project.NUM}} <span class="text-muted"
                                        v-if="parseInt(Project.VERSION)">Version:{{Project.VERSION}}</span>
                                </td>
                                <td>
                                    <div class="text-truncate" style="width:150px">{{Project.detail2.client2.com_name}}
                                    </div>
                                </td>
                                <td>
                                    <div class="text-truncate" style="width:150px">{{Project.detail2.s_projname}}</div>
                                </td>
                                <td class=" middle-align">
                                    <span class="badge">{{Project.detail2.s_media}}</span>
                                </td>
                                <td>
                                    <span style="display:block">{{Project.Status}} </span>
                                </td>
                               
                                <td>
                                   <b-button variant="link" size="sm"
                                            @click.prevent="x=>{selID=Project.DETAILID;current_project_modal=true}">view
                                      </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </b-tab>
            <b-tab title="Files">

            </b-tab>
          </b-tabs>
        </div>
      </div>
      <view_image ref="viewer" />
      <b-modal size="lg" @shown="loadModal(selID)" ok-only v-model="current_project_modal" content-class="shadow">
            <project_detail ref="detailModal" :project_id="selID" :load="true" />
        </b-modal>
    </div>
  </b-overlay>
</template>
<style lang="scss">
  .bg-tab {
    background-color: #E9ECEF;
  }
</style>

<script>
  /*eslint-disable*/
  import {
    mapState
  } from 'vuex'
  import sendMessage from './sendmessage'
  import view_image from './view_image'
  import proposal from '../../components/updatebutton.vue'
  import updateButton from '../../components/updatebutton'
  export default {
    components: {
      sendMessage,
      view_image,
      proposal,
      updateButton
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
        info: {},
        current_project_modal:false,
        selID:null
      }
    },

    mounted() {


      axios.all([this.get_messages(), this.get_trail_details()])
        .then(axios.spread((res1, res2) => {
          this.loading = false
        }))
    },
    methods: {
      loadModal(id) {
        this.current_project_modal = true
        this.$refs.detailModal.load_details(id)
      },
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