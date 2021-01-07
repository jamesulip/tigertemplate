<template>
  <div class="row">
    <div class="col-md-12">
    <div class="card">
      <div class="card-title">

      </div>
      <div class="card-body p-0">
        <table class="table table-hover table-valign-middle">
          <thead>
            <tr>
              <th colspan="2">Project Name</th>
              <th>Version</th>
              <th>Project Name</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pro in value" :key="pro.ID">
              <td colspan="2">
                <div class="d-flex align-center">
                  <div class="d-flex flex-column">
                    <span><a class="text-link">{{pro.project.TYPE}}# {{pro.project.NUM}}</a></span>
                    <span>{{pro.client2.com_name}}-{{pro.s_projname}}</span>
                  </div>
                  <div class="d-flex align-items-center px-3">
                   <span v-if="pro.project.VERSION > 0"> {{pro.project.VERSION}}</span>
                  </div>
                </div>
              </td>
              <td>
                
              </td>
              <td><span class="badge badge-success">Done</span></td>
              <td>
                {{pro.project.created_at | formatDate('L')}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
  export default {
    props: {
      value: {
        type: Array
      }
    },
    filters:{
      formatDate(val,format){
        return moment(val).fromNow()
      }
    }
  }
</script>