<template>
    <div>
        <b-tabs card>
            <b-tab title="Job Order Details" active>
              

                <div class="row">
                    <div class="col-md-6">
                        <b-form-group label="Media:" label-for="input-3">
                            <b-form-input v-model="value.details.s_media" />
                        </b-form-group>
                    </div>
                    <div class="col-md-6">
                        <b-form-group label="Project Type:" label-for="input-1">
                            <v-select :label="`name`" v-model="value.projects.projecttype" :reduce="Client => Client.ID"
                                :options="$store.getters.get_projecttypes">
                                <template #selected-option="{ name }">
                                    <div style="margin:2px">
                                        <strong>{{ name }}</strong>
                                    </div>
                                </template>
                            </v-select>
                        </b-form-group>
                    </div>
                </div>
                <b-form-group label="Project Name:" label-for="input-2">
                    <b-form-input v-model="value.details.s_projname" />
                </b-form-group>
                <b-form-group label="Scope">

                    <b-form-radio-group id="radio-group-1" v-model="test2" text-field="prodt_name" value-field="ID"
                        :options="$store.getters.get_productiontypes" name="radio-options">
                    </b-form-radio-group>
                </b-form-group>

                <div class="clearfix" >
                    <hr class="col-md-12">
                    <b-form-group label="Project Name:" label-for="input-2">
                        <b-form-select value-field="steps" text-field="stepname" v-model="finishers_selected"
                            :options="$store.getters.get_productstep"  :value="$store.getters.get_productstep[0]"/>
                    </b-form-group>
                    <div class="row" v-if="finishers_selected">
                        <div class="col-md-12 row m-0 p-0 ">
                            <div class="col-md-6" v-for="(item, index) in finishers_selected" :key="index">
                                <div class="card card-outline card-info shadow-sm">
                                    <div class="card-header">
                                        {{item.production.prodt_name}}
                                    </div>
                                    <div class="card-body">
                                        <b-form-group label="Machine:" label-for="input-2">
                                            <b-form-select v-model="item.sel_machine"
                                                :options="filterMachine($store.state.machines,item)"
                                               />
                                        </b-form-group>
                                        <b-form-group label="Instructions" label-for="input-5">
                                            <b-form-textarea v-model="item.detail" rows="5" max-rows="5" no-auto-shrink></b-form-textarea>
                                        </b-form-group>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                   
                </div>
            </b-tab>
            <b-tab title="Items">
                <b-card-text>Tab contents 2</b-card-text>
            </b-tab>
        </b-tabs>
    </div>
</template>
<script>
/*eslint-disable*/
    export default {
        props: ['value'],
        data() {
            return {
                finishers_selected: [],
                test2: "",
                
            }
        },
        methods: {
            filterMachine(machine, type) {
                var s = machine.filter(x => {
                    if(type.production.prodt_name == "PRINTING")
                        return x.Type == "PRINTER"
                    return x.Type == type.production.prodt_name 
                })
                return s.map(x => {
                    return {
                        text: x.brand,
                        value: x.brand
                    }
                });

            },
            submit:function(){
               
                axios.post(`cors/newAddproject`,{
                        ...this.value,
                        finishers:this.finishers.concat(this.scope())
                    })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            scope(){
                 var sel_scope = this.$store.getters.get_productiontypes.find(x => x.ID === this.test2)
                let scope = {
                        DETAILS:"",
                        FINISHING: sel_scope.prodt_name,
                        Num: this.finishers_selected.length,
                        department:sel_scope.prodt_dep,
                }
                console.log('scope',scope)
                return scope;  
            }
          
        },
      
        computed: {
           
            finishers: function () {
                return this.finishers_selected.map((s, i) => {
                    return {
                        DETAILS: s.detail,
                        FINISHING: s.production.prodt_name,
                        Num: i,
                        department: s.production.prodt_dep,
                        machine:s.sel_machine,
                        processname:s.productionID,
                        productionID:s.productID
                    }
                })
            },
            
        },
        mounted() {
            
        },
    }
</script>