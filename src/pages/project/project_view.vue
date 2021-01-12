<template>
   <div class="container-fluid pt-3">
     

      <div class="row">
         <div class="col-12">
            <div class="card">
               <div class="card-body p-0">
                  <table class="table" style="">
                     <tbody>
                        <tr>
                           <td class="p-1">
                              <div class="p-0" style="">
                                 <table class="table table-sm table-hover b-table b-table-fixed">
                                    <thead>
                                       <th style="width:50px"></th>
                                       <th style="width:200px">Number</th>
                                       <th class="text-truncate">Project Name</th>
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
                              <td>
                                 <i class="fas fa-caret-right fa-fw"></i>
                                 {{j.name}}
                              </td>
                           </tr>
                           <tr class="expandable-body" :key="`${j.id}-x`">
                              <td>
                                 <div class="p-0" style="">
                                    <table class="table table-md table-hover b-table b-table-fixed">
                                       <tbody>

                                        
                                          <tr v-for="(oj,i) in j.projects" :key="`${oj.ID}-pr`">
                                             
                                             <td :rowspan="j.projects.length" style="width:50px" v-if="i==0"></td>
                                             
                                             <td style="width:200px">{{oj.TYPE}}#{{oj.NUM}} <template v-if="oj.VERSION > 0">
                                                   V.{{oj.VERSION}}</template></td>
                                             <td>
                                                <div class="d-flex flex-column text-truncate">
                                                   <span>{{oj.detail2.s_projname}}</span>
                                                   <div class="d-flex align-items-center">
                                                      <b-icon-building></b-icon-building>

                                                      <router-link :to="{name:'client_view',params:{id:oj.detail2.client2.ID}}" class="text-link">{{oj.detail2.client2.com_name}}</router-link>
                                                   </div>
                                                </div>
                                             </td>
                                             <td class="text-truncate" style="width:150px"><b-icon-file-earmark></b-icon-file-earmark> {{oj.detail2.s_media}}</td>
                                             <td  style="width:130px"><status_indicator v-model="oj.STATUS" pill/></td>
                                             <td  style="width:130px"><status_indicator v-model="oj.STATUS" pill/></td>
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
   import {statusColor} from '../../js/helper.js'
   export default {
      data() {
         return {
            jobs: []
         }
      },
      mounted() {
         this.loadJobs()
      },
      computed:{
         test(){
            
         }
      },
      methods: {
         sort_number(objs){
            try{
               return objs.sort(function(a, b) {
                  return parseFloat(a.NUM) - parseFloat(b.NUM) || a.VERSION - b.VERSION;
               });
            }
            catch(x){
               return []
            }
         },
         statusColor(s){
           return statusColor(s)
         },
         loadJobs() {
            axios.get(`cors/view_project_grouping/${this.$route.params.id}`)
               .then(res => {
                  // console.log(res)
                  this.jobs = res.data.map(x=>{
                     return {
                        ...x,
                        projects:this.sort_number(x.projects)
                     }
                  })
               })
               .catch(err => {
                  console.error(err);
               })
         }
      },
   }
</script>