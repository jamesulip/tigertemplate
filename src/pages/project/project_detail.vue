<template>
  <div>
    <b-overlay
      v-if="loading"
      variant="outline-danger"
      size="sm"
      show
      style="min-height:200px"
    >
    </b-overlay>
    <div class="form-group">
      <dl class="row" v-if="projectDetails">
        <div class="col-md-6 border-right">
          <dt class="col-sm-4">Date In:</dt>
          <dd class="col-sm-8">{{ projectDetails.project.created_at }}</dd>
          <dt class="col-sm-4">Due Date/Time:</dt>
          <dd class="col-sm-8">
            {{ projectDetails.details.s_duedate || "N/A" }}
          </dd>
          <dt class="col-sm-4">Account Exec:</dt>
          <dd class="col-sm-8 text-capitalize">
            {{ projectDetails.project.sales_exec.fname.toLowerCase() }}
          </dd>
          <dt class="col-sm-4">Project Name:</dt>
          <dd class="col-sm-8 text-capitalize">
            {{ projectDetails.details.s_projname.toLowerCase() }}
          </dd>
          <dt class="col-sm-4">Client:</dt>
          <dd class="col-sm-8 text-capitalize">
            {{ projectDetails.details.client2.com_name.toLowerCase() }}
          </dd>
          <div class="col-md-12 clearfix ">
            <hr />
          </div>
          <dt class="col-sm-4">Media:</dt>
          <dd class="col-sm-8 text-capitalize">
            {{ projectDetails.details.s_media }}
          </dd>
          <div class="col-md-12 clearfix ">
            <hr />
          </div>
          <dt class="col-sm-4">Scope:</dt>
          <dd
            class="col-sm-8 text-capitalize"
            v-if="Boolean(projectDetails.finishers)"
          >
            <span class="badge badge-info">{{
              projectDetails.finishers[projectDetails.finishers.length - 1]
                .FINISHING
            }}</span>
          </dd>
          <dd v-else>
            {{
              projectDetails.project.finishers[
                projectDetails.project.finishers.length - 1
              ].FINISHING
            }}
          </dd>
          <div class="col-md-12 clearfix ">
            <hr />
          </div>
        </div>
        <div class="col-md-6">
          <template
            v-for="(item, index) in projectDetails.project.finishers ||
              projectDetails.finishers"
          >
            <div :key="index" class="col-md-12">
              <dt class="col-sm-4">{{ item.FINISHING }}</dt>
              <dd class="col-sm-12 card card-body bg-light p-3">
                {{ item.DETAILS || "N/A" }}
              </dd>
            </div>
          </template>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
    export default {
        props:['project','load','project_id'],
        data() {
            return {
                projectDetails: null,
                loading:true
            }
        },
        mounted(){
            if(!this.load && this.project){
                this.projectDetails = this.project
                this.loading = false
}        },
        methods:{
            load_details(id){
                this.loading = true
                        axios.get(`cors/projectDetail/${this.project_id}`)
                        .then(res => {
                            this.projectDetails = res.data
                            this.loading = false
                        })
                        .catch(err => {
                            console.error(err); 
                        })
                    
            }
        }
    }
</script>