<template>
    <div class="container-md pt-4">
        <div class="pb-3">
            <router-link :to="{name:'lr'}" class="text-2xl">
                <b-icon-arrow-left/> Back
            </router-link>
        </div>
        <table class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Status</th>
                        <th>Updated Date</th>
                        <th>Version</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr role="button" @click="$router.push({name:'view_porposed',params:{file:sp.id}})" v-for="sp in sent_proposal" :key="`sp-${sp.id}`">
                        <td style="width:1%;" class="px-3">
                              <i class="far fa-file-pdf m-auto text-xl text-gray-300"></i>
                        </td>
                        <td class="text-truncate">
                            <div class="w-48">
                                <span>{{sp.files.filename}}</span>
                            </div>
                        </td>
                        <td><span class="badge py-1 px-2 badge-success">{{sp.Status || 'Pending'}}</span></td>
                        <td>{{sp.created_at | formatDate('L')}}</td>
                        <td>{{sp.files.file_info.version}}</td>
                        <td>{{sp.files.file_info.option}}</td>
                    </tr>
                </tbody>
            </table>            
    </div>
</template>
<script>
export default {
    data() {
        return {
            sent_proposal:[]
        }
    },
    mounted() {
        axios.post(`/cors/layout_proposal/${this.$route.params.id}/files`)
        .then(res => {
            // console.log(res)
            this.sent_proposal =res.data
        })
        .catch(err => {
            console.error(err); 
        })
    },
}
</script>