<template>
    <div>
        

         <!-- <table class="table table-striped table-sm">
             <thead>
                 <tr>
                     <th>Project</th>
                     <th>Duration</th>
                     <th>Status</th>
                 </tr>
             </thead>
              <tbody>
                 <tr v-for="l in logs" :key="`log-${l.id}`">
                     <td>
                        <div>
                            {{l.project.TYPE}}#{{l.project.NUM}}
                            <br>
                            {{l.project.VERSION}}
                        </div>
                     </td>
                     <td>{{l.Status}}</td>
                     <td>{{duration(l)}}</td>
                 </tr>
             </tbody>
         </table> -->
        <div>
            <div class="px-3 py-3">
                <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mb-2 justify-center ">
                    <div class="py-2 mx-1 ">
                        <div class=" text-center w-14">
                            <span class="font-semibold text-black-500 text-lg">5</span>
                            <p class="text-sm text-gray-600  dark:text-gray-200">PSR</p>
                        </div>
                    </div>
                    <div class="py-2 mx-1">
                        <div class=" text-center w-14">
                            <span class="font-semibold text-black-500 text-lg">5</span>
                            <p class="text-sm text-gray-600  dark:text-gray-200">JO</p>
                        </div>
                    </div>
                    <div class="py-2 mx-1">
                        <div class=" text-center w-14">
                            <span class="font-semibold text-black-500 text-lg">5</span>
                            <p class="text-sm text-gray-600 dark:text-gray-200">LR</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-1">
                <stats/>
            </div>
            <div class="px-1">
                <button class="mb-1 p-1 px-2 hover:bg-gray-300 hover:text-gray-700 rounded-md" :disabled="loading" @click="load_logs()">
                    <i class="fa fa-redo" :class="{'fa-spin':loading}"  aria-hidden="true"></i>
                </button>
                <b-overlay :show="loading">
                    <div class="flex w-full max-w-full  overflow-hidden bg-white  dark:bg-gray-800 mb-1 content-between"  v-for="l in logs" :key="`log-${l.id}`">  
                        <div class="w-2" :class="l.Status | status_col">

                        </div>
                        <div class="py-2 w-full">
                            <div class="mx-3">
                                <span class="font-semibold text-gray-500 dark:text-green-400">{{l.project.TYPE}}#{{l.project.NUM}}</span>
                                <p class="text-sm text-gray-600 dark:text-gray-200">{{l.updated_ad |formatDate('LLLL')}}</p>
                            </div>
                        </div>
                        <div class="self-center text-center mr-3">
                            <span class="float-right font-semibold ">{{duration(l)}}</span>
                        </div>
                    </div>
                </b-overlay>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import stats from './stats/stat.vue'
export default {
    components:{
        stats
    },
    data() {
        return {
            logs:[

            ],
            loading : false
        }
    },
    methods: {
        duration(l){
            const duration = moment.utc(moment(l.Stop).diff(moment(l.Start)));
            // const duration = duration?;
            if(isNaN(duration))
                return 'Pending'
            return duration.format('H:m:s');
        },
        load_logs(){
            this.loading = true
             axios.get(`/cors/jarvis_logs`)
            .then(res => {
                // console.log(res)
                this.logs= res.data
                this.loading = false
            })
            .catch(err => {
                console.error(err); 
                this.loading = false
            })
        }
    },
    mounted() {
       this.load_logs()
    },
}
</script>