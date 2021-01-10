<template>
   <div class="container-fluid">

      <section class="content-header">

         <div class="row mt-2">
            <div class="col-sm-6 p-0 back-button">
               <h1> Projects</h1>

               <b-button pill variant="secondary" class="btn-flat ml-3" size="sm">
                  <b-icon-plus></b-icon-plus>
               </b-button>
            </div>
            <div class="col-md-6">
               <div class="float-right">
                  <!-- <client_add /> -->
               </div>
            </div>
         </div>
      </section>

      <div class="row">
         <div class="col-md-8 offset-md-2 mb-3">
            
               <div class="input-group">
                  <input type="search" v-model.lazy="search_q.searchq" @change="search()" class="form-control form-control-lg" placeholder="Type your keywords here">
                  <div class="input-group-append">
                     <button @click="search()" type="submit" class="btn btn-lg btn-default">
                        <i class="fa fa-search"></i>
                     </button>
                  </div>
               </div>
           
         </div>
      </div>

      <div class="card">
         <div class="card-body p-0">
            <table class="table table-hover table-lg">
               <thead>
                  <tr>
                     <th>Project Name/Client</th>
                     <th></th>
                     <th>Jobs</th>
                     <th>Sales Team</th>
                     <th>Production Team</th>
                     <th>Date Created</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(item, index) in projects.data" :key="index">
                     <td colspan="2">
                        <div class="d-flex flex-column">
                           <span>{{item.ProjectName}}</span>

                           <div class="d-flex align-items-center">
                              <b-icon-building></b-icon-building>
                              <b-icon-building></b-icon-building>
                              <a class="text-link">{{item.client.com_name}}</a>
                           </div>


                        </div>
                     </td>
                     <!-- <td></td> -->
                     <td>
                        <div class="d-flex">
                           <!-- <div  class="badge mr-1 badge-success badge-pill">{{CountPro(item.project,'JO').length}}  JO</div>
                           <div  class="badge mr-1 badge-warning badge-pill">{{CountPro(item.project,'PSR').length}}  PSR</div>
                           <div  class="badge mr-1 badge-info badge-pill">{{CountPro(item.project,'LR').length}}  LR</div> -->
                            <b-avatar-group>
                             <b-avatar  variant="success" badge="JO" v-if="CountPro(item.project,'JO').length" :text="CountPro(item.project,'JO').length.toString()" size="60px"/>
                             <b-avatar  variant="warning" badge="PSR" v-if="CountPro(item.project,'PSR').length" :text="CountPro(item.project,'PSR').length.toString()" size="60px"/>
                             <b-avatar  variant="info" badge="LR" v-if="CountPro(item.project,'LR').length" :text="CountPro(item.project,'LR').length.toString()" size="60px"/>
                             </b-avatar-group>
                        </div>

                     </td>
                     <td>
                        <b-avatar v-for="i in removeDuplicate(item.project)" :key="i.ID" variant="primary" size="35px" :text="getInitial(i.sales_exec_auth.name)" class="mr-3"></b-avatar>
                     </td>
                     <td></td>
                     <td>{{formatDate(item.created_at,'L')}}</td>
                     <td>
                        <b-dropdown size="sm" id="dropdown-1" text="Dropdown Button" class="m-md-2">
                           <template #button-content>
                              <b-icon-gear></b-icon-gear>
                           </template>
                           <b-dropdown-item>Hold</b-dropdown-item>
                           <b-dropdown-item>Cancel</b-dropdown-item>
                           <b-dropdown-divider></b-dropdown-divider>
                           <b-dropdown-item disabled>Delete</b-dropdown-item>
                        </b-dropdown>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

   </div>
</template>

<script>
   /*eslint-disable*/
   export default {
      data() {
         return {
            projects: {},
            search_q:{
               Client: null,
               SalesExec: this.$store.getters.current_employee_id,
               searchq: null,
               sort: null,
            }
         }
      },
      mounted() {
         this.search()
      },
      methods: {
         removeDuplicate(arr){
            return arr.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
         },
         CountPro(i,y){
            return i.filter(x=>{
               return x.TYPE==y
            })
         },
         search(){
            axios.post(`cors/wholeprojectssearch`,
            this.search_q)
            .then(res => {
               // console.log(res)
               this.projects = res.data
            })
            .catch(err => {
               console.error(err);
            })
         }
      },
   }
</script>