<template>
  <div>
      <router-link class="no-underline side-button w-full flex justify-between" href="#"
          :to="{name:'trail'}" :class="{'bg-yellow-400':$route.name=='trail'}">
          <div class="flex">
            <svg style="width:25px" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span class="mx-2  font-medium">Trail</span>
          </div>
          <span class="badge badge-danger float-right">
            100
          </span>

      </router-link>

      <router-link class="no-underline side-button w-full flex justify-between" href="#"
          :to="{name:'projects'}" :class="{'bg-yellow-400':$route.name=='projects'}">
          <div class="flex flex-row">
          <svg style="width:25px" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span class="mx-2  font-medium">Project</span>
          </div>
           <project_add @project_added="x=>{$router.push({name:'name',params:{id:x.ID}})}" size="w-8 h-8"/>
      </router-link>

        <router-link class="no-underline side-button  w-full flex justify-between" href="#"
          :to="{name:'clients'}" :class="{'bg-yellow-400':$route.name=='clients'}">
          

           <div class="flex flex-row">
          <svg style="width:25px" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span class="mx-2  font-medium">Clients</span>
          </div>
           <client_add :side="true" size="w-8 h-8"/>


      </router-link>

        <router-link class="no-underline side-button w-full flex " href="#"
          :to="{name:'lr'}" :class="{'bg-yellow-400':$route.name=='lr'}">
           
          <div class="flex">
            <svg style="width:25px" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          <span class="mx-2  font-medium"> Layout Proposal</span>

          </div>
          <span class="badge badge-danger float-right">
            100
          </span>

      </router-link>
  </div>
</template>
<script>
import project_add from '../../pages/project/project_add'
import client_add from '../../pages/clients/client_add'
export default {
  components:{
    project_add,client_add
  }
}
</script>