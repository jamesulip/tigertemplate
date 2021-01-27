<template>
  <div class="row">
    
    <div class="col-md-12" v-if="value.JO">
      <h4 class="text-muted">LR</h4>
      <div class="card">
        <div class="card-body p-0">
          <table class="table table-hover table-valign-middle">
            <thead>
              <tr>
                <th colspan="2">Job Name</th>
                <th>Version</th>
                <th>Project Name</th>
                <th>Media</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pro in value.JO" :key="pro.ID">
                <td colspan="3">
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
               
                <td><span class="badge badge-success">Done</span></td>
                <td><span class="badge badge-success">{{pro.s_media}}</span></td>
                <td>
                  {{pro.project.created_at | formatDate('L')}}
                </td>
                <td>
                    <b-dropdown size="sm"  id="dropdown-1" text="Dropdown Button" class="m-md-2">
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
      <hr>
    </div>


   
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    props: {
      value: {

      }
    },
    
  }
</script>