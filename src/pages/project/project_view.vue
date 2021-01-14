<template>
   <div class="container-fluid pt-3">

      <section class="content-header px-0">
         <div class="container-fluid">
            <div class="row mt-0">
               <div class="col-sm-12 p-0 back-button">
                  <b-button @click="$router.push({name:'projects'})" pill variant="link" class="btn-flat" size="md">
                     <b-icon-arrow-left></b-icon-arrow-left>
                  </b-button>
                  <h1>{{project_details.ProjectName || 'Loading'}}</h1>
               </div>
            </div>
         </div>
      </section>

      <section class="content-header row">

         <b-dropdown id="dropdown-left" text="Add New" variant="primary" class="">
            <jo_add v-if="$store.getters.get_projecttypes.length">
               <b-icon-plus-circle/> Add Job Order
            </jo_add>
            <b-dropdown-item href="#">
               Add PSR
            </b-dropdown-item>
            <b-dropdown-item href="#">Add Layout Proposal</b-dropdown-item>
         </b-dropdown>


      </section>


      <b-modal v-model="add_job" title="BootstrapVue">
         <p class="my-4">Hello from modal!</p>
      </b-modal>

      <div class="row">
         <div class="col-12">
            <div class="card">
               <div class="card-header">
                  <h5 class="card-title">Jobs List</h5>
               </div>
               <div class="card-body p-0">
                  <table class="table" style="">
                     <tbody>
                        <tr>
                           <td class="p-0">
                              <div class="p-0" style="">
                                 <table class="table table-sm table-hover b-table b-table-fixed">
                                    <thead>
                                       <th style="width:50px"></th>
                                       <th style="width:200px">Number</th>
                                       <th class="text-truncate">Job Name</th>
                                       <th class="text-truncate" style="width:150px">Media</th>
                                       <th style="width:130px">Status</th>
                                       <th style="width:130px">Action </th>
                                    </thead>
                                 </table>
                              </div>
                           </td>
                        </tr>
                        <template v-for="(j) in jobs">
                           <tr data-widget="expandable-table" aria-expanded="true" :key="`${j.id}-s`">
                              <td class="bg-gray">
                                 <i class="fas fa-caret-right fa-fw"></i>
                                 {{j.name}}
                              </td>
                           </tr>
                           <tr class="expandable-body" :key="`${j.id}-x`">
                              <td>
                                 <div class="p-0" style="">
                                    <table class="table table-sm table-hover b-table b-table-fixed">
                                       <tbody>


                                          <tr v-for="(oj,i) in j.projects" :key="`${oj.ID}-pr`">

                                             <td :rowspan="j.projects.length" style="width:50px" v-if="i==0"></td>

                                             <td style="width:200px">{{oj.TYPE}}#{{oj.NUM}} <template
                                                   v-if="oj.VERSION > 0">
                                                   V.{{oj.VERSION}}</template></td>
                                             <td>
                                                <div class="d-flex flex-column text-truncate">
                                                   <span>{{oj.detail2.s_projname}}</span>
                                                   <div class="d-flex align-items-center">
                                                      <b-icon-building></b-icon-building>

                                                      <router-link
                                                         :to="{name:'client_view',params:{id:oj.detail2.client2.ID}}"
                                                         class="text-link">{{oj.detail2.client2.com_name}}</router-link>
                                                   </div>
                                                </div>
                                             </td>
                                             <td class="text-truncate" style="width:150px">
                                                <b-icon-file-earmark></b-icon-file-earmark> {{oj.detail2.s_media}}
                                             </td>
                                             <td style="width:130px">
                                                <status_indicator v-model="oj.STATUS" pill />
                                             </td>
                                             <td style="width:130px">
                                                <status_indicator v-model="oj.STATUS" pill />
                                             </td>
                                          </tr>
                                          <tr v-if="!Boolean(j.projects.length)">
                                             <td colspan="6">No Project</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </td>
                           </tr>
                        </template>





                     </tbody>
                  </table>
                  <b-skeleton-table v-if="loading_table" :rows="5" :columns="4"
                     :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
               </div>
               <!-- /.card-body -->
            </div>
            <!-- /.card -->
         </div>
      </div>
   </div>
</template>
<script>
   /*eslint-disable*/
   import jo_add from './jopstlr/jo/project_jo_add.vue'
   import {
      statusColor
   } from '../../js/helper.js'
   export default {
      components:{
         jo_add
      },
      data() {
         return {
            jobs: [],
            project_details: {},
            loading_table: true,
            add_job: false
         }
      },
      mounted() {

         this.loadJobs()
         this.load_project()
           if(!this.$store.getters.get_projecttypes.length){
              this.$store.dispatch('set_projecttypes_s')
              this.$store.dispatch('set_productstep')
              this.$store.dispatch('set_productiontypes')
              this.$store.dispatch('set_machines')
           }

      },
      computed: {
         test() {

         }
      },
      methods: {
         load_project() {
            axios.get(`cors/wholeprojects/${this.$route.params.id}`).then(x => {
               this.project_details = x.data
               this.$store.commit('set_projects',x.data)
            })
         },
         sort_number(objs) {
            try {
               return objs.sort(function (a, b) {
                  return parseFloat(a.NUM) - parseFloat(b.NUM) || a.VERSION - b.VERSION;
               });
            } catch (x) {
               return []
            }
         },
         statusColor(s) {
            return statusColor(s)
         },
         loadJobs() {
            this.loading_table = true
            axios.get(`cors/view_project_grouping/${this.$route.params.id}`)
               .then(res => {
                  // console.log(res)
                  this.jobs = res.data.map(x => {
                     return {
                        ...x,
                        projects: this.sort_number(x.projects)
                     }
                  })
                  this.loading_table = false
               })
               .catch(err => {
                  console.error(err);
               })
         }
      },
   }
</script>