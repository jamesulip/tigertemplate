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
         <b-button-toolbar>
            <b-button-group class="mr-1">
               <b-dropdown id="dropdown-left" text="Add New" variant="primary" class="">
                  <jo_add v-if="get_projecttypes.length" @added="X=>{load_project();loadJobs()}">
                     <b-icon-plus-circle /> Add Job Order
                  </jo_add>
                  <psr_add v-if="get_projecttypes.length" @added="X=>{load_project();loadJobs()}">
                     <b-icon-plus-circle /> Add PSR
                  </psr_add>
                  <li role="presentation">
                     <router-link :to="{name:'lr-create',params:{lrid:$route.params.id}}" role="button" class="dropdown-item">
                        <slot>
                           Request Layout Proposal
                        </slot>

                     </router-link>
                  </li>
                  <!-- <lr_add v-if="get_projecttypes.length">
                     <b-icon-plus-circle />  Request Layout Proposal
                  </lr_add> -->
               </b-dropdown>
            </b-button-group>
            <b-button-group class="mr-1">
               <b-button @click="create_group=true">
                  <i class="fas fa-folder-plus    "></i> Create Group
               </b-button>
            </b-button-group>

            <b-button-group class="mr-1">
               <send_project :projects="project_details.project" />
            </b-button-group>

         </b-button-toolbar>
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
                  <table class="table" style="" v-if="!loading_table">
                     <tbody>
                        <tr>
                           <td class="p-0">
                              <div class="p-0" style="">
                                 <table class="table table-sm table-hover b-table b-table-fixed m-0">
                                    <thead>
                                       <th style="width:50px"></th>
                                       <th style="width:200px">Number</th>
                                       <th class="text-truncate">Job Name</th>
                                       <th class="text-truncate" style="width:150px">Media</th>
                                       <th style="width:130px">Status</th>
                                       <th style="width:50px"> </th>
                                    </thead>
                                 </table>
                              </div>
                           </td>
                        </tr>
                        <template v-for="(j) in jobs">
                           <tr :key="`${j.id}-s`">
                              <td class="bg-light">
                                 <div class="row">
                                    <div class="col-md-6">
                                       <i class="fas fa-caret-right fa-fw" v-b-toggle="`collapse-${j.id}`"></i>
                                       {{j.name}}
                                       <send_project variant="link" size="size" :projects="j.projects" />
                                    </div>
                                    <div class="col-md-6">
                                       <div class="float-right">
                                          <b-dropdown size="sm" v-if="j.id" text="Small" variant="link" class="m-0"
                                             dropleft toggle-class="text-decoration-none" no-caret>
                                             <template #button-content>
                                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                             </template>
                                             <b-dropdown-item-button><i class="fas fa-edit    "></i> Edit Name
                                             </b-dropdown-item-button>
                                             <b-dropdown-divider></b-dropdown-divider>
                                             <b-dropdown-item-button @click="delete_group(j)"><i class="fa fa-trash"
                                                   aria-hidden="true"></i> Delete</b-dropdown-item-button>
                                          </b-dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                           <tr class="expandable-body" :key="`${j.id}-x`">
                              <td>
                                 <!-- <div class="p-0" style=""> -->
                                 <b-collapse visible :id="`collapse-${j.id}`" class="p-0">
                                    <table class="table table-sm table-hover b-table table-bordered">
                                       <draggable :list=" j.projects" tag="tbody" group="people"
                                          @change="change_group($event,j.id)" handle=".handle">

                                          <tr v-for="(oj,i) in j.projects" :key="`${oj.ID}-pr`">

                                             <!-- <td :rowspan="j.projects.length" style="width:50px" v-if="i==0"></td> -->

                                             <td style="width:250px;vertical-align: middle;">
                                                <i class="fa fa-align-justify handle" role="button"></i>
                                                {{oj.TYPE}}#{{oj.NUM}} <template v-if="oj.VERSION > 0">
                                                   V.{{oj.VERSION}}</template>

                                                <i  v-b-tooltip.hover title="Sent to trail" class="fa fa-check float-right text-primary pt-1 pr-2" v-if="oj.trailid"
                                                   aria-hidden="true"></i>

                                             </td>
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
                                             <td class="text-truncate align-middle" style="width:150px">
                                                <div v-if="oj.detail2.s_media" class="mx-auto">
                                                   <b-icon-file-earmark></b-icon-file-earmark> {{oj.detail2.s_media}}
                                                </div>
                                                <div v-else>
                                                   N/A
                                                </div>
                                             </td>
                                             <td   class="align-middle w-20">
                                                <!-- <status_indicator v-model="oj.STATUS" pill /> -->
                                                <div class="border-md max-w-max text-sm px-2 rounded-lg" :class="oj.STATUS | status_col">
                                                   <b-icon-circle-fill class=" mr-2 inline-block"/>
                                                   <span class="font-bold inline-block uppercase">{{(oj.STATUS || 'Pending').toLowerCase()}}</span>
                                                </div>
                                             </td>
                                             <!-- <td>
                                                <edit_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">
                                                      <div>
                                                         <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                         <span class=" inline-block">Edit</span>
                                                      </div>
                                                   </edit_psr>
                                                    <revise_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">
                                                      <div>
                                                       
                                                         <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                                                         <span class=" inline-block">Revise</span>
                                                      </div>
                                                   </revise_psr>
                                                    <revise_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='LR'">
                                                      <div>
                                                         <i class="fas fa-edit"></i>
                                                         Revise
                                                      </div>
                                                   </revise_psr>
                                                   <edit_jo @edited="edited()" :id="oj" v-if="oj.TYPE =='JO'">
                                                      <div>
                                                         <i class="fas fa-edit"></i>
                                                         Edit JO
                                                      </div>
                                                   </edit_jo>
                                                   <confirm_delete @deleted="$delete(j.projects,i)" ref="comfirm_delete" :project="oj" />
                                             </td> -->
                                             <td style="width:50px">

                                                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret
                                                   dropleft>
                                                   <template #button-content>
                                                      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                   </template>

                                                   <edit_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">
                                                      <div>
                                                         <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                         <span class=" inline-block">Edit</span>
                                                      </div>
                                                   </edit_psr>
                                                    <b-dropdown-divider></b-dropdown-divider>
                                                    <revise_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">
                                                      <div>
                                                         <!-- <i class="fas fa-edit"></i>
                                                          -->
                                                         <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                                                         <span class=" inline-block">Revise</span>
                                                      </div>
                                                   </revise_psr>
                                                    <revise_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='LR'">
                                                      <div>
                                                         <i class="fas fa-edit"></i>
                                                         Revise
                                                      </div>
                                                   </revise_psr>
                                                   <edit_jo @edited="edited()" :id="oj" v-if="oj.TYPE =='JO'">
                                                      <div>
                                                         <i class="fas fa-edit"></i>
                                                         Edit JO
                                                      </div>
                                                   </edit_jo>

                                                   <b-dropdown-divider></b-dropdown-divider>

                                                   <confirm_delete @deleted="$delete(j.projects,i)" ref="comfirm_delete"
                                                      :project="oj" />

                                                </b-dropdown>


                                             </td>
                                          </tr>
                                          <tr v-if="!Boolean(j.projects.length)">
                                             <td colspan="6">No Project</td>
                                          </tr>
                                          <!-- </tbody> -->
                                       </draggable>
                                    </table>
                                    <!-- </div> -->
                                 </b-collapse>
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
      <b-modal size="sm" title="Create Group" v-model="create_group" @ok="create_new_project">
         <b-form-group id="input-group-1" label="Group Name:" label-for="input-1"
            description="Create grouping for projects.">
            <b-form-input id="input-1" v-model="new_group.name" type="email" placeholder="Enter Group Name" required>
            </b-form-input>
         </b-form-group>
      </b-modal>
   </div>
</template>
<script>
   /*eslint-disable*/
   import jo_add from './jopstlr/jo/project_jo_add.vue'
   import psr_add from './jopstlr/psr/project_psr_add.vue'
   import lr_add from './jopstlr/lr/add_lr.vue'
   import {
      statusColor
   } from '../../js/helper.js'
   import draggable from "vuedraggable";
   import {
      mapActions,
      mapGetters,
      mapMutations
   } from 'vuex';
   export default {
      components: {
         jo_add,
         psr_add,
         lr_add,
         draggable
      },
      data() {
         return {
            content: '',
            jobs: [],
            project_details: {},
            loading_table: true,
            add_job: false,
            create_group: false,
            new_group: {
               name: '',
               parent_id: this.$route.params.id
            }
         }
      },
      mounted() {

         this.loadJobs()
         this.load_project()
         if (!this.get_projecttypes.length) {
            this.set_projecttypes_s()
            this.set_productstep()
            this.set_productiontypes()
            this.set_machines()
         }

      },
      computed: {
         ...mapGetters([
            'get_projecttypes', 'get_projecttypes'
         ])
      },
      methods: {
         ...mapActions([
            'set_productstep', 'set_projecttypes_s', 'set_productiontypes', 'set_machines'
         ]),
         ...mapMutations([
            'set_projects'
         ]),
         edited() {
            this.$bvToast.toast('Project Successfully Updated', {
               title: `Success`,
               variant: 'success',
               solid: true
            })
         },
         change_group(s, id) {
            if (s.added) {
               console.log(id, s.added)
               axios.patch(`cors/projects/${s.added.element.ID}`, {
                     ShopVoxID: id
                  })
                  .then(res => {
                     console.log(res)
                  })
                  .catch(err => {
                     console.error(err);
                  })
            }
         },
         delete_group(o) {
            console.log(o)
            this.$bvModal.msgBoxConfirm('All projects in this group will be moved to `No Project`.', {
                  title: 'Please Confirm',
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'danger',
                  okTitle: 'YES',
                  cancelTitle: 'NO',
                  footerClass: 'p-2',
                  hideHeaderClose: false,
                  centered: true
               })
               .then(value => {
                  if (value) {
                     axios.delete(`cors/projectGroups/${o.id}`)
                        .then(res => {
                           // console.log(res)
                           this.loadJobs()
                        })

                  }
               })
               .catch(err => {
                  // An error occurred
               })
         },
         create_new_project(modal) {
            modal.preventDefault();
            axios.post(`cors/projectGroups`, this.new_group)
               .then(res => {
                  this.loadJobs()
                  this.create_group = false
               })
               .catch(err => {
                  console.error(err);
               })
         },
         async delete_job() {
            await this.$refs['comfirm_delete'].show_modal()

         },
         load_project() {
            axios.get(`cors/wholeprojects/${this.$route.params.id}`).then(x => {
               this.project_details = x.data
               this.set_projects(x.data)
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

<style lang="scss">
   .not-collapsed {
      transform: rotate(90deg);
   }

   i.fas {
      transition: transform .3s linear;
   }
</style>