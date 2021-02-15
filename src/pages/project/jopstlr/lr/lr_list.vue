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
                        <th>Designer</th>
                        <th>Approved</th>
                        <th style="width:1%"></th>
                        <th style="width:1%"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lp in lr.data" :key="`key-${lp.ID}`">
                        <td>
                            <b-icon-check-circle></b-icon-check-circle>
                        </td>
                        <td>
                            <div class="d-flex">
                                <span>{{lp.project.TYPE}}#{{lp.project.NUM}}</span>
                                <span>{{lp.client2.com_name}}</span>
                            </div>
                        </td>
                        <td>
                            <b-avatar-group size="2rem">
                                <b-avatar></b-avatar>
                                <b-avatar></b-avatar>
                                <b-avatar></b-avatar>
                                <b-avatar></b-avatar>
                                <b-avatar></b-avatar>
                            </b-avatar-group>
                        </td>
                        <td>
                              <span
                                class="badge text-md">9/10</span>
                        </td>
                        <td>
                            <router-link :to="{name:'test'}"><svg style="width:25px" className="w-6 h-6" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                                    </svg></router-link>
                        </td>
                        <td>
                            <span
                                class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">9</span>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapMutations
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
            this.getLr(`cors/layout_proposal`)
        },

        methods: {
            ...mapMutations(['setLoading']),
            getLr(url) {

                this.loading = true
                if (url == 'refresh')
                    url = this.current_url
                else if (url == 'search')
                    url = this.page.path


                this.current_url = url


                axios.post(url, {
                        search: this.search
                    })

                    .then(res => {
                        this.lr = res.data
                        this.loading = false
                    })
                    .catch(err => {
                        this.loading = false
                    })
            }
        },
    }
</script>