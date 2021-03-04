<template>
    <div class="w-full h-full bg-gray-500">
        <div class="py-2 bg-white sticky top-0 z-10 shadow">
            <div class="flex justify-between col-md-12 py-1 my-auto" v-if="file_info.project">
                <div class="pl-4">
                    <span class="text-lg text-gray-400">
                        {{file_info.project.TYPE}}#{{file_info.project.NUM}}
                    </span>
                    <div>
                        <span class="text-md text-gray-400 py-2">
                            Version {{file_info.project.VERSION}}
                        </span>
                        <span pan class="text-nd text-gray-400 py-2">
                            Option {{file_info.project.VERSION}}
                        </span>
                    </div>

                </div>
                <div class="float-right pt-2">
                    <b-button variant="warning" href="" @click="show_comments=true">
                        
                        <svg class="w-6 h-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <b-badge class=" inline-block " variant="danger">9 <span class="sr-only">unread messages</span></b-badge>
                    </b-button>
                </div>


            </div>

        </div>
        <div class="container max-w-7xl ">


            <div class="mb-2" v-for="(i) in numPages.page_count" :key="i" v-observe-visibility="{callback:(isVisible, entry) => visibilityChanged(isVisible, entry, i), once: true,throttle: 300,
                throttleOptions: {
                    leading: 'visible',
                },}">
                <b-overlay :show="!is_loaded(i)">
                    <pdf class="shadow-md border bg-white" :style="{width:`${zoom_percent[zoom_i]}%`}"
                        @page-loaded="loaded_pages.find(pp=>pp.page ==i).loaded = true"
                        v-if="loaded_pages.some(p=>p.page == i)" :src="src" :page="i" />
                </b-overlay>
            </div>


        </div>
        <div class="w-full sticky bottom-0 z-10 flex justify-center pb-3">
            <div class="bg-gray-800 p-2 rounded-lg text-gray-200">
                <a>
                    <svg class="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd" /></svg>
                </a>
                <a>
                    <svg class="w-6 h-6 inline-block " fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd" /></svg>
                </a>

                <span class="px-3">|</span>

                <button :disabled="!zoom_percent[zoom_i-1]" @click="change_zoom('out')"
                    class="hover:bg-gray-500 p-1 rounded-sm cursor-pointer ">
                    <svg class="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>

                </button>

                <span class="hover:bg-gray-500 p-1 rounded-sm cursor-pointer ">
                    {{zoom_percent[zoom_i]}}%
                </span>
                <button :disabled="!zoom_percent[zoom_i+1]" @click="change_zoom('in')"
                    class="hover:bg-gray-500 p-1 rounded-sm cursor-pointer ">
                    <svg class="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>

                </button>


                <span class="px-3">|</span>
                <button :disabled="!zoom_percent[zoom_i-1]" @click="change_zoom('out')"
                    class="hover:bg-gray-900 p-1 rounded-sm cursor-pointer text-green-400 hover:text-green-600">

                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 inline-block" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <revise_psr />
            </div>
        </div>
        <b-sidebar v-model="show_comments" id="sidebar-right" title="Sidebar" right shadow>
            <span class="text-md px-2 py-2">
                Comments
            </span>
            <div class="px-2 py-2">
               
            </div>
        </b-sidebar>
    </div>
</template>
<script>
    import pdf from 'vue-pdf'
    import {
        mapState
    } from 'vuex'
    import Vue from 'vue'
    import VueObserveVisibility from 'vue-observe-visibility'

    Vue.use(VueObserveVisibility)
    export default {
        components: {
            pdf
        },
        data() {
            var loadingTask = pdf.createLoadingTask(
                `${`http://${process.env.VUE_APP_SERVER}:8000`}/cors/pdf/${this.$route.params.file}`);
            return {
                file_info: {},
                src: loadingTask,
                numPages: {},
                loaded_pages: [],
                zoom_i: 3,
                zoom_percent: [25, 50, 75, 100, 150, 200, 300, 400],
                show_comments:false
            }
        },

        computed: {
            ...mapState(['serUrl']),

        },
        methods: {
            change_zoom(z) {
                if (z == 'in')
                    this.zoom_i++
                else
                    this.zoom_i--
            },
            is_loaded(i) {
                return this.loaded_pages.find(pp => pp.page == i) ?.loaded;
            },
            visibilityChanged(isVisible, entry, i) {
                if (isVisible) {
                    this.loaded_pages.push({
                        page: i,
                        loaded: false
                    })
                    this.$forceUpdate()
                }
            },
            ale(x) {
                alert(x);
            }
        },
        mounted() {

            this.src.promise.then(pdf => {
                this.numPages = {
                    page_count: pdf.numPages,
                    isVisible: false
                };
            });
            axios.get(`/cors/jarvisFileInfos/${this.$route.params.file}`)
                .then(res => {
                    // console.log(res)
                    this.file_info = res.data
                })
                .catch(err => {
                    console.error(err);
                })
        },
    }
</script>