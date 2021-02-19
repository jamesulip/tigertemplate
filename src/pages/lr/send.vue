<template>
    <div class="h-full">
        <div class="w-25 bg-gray-100 border-r height h-full">
            <ul class="">
                <li>
                    <ul v-for="p in proposal" :key="p.id" class="border">
                        asds
                        <template>
                            <li class="border" v-for="fi in p.files" :key="`f${fi.id}`" v-if=" p.files">
                                <div class="font-medium ">
                                    
                                </div>
                            </li>
                            <li >
                                No file
                            </li>
                        </template>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                proposal: []
            }
        },
        mounted() {
            axios.post(`/cors/layout_proposal/${this.$route.params.id}/files`)
                .then(res => {
                    // console.log(res)
                    this.proposal = res.data
                })
                .catch(err => {
                    console.error(err);
                })
        },
    }
</script>