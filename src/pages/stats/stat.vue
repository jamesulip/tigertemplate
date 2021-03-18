<template>

  <GChart class="testsss" :settings="{ packages: ['timeline'] }" type="Timeline" :data="logData" v-if="Boolean(logData.length)"
    :options="chartOptions" />

</template>
<script>
  import moment from 'moment'
  import {
    GChart
  } from 'vue-google-charts'
import { mapState } from 'vuex'

  export default {
    components: {
      GChart
    },
    data() {
      return {

        test: [],

        chartOptions: {
          formatType:'yy',
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          colors: ['blue', 'red', 'green'],
          hAxis: {
            maxValue: new Date().setHours(new Date().getHours() + 1),
            minValue: new Date().setHours(8, 0, 0, 0),
            
          }
        }
      }
    },
    computed: {
      ...mapState(['logs']),
      logData() {
        try {
          var s = this.logs.map(x => {
            return [x.project.TYPE,`${x.project.TYPE}#${x.project.NUM}v.${x.project.VERSION}`, moment(x.Start).toDate(),
              x.Stop ? moment(x.Stop).toDate() : new Date()
            ]
          })

          var start = new Date();
          start.setHours(0, 0, 0, 0);

          var end = new Date();
          end.setHours(23, 59, 59, 999);


          var w = [`Date`, 'Cur Date', start, end]

          s.unshift(w)
          console.log(s);
          return s;

        } catch (error) {
          return error
        }

      }
    },
    
  }
</script>