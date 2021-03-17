<template>
   <div class="container-fluid pt-3">

      <section class="content-header py-1" v-if="project_details.client">
       
         <div class="flex-1 min-w-0">
            <div class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl  sm:truncate flex items-center">
               <router-link :to="{name:'projects'}" class="pr-2">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd" /></svg>
               </router-link>
               <span>{{project_details.ProjectName || 'Loading'}}</span>
            </div>
            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
               <div class="mt-2 flex items-center text-sm text-gray-500">
                 <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>
                   <router-link
                                                         :to="{name:'client_view',params:{id:project_details.client.ID}}"
                                                         class="text-link">{{project_details.client.com_name}}</router-link>
               </div>
               <div class="mt-2 flex items-center text-sm text-gray-500">
                  <!-- Heroicon name: solid/calendar -->
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                     <path fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd" />
                  </svg>
                  {{project_details.created_at |formatDate('LLL')}}
               </div>
            </div>
         </div>
      </section>

      <section class="content-header row">
         <b-button-toolbar>
            <b-button-group class="mr-1">
               <b-dropdown id="dropdown-left" text="Add New" toggle-class="no-underline bg-yellow-400 active:bg-yellow-500 hover:bg-yellow-500 border-0 text-gray-900 hover:text-gray-900 font-medium " no-caret variant="link" class="">
                  <jo_add v-if="get_projecttypes.length" @added="X=>{load_project();loadJobs()}">
                     <b-icon-plus-circle /> Add Job Order
                  </jo_add>
                  <psr_add v-if="get_projecttypes.length" @added="X=>{load_project();loadJobs()}">
                     <b-icon-plus-circle /> Add PSR
                  </psr_add>
                  <li role="presentation">
                     <router-link :to="{name:'lr-create',params:{lrid:$route.params.id}}" role="button"
                        class="dropdown-item">
                        <slot>
                           Request Layout Proposal
                        </slot>

                     </router-link>
                  </li>
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



      <div class="mb-96">
         <div class="bg-white w-full  shadow-sm mb-3" v-for="(j,x) in jobs" :key="`s-${x}`">
            <div class="w-full px-2 py-2 border-b">
               <i class="fa fa-caret-down ml-2" aria-hidden="true"></i>
               <span class="font-semibold ml-3">{{j.name}}</span>
               <span class="font-medium  text-gray-400">({{j.projects.length}})</span>
               <div class="inline-block">
                  <b-dropdown id="dropdown-left" text="Add New" variant="link" toggle-class="no-underline text-gray-500 p-0 text-blue-500 hover:text-blue-700" style="box-shadow:none" no-caret>
                     <template #button-content>
                        <svg class="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                     </template>
                     <jo_add :ShopVoxID="j.id" v-if="get_projecttypes.length" @added="X=>{load_project();loadJobs()}">
                        <b-icon-plus-circle /> Add Job Order
                     </jo_add>
                     <psr_add :ShopVoxID="j.id" v-if="get_projecttypes.length" @added="X=>{load_project();loadJobs()}">
                        <b-icon-plus-circle /> Add PSR
                     </psr_add>
                     <li role="presentation">
                        <router-link :to="{name:'lr-create',params:{lrid:$route.params.id}}" role="button"
                           class="dropdown-item">
                           <slot>
                              Request Layout Proposal
                           </slot>

                        </router-link>
                     </li>
                  </b-dropdown>
                  <send_project variant="link" class="transform rotate-45 " size="size" :projects="j.projects" v-b-tooltip.hover.bottom="'Sent to trail'">
                     <template #button>
                        <svg class="w-4 h-4 text-blue-500 hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                     </template>
                  </send_project>
               </div>
               
            </div>
            <div class="w-full">
               <table class="table-fixed w-full  border-gray-200">

                  <draggable :list=" j.projects" tag="tbody" group="people" @change="change_group($event,j.id)"
                     handle=".handle">
                     <tr v-for="(oj,i) in j.projects" :key="`pr-${i}`"
                        class="border-b border-gray-200 hover:bg-gray-200 group ">
                        <td class="w-7 border-l-4 h-full" :class="oj.TYPE | TYPE">

                           <div class="flex flex-row handle ">
                              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                 <path
                                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                              <svg class="w-6 h-6 -ml-3" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                 <path
                                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                           </div>
                        </td>
                        <td class="p-2 font-semibold text-gray-500 w-36">
                           <span class="pr-2">{{oj.TYPE}}#{{oj.NUM}}</span>
                        </td>
                        <td class="p-2 w-14">
                           <div class="flex flex-row items-center">
                              <span class="text-xs bg-red-100 py-0 px-1 rounded-md text-gray-400"
                                 v-if="oj.VERSION>-1">{{oj.VERSION}}</span>
                           </div>
                        </td>
                        <td class="p-2 w-8">
                           <router-link v-b-tooltip.hover.bottom="oj.trail" v-if="oj.trailid"
                              :to="{name:'view_trail',params:{id:oj.trailid}}" class="flex flex-row items-center">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                                 </svg>
                           </router-link>
                        </td>
                       <td colspan="3"></td>
                        <td class="p-2">
                           <div class="flex flex-row items-center" v-if="oj.detail2.s_media">
                              <svg class="flex-shrink-0  w-6 h-6 mr-1" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                              <span class="text-xs truncate"> {{oj.detail2.s_media}}</span>
                           </div>
                        </td>
                        <td class="px-2 py-0">
                           <div class="flex justify-between truncate">
                              <div class="flex flex-row items-center"
                                 v-if="finisher(oj.finishers,'PRINTING','machine')">
                                 <svg class="flex-shrink-0  w-5 h-5 mr-1" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                       d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                 </svg>
                                 <span class="text-xs truncate">{{finisher(oj.finishers,'PRINTING','machine')}}</span>
                              </div>
                              <div class="flex flex-row items-center" v-if="finisher(oj.finishers,'CUTTING','machine')">
                                 <svg class="flex-shrink-0  w-5 h-5 mr-1" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                       d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                 </svg>
                                 <span class="text-xs truncate">{{finisher(oj.finishers,'CUTTING','machine')}}</span>
                              </div>
                           </div>
                        </td>
                         <td class="p-2">
                           <div class="text-xs px-1 text-center max-w-max py-0 bg-yellow-300 rounded-sm">{{oj.items.length}} items</div>
                        </td>
                        <td class="px-2 py-0 w-24" >
                           <div class="border-md max-w-max text-xs rounded-lg px-2 py-1 truncate"
                              :class="oj.STATUS | status_col">
                              <b-icon-circle-fill class=" inline-block mr-1" />
                              <span
                                 class="font-bold inline-block capitalize">{{(oj.STATUS || 'Pending').toLowerCase()}}</span>
                           </div>
                        </td>
                        <td class="p-2 w-12">
                           <div class="relative float-right">
                              <button @click="w=>{oj.showOp=!oj.showOp;$forceUpdate()}"
                                 class="relative z-10 block p-2 bg-white rounded-md dark:bg-gray-800 focus:outline-none">
                                 <svg class="w-5 h-5 text-gray-800 dark:text-white font-semibold" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                       d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                 </svg>
                              </button>
                              <div v-if="oj.showOp"
                                 class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
                                 <edit_psr class="list-none" @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">

                                    <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20"
                                       xmlns="http://www.w3.org/2000/svg">
                                       <path
                                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    <span class=" inline-block">Edit</span>

                                 </edit_psr>
                                 <revise_psr class="list-none" @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">

                                    <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20"
                                       xmlns="http://www.w3.org/2000/svg">
                                       <path fillRule="evenodd"
                                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                          clipRule="evenodd" /></svg>
                                    <span class=" inline-block">Revise</span>

                                 </revise_psr>
                                 <revise_psr class="list-none" @edited="edited()" :id="oj" v-if="oj.TYPE =='LR'">

                                    <i class="fas fa-edit"></i>
                                    Revise

                                 </revise_psr>
                                 <edit_jo class="list-none" @edited="edited()" :id="oj" v-if="oj.TYPE =='JO'">

                                    <i class="fas fa-edit"></i>
                                    Edit JO

                                 </edit_jo>


                                 <confirm_delete class="list-none" @deleted="$delete(j.projects,i)" ref="comfirm_delete"
                                    :project="oj" />
                              </div>
                           </div>

                        </td>
                     </tr>
                  </draggable>
               </table>
            </div>
         </div>
      </div>


   <!--

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
                                       <th style="width:200px">Version</th>
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
                                 <b-collapse visible :id="`collapse-${j.id}`" class="p-0">
                                    <table class="table table-sm table-hover b-table table-bordered">
                                       <draggable :list=" j.projects" tag="tbody" group="people"
                                          @change="change_group($event,j.id)" handle=".handle">

                                          <tr v-for="(oj,i) in j.projects" :key="`${oj.ID}-pr`">

                                             <td style="width:250px;vertical-align: middle;">
                                                <i class="fa fa-align-justify handle" role="button"></i>
                                                {{oj.TYPE}}#{{oj.NUM}}

                                                <i v-b-tooltip.hover title="Sent to trail"
                                                   class="fa fa-check float-right text-primary pt-1 pr-2"
                                                   v-if="oj.trailid" aria-hidden="true"></i>

                                             </td>
                                             <td>
                                                <template v-if="oj.VERSION > 0">
                                                   V.{{oj.VERSION}}</template>
                                             </td>
                                             <td>
                                                <div class="d-flex flex-column text-truncate">
                                                   <span
                                                      class="font-semibold text-gray-500">{{oj.detail2.s_projname}}</span>
                                                   <div class="d-flex align-items-center">
                                                      <b-icon-building class="mr-2"></b-icon-building>

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
                                             <td class="align-middle w-20">
                                                <div class="border-md max-w-max text-sm px-2 rounded-lg"
                                                   :class="oj.STATUS | status_col">
                                                   <b-icon-circle-fill class=" mr-2 inline-block" />
                                                   <span
                                                      class="font-bold inline-block uppercase">{{(oj.STATUS || 'Pending').toLowerCase()}}</span>
                                                </div>
                                             </td>
                                             <td style="width:50px">

                                                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret
                                                   dropleft>
                                                   <template #button-content>
                                                      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                   </template>

                                                   <edit_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">
                                                      <div>
                                                         <svg class="w-6 h-6 inline-block mr-2" fill="currentColor"
                                                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                               d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                         </svg>
                                                         <span class=" inline-block">Edit</span>
                                                      </div>
                                                   </edit_psr>
                                                   <b-dropdown-divider></b-dropdown-divider>
                                                   <revise_psr @edited="edited()" :id="oj" v-if="oj.TYPE =='PSR'">
                                                      <div>
                                                         <svg class="w-6 h-6 inline-block mr-2" fill="currentColor"
                                                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd"
                                                               d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                                               clipRule="evenodd" /></svg>
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
                                       </draggable>
                                    </table>
                                 </b-collapse>
                              </td>
                           </tr>
                        </template>





                     </tbody>
                  </table>
                  <b-skeleton-table v-if="loading_table" :rows="5" :columns="4"
                     :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
               </div>
            
            </div>
          
         </div>
      </div> -->
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
         finisher(fin, f, col) {
            return fin.find(x => x.FINISHING == f) ?.[col]
         },
         edited() {
            this.$bvToast.toast('Project Successfully Updated', {
               title: `Success`,
               variant: 'success',
               solid: true
            })
            this.loadJobs()
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