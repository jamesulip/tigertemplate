<template>
    <div>
        <div class="form-group">
            <dl class="row">
                <div class="col-md-6 border-right">
                    <dt class="col-sm-4">Date In:</dt>
                    <dd class="col-sm-8">{{projectDetails.project.created_at}}</dd>
                    <dt class="col-sm-4">Due Date/Time:</dt>
                    <dd class="col-sm-8">{{projectDetails.details.s_duedate || 'N/A'}}</dd>
                    <dt class="col-sm-4">Account Exec:</dt>
                    <dd class="col-sm-8 text-capitalize">{{projectDetails.project.sales_exec.fname.toLowerCase()}}</dd>
                    <dt class="col-sm-4">Project Name:</dt>
                    <dd class="col-sm-8 text-capitalize">{{projectDetails.details.s_projname.toLowerCase()}}</dd>
                    <dt class="col-sm-4">Client:</dt>
                    <dd class="col-sm-8 text-capitalize">{{projectDetails.details.client2.com_name.toLowerCase()}}</dd>
                    <div class="col-md-12 clearfix ">
                        <hr>
                    </div>
                    <dt class="col-sm-4">Media:</dt>
                    <dd class="col-sm-8 text-capitalize">{{projectDetails.details.s_media}}</dd>
                    <div class="col-md-12 clearfix ">
                        <hr>
                    </div>
                    <dt class="col-sm-4">Scope:</dt>
                    <dd class="col-sm-8 text-capitalize">
                        {{projectDetails.project.finishers[projectDetails.project.finishers.length-1].FINISHING}}</dd>
                    <div class="col-md-12 clearfix ">
                        <hr>
                    </div>
                </div>
                <div class="col-md-6">
                    <template v-for="(item, index) in projectDetails.project.finishers">
                        <div :key="index" class="col-md-12">
                            <dt class="col-sm-4">{{item.FINISHING}}</dt>
                            <dd class="col-sm-12 card card-body bg-light p-3">{{item.DETAILS || 'N/A'}}</dd>
                        </div>

                    </template>
                </div>

            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        props:['projectDetails'],
        data() {
            return {
                // projectDetails: this.$store.getters.getCurrentJob
            }
        },
    }
</script>