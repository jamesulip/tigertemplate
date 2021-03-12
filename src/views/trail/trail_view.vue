<template>
  <b-overlay :show="loading">

    <div class="col-12 pt-5" style="padding-bottom:50vh">
      <div>
        <div class="page-header">
          <h4 class="h4">{{info.title}}</h4>
        </div>
        <hr>

        <b-tabs pills fill variant="danger" nav-class="rounded bg-tab p-3 mt-3" active-nav-item-class="bg-white">
          <b-tab title="Trail" :title-link-class="`font-weight-normal`">
            <template #title>
              <div class=" text-primary">
                Trail <b-badge variant="danger">{{messages.length}}</b-badge>
              </div>
            </template>

            <div class="mt-3">

              <div class="py-3">
                <span class="text-muted text-lg ">Job Trail</span>
                <div class="float-right">
                  <select @change="x=>load_messages(x)" class="bg-gray-100" id="">
                    <option value="All">All</option>
                    <option value="Logs">Logs</option>
                    <option value="Comments">Messages</option>
                    <option value="Proposal">Proposal</option>
                    <option value="">Proposals</option>
                  </select>
                </div>
              </div>

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
                    <p class="text-black text-sm mt-2 leading-normal md:leading-relaxed" v-html="info.content"></p>
                    <div class="row text-sm" v-if="info.projects && Boolean( info.projects.length)">
                      <div class="w-full p-2">
                        <div class="text-gray-500 text-md mb-2">
                          Projects
                        </div>
                          <ul class="border border-gray-200 rounded-md divide-y divide-gray-200 w-1/3">
                            <li class="pl-3 pr-4 py-2 flex items-center justify-between text-sm" v-for="(p,ind) in info.projects" :key="`s-${ind}`">
                              <div class="w-0 flex-1 flex items-center hover:text-blue-500 cursor-pointer hover:underline" @click="show_details(p.DETAILID)">
                                <span class="uppercase text-md font-bold ">{{p.TYPE}}#{{p.NUM}}</span>
                                <span class="ml-2 flex-1 w-0 truncate">
                                  {{p.detail2.s_projname}}
                                </span>
                              </div>
                              <div class="ml-4 flex-shrink-0 flex">
                                <div v-if="p.VERSION>0">
                                  v{{p.VERSION}}
                                </div>
                                <span href="#" class="cursor-pointer hover:no-underline font-medium px-2 text-blue-600 hover:text-blue-500 flex">
                                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                  </svg>
                                  Download PDF
                                </span>
                              </div>
                            </li>
                          </ul>
                      </div>
                      <div class="w-full  p-2"  v-if="info.attachments && Boolean( info.attachments.length)">
                        <div class="text-gray-500 text-md mb-2">
                          Attachments
                        </div>
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
                    <request v-else-if="i.Type=='revision' || i.Type=='proposal'" v-model="messages[index]" />
                    <errorView @showdetails="x=>show_details(x)" v-else-if="i.Type=='error' || i.Type=='error'"
                      v-model="messages[index]" />
                    <template v-else>
                      <div class="flex items-center">
                        <b-avatar class="avatar mr-2 " :src="`${serUrl}${i.userl.img}`" size="md"></b-avatar>
                        <div class="ml-2">
                          <div class="text-sm ">
                            <span class="font-semibold">{{i.userl?i.userl.name:'mumu'}}</span>
                            <b-badge pill variant="success"></b-badge>
                          </div>
                          <div class="text-gray-500 text-xs " v-html="i.userl?i.userl.role:'mumu'"></div>
                          <div class="text-gray-500 text-xs flex">
                            <span class="inline-block">{{i.created_at | formatDate('ago')}}</span>
                          </div>
                        </div>
                      </div>
                      <p class="text-black text-sm mt-2 leading-normal md:leading-relaxed" v-html="i.content"></p>
                      <attachments :files="i.file" />
                    </template>
                  </li>
                  <li class="list-group-item w-full">
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
              <table class="table table-hover   table-striped table-condensed table-sm  table-valign-middle">
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
                        @click.prevent="x=>{selected_view=Project.DETAILID;current_project_modal=true}">view
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
      <view_image ref="viewer" />
    </div>
    <b-modal hide-footer hide-header size="xl" ok-only v-model="current_project_modal" content-class="shadow"
      body-class="p-0">
      <project_detail @close="current_project_modal = false" :load="true" :project_id="selected_view">
        <template #footer>
          <b-button @click="current_project_modal=false" variant="danger" class="float-right">
            Close
          </b-button>
        </template>
      </project_detail>
    </b-modal>
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
  import proposal from './lr-view.vue'
  import request from './lr-request.vue'
  import errorView from './error-view'
  import attachments from './attachments'
  export default {
    components: {
      sendMessage,
      view_image,
      proposal,
      request,
      errorView,
      attachments
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
        current_project_modal: false,
        selected_view: {}
      }
    },

    mounted() {


      axios.all([this.get_messages(), this.get_trail_details()])
        .then(axios.spread((res1, res2) => {
          this.loading = false
        }))
    },
    methods: {
      show_details(project) {
        this.selected_view = project
        this.current_project_modal = true
      },
      project_name(project) {
        if (project.project)
          return `${project.project.TYPE}#${project.project.NUM}v.${project.project.VERSION}`;
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
      load_messages(x) {
        // console.log('x',x);
        this.get_messages(x.target.value)
      },
      get_messages(v) {
        axios.post(`cors/trail/${this.$route.params.id}`, {
            filter: v ?? null
          })
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