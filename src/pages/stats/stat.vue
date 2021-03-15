<template>
  <div>
    <GChart :settings="{ packages: ['timeline'] }" type="Timeline" :data="logData" v-if="Boolean(logData.length)" :options="chartOptions" />
  </div>
</template>
<script>
import moment from 'moment'
  import {
    GChart
  } from 'vue-google-charts'

  export default {
    components: {
      GChart
    },
    data() {
      return {
     
        test:[],
     
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        }
      }
    },
    computed: {
      logData(){
        try {
          var  s= this.test.map(x=>{
            return [`${x.project.TYPE}#${x.project.NUM}v.${x.project.VERSION}`,x.Status,moment(x.Start).toDate(),moment(x.Stop).toDate()??new Date()]
          })

          var start = new Date();
          start.setHours(0,0,0,0);

          var end = new Date();
          end.setHours(23,59,59,999);


          var w = [`Date`,'Cur Date',moment(x.start).toDate(),moment(x.end).toDate()]

          return s.shift(w)

        } catch (error) {
          return error
        }
        
      }
    },
    mounted() {
       axios.get(`/cors/jarvis_logs`)
      .then(res => {
        this.test = res.data
      })
     
    },
  }
</script>