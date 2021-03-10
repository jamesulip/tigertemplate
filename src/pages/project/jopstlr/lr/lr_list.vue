<template>
    <div class="container">
        <div class="pb-3  pt-5">
            <span class="h3 text-muted">Layout Proposal</span>
        </div>
        <div class="d-flex">
            <div class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Project Name</th>
                        <th>Version</th>
                        <th>Designer</th>
                        <th>Approved</th>
                        <th>Date Requested</th>
                        <th>Date Submitted</th>
                        <th>Files</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lp in lr_list.data" :key="`key-${lp.ID}`">
                        <td>
                            <b-icon-check-circle></b-icon-check-circle>
                        </td>
                        <td>
                            <div class="d-flex">
                                <span>{{lp.project.TYPE}}#{{lp.project.NUM}}</span>-<span>{{lp.client2.com_name}}</span>
                            </div>
                        </td>
                         
                        <td>
                            <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{{lp.project.VERSION}}</span>
                        </td>
                        <td>
                       
                            <b-avatar-group size="2rem">
                                <b-avatar></b-avatar>
                            </b-avatar-group>
                        </td>
                        <td></td>
                        
                        <td>
                            <span class="badge text-md">
                                {{lp.created_at}}
                                {{lp.dateCreated |formatDate('L')}}
                            </span>
                        </td>
                      
                        <td>
                             <router-link :to="{name:'lrViewer',params:{id:lp.ID}}">
                                <i class="far fa-folder-open    "></i>
                             </router-link>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
    </div>
</template>
<script>
    import {
      mapActions,
        mapGetters,
        mapMutations,
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                lr: [],
                search: null,
                current_url: '',
            }
        },
        mounted() {
            // this.getLr(`cors/layout_proposal`)
            this.set_lr(`cors/layout_proposal`)
        },
        computed: {
            ...mapState(['lr_list'])
        },
        methods: {
            ...mapActions(['set_lr']),
            ...mapMutations(['setLoading']),
           
        },
    }
</script>