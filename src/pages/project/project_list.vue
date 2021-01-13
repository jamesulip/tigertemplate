<template>
   <div class="container-fluid">

      <section class="content-header">

         <div class="row mt-2">
            <div class="col-sm-6 p-0 back-button">
               <h1> Projects</h1>

             <project_add @project_added="search()"/>

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
                  <input type="search" v-model.lazy="search_q.searchq" @change="search()" class="form-control form-control-lg" placeholder="Search Project Name">
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
                  <tr v-for="(item, index) in projects.data" :key="index" > 
                     <td colspan="2">
                        <div class="d-flex flex-column">
                           <router-link :to="{name:'project_view',params:{id:item.ID}}" class="text-capitalize">{{item.ProjectName.toLowerCase()}}</router-link>

                           <div class="d-flex align-items-center">
                              <b-icon-building></b-icon-building>
                              <a class="text-link text-muted">{{item.client.com_name}}</a>
                           </div>


                        </div>
                     </td>
                     <!-- <td></td> -->
                     <td>
                        <div class="d-flex">
                           <!-- <div  class="badge mr-1 badge-success badge-pill">{{CountPro(item.project,'JO').length}}  JO</div>
                           <div  class="badge mr-1 badge-warning badge-pill">{{CountPro(item.project,'PSR').length}}  PSR</div>
                           <div  class="badge mr-1 badge-info badge-pill">{{CountPro(item.project,'LR').length}}  LR</div> -->
                            <div>
                            <b-avatar-group>
                             <b-avatar  variant="success" badge="JO" v-if="CountPro(item.project,'JO').length" :text="CountPro(item.project,'JO').length.toString()" size="60px"/>
                             <b-avatar  variant="warning" badge="PSR" v-if="CountPro(item.project,'PSR').length" :text="CountPro(item.project,'PSR').length.toString()" size="60px"/>
                             <b-avatar  variant="info" badge="LR" v-if="CountPro(item.project,'LR').length" :text="CountPro(item.project,'LR').length.toString()" size="60px"/>
                             </b-avatar-group>
                            </div>
                        </div>

                     </td>
                     <td>
                        <b-avatar v-for="i in removeDuplicate(item.project)" :key="i.ID" variant="primary" size="35px" :text="getInitial(i.sales_exec_auth.name)" class="mr-3"></b-avatar>
                     </td>
                     <td></td>
                     <td>{{formatDate(item.updated_at,'L')}}</td>
                     <td>
                        <b-dropdown left size="sm" id="dropdown-1" text="Dropdown Button" class="m-md-2">
                           <template #button-content>
                              <b-icon-gear></b-icon-gear>
                           </template>
                           <b-dropdown-item><b-icon-folder2-open></b-icon-folder2-open> Open</b-dropdown-item>
                           <b-dropdown-item><b-icon-pause></b-icon-pause> Hold</b-dropdown-item>
                           <b-dropdown-item><b-icon-x></b-icon-x> Cancel</b-dropdown-item>
                           <b-dropdown-divider></b-dropdown-divider>
                           <b-dropdown-item @click="delete_project(item)"><b-icon-trash></b-icon-trash> Delete</b-dropdown-item>
                        </b-dropdown>
                     </td>
                  </tr>
               </tbody>
               <tfoot v-if="projects.next_page_url">
                 <tr>
                     <td colspan="7" class="text-center">
                        <b-button variant="link" @click="loadNext()">Load More</b-button>
                     </td>
                  </tr>
               </tfoot>
            </table>
             <b-skeleton-table v-if="loading_table"
                  :rows="6"
                  :columns="4"
                  :table-props="{ bordered: true, striped: true }"
                  ></b-skeleton-table>
         </div>
      </div>

   </div>
</template>

<script>
   /*eslint-disable*/
   import project_add from './project_add'
   export default {
      data() {
         return {
            projects: {},
            search_q:{
               Client: null,
               SalesExec: this.$store.getters.current_employee_id,
               searchq: null,
               sort: null,
               count_page:50
            },
            loading_table:false
         }
      },
      components:{
         project_add
      },
      mounted() {
         if(!this.$store.getters.get_my_projects.current_page){
            this.search()
         }
         else{
            this.projects = this.$store.getters.get_my_projects
         }
      },
      methods: {
         delete_project(item){
               this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
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
                  // alert(value)
                  if(value){
                     axios.delete(`cors/wholeprojects/${item.ID}`)
                     .then(res => {
                        this.search()
                     })
                     .catch(err => {
                        console.error(err); 
                     })
                  }
               })
               .catch(err => {
                  // An error occurred
               })
         },
         removeDuplicate(arr){
            return arr.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
         },
         CountPro(i,y){
            return i.filter(x=>{
               return x.TYPE==y
            })
         },
         search(){
            this.loading_table = true
            axios.post(`cors/wholeprojectssearch`,
            this.search_q)
            .then(res => {
               this.projects = res.data
               this.$store.commit('set_my_projects',res.data)
               this.loading_table = false
            })
            .catch(err => {
               console.error(err);
            })
         },
         loadNext(){
            axios.post(this.projects.next_page_url,this.search_q)
            .then(res => {
               this.projects.data.push(...res.data.data)

               this.projects.next_page_url  = res.data.next_page_url
            })
            .catch(err => {
               console.error(err); 
            })
         }
      },
   }
</script>