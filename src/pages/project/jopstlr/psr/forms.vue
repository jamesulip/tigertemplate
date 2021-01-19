<template>
    <div>
        <b-tabs card v-model="detail_tab">
            <b-tab active>
                <template #title>
                  Job Order Details  <b-avatar size="26px" variant="light" badge-variant="danger" :badge="`${errors_count.info || 0}`" icon="exclamation-triangle"></b-avatar>
                </template>


                <div class="row">
                    <div class="col-md-12">
                       
                         <b-alert dismissible @dismissed="x=>{show_errors=false,errors={}}" :show="Boolean(Object.keys(errors).length) && show_errors" variant="danger" class="disabled">
                             Cant Proceed {{Object.keys(errors).length}} error<template v-if="Object.keys(errors).length>0">s</template> found
                         </b-alert>
                    </div>
                    <div class="col-md-6">
                        <b-form-group label="Media:" label-for="input-3">
                            <b-form-input :state="array_to_bool(errors['details.s_media'])"
                                v-model="value.details.s_media" />
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
                    <b-form-input  :state="array_to_bool(errors['details.s_projname'])"
                        v-model="value.details.s_projname" />
                </b-form-group>
                <b-form-group label="Scope" label-for="radio-group-1">

                    <b-form-radio-group id="radio-group-1" v-model="test2" text-field="prodt_name" value-field="ID"
                        :options="$store.getters.get_productiontypes" name="radio-options">
                        <b-form-invalid-feedback :state="Boolean(test2)">Select Scope</b-form-invalid-feedback>
                    </b-form-radio-group>
                </b-form-group>
                <b-form-group label="Size" label-for="radio-group-1">
                    <b-form-checkbox-group v-model="size" :state="array_to_bool(errors['details.size'])"
                    id="checkbox-group-1"
                    :options="[
                        {text:'ACTUAL SIZE',value:'ACTUAL SIZE'},
                        {text:'CROP',value:'CROP'},
                        {text:'SWATCH',value:'SWATCH'},
                        {text:'RESIZE',value:'RESIZE'},
                        ]"
                    name="flavour-1"
                ></b-form-checkbox-group>
                </b-form-group>
                <div class="clearfix">
                    <hr class="col-md-12">
                    <b-form-group label="Project Name:" label-for="input-2">
                        <b-form-select value-field="steps" :state="array_to_bool(errors['finishers'])" text-field="stepname" v-model="finishers_selected"
                            :options="$store.getters.get_productstep" :value="$store.getters.get_productstep[0]" />
                    </b-form-group>
                    <div class="row" v-if="finishers_selected">
                        <div class="col-md-12 row m-0 p-0 ">
                            <div class="col-md-6" v-for="(item, index) in finishers_selected" :key="index">

                                <div class="card card-outline shadow-sm">
                                    <div class="card-header">
                                        {{item.production.prodt_name}}
                                    </div>

                                    <div class="card-body">
                                        <b-form-group label="Machine:" label-for="input-2">
                                            <b-form-select :state="array_to_bool(errors[`finishers.${index}.machine`])"
                                                v-model="item.sel_machine"
                                                :disabled="!Boolean(filterMachine($store.state.machines,item).length)"
                                                :options="filterMachine($store.state.machines,item)" />
                                        </b-form-group>
                                        <b-form-group label="Instructions" label-for="input-5">
                                            <b-form-textarea v-model="item.detail" rows="5" max-rows="5" no-auto-shrink>
                                            </b-form-textarea>
                                        </b-form-group>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>
<style lang="scss">
    .list-enter-active, .list-leave-active {
        transition: all .2s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
       
    }
</style>
<script>
    /*eslint-disable*/
    export default {
        props: ['value'],
        data() {
            return {
                show_errors:false,
                detail_tab:0,
                finishers_selected: [],
                test2: "",
                errors: {
                    scope:{}
                },
                loading:false
            }
        },
        methods: {
            AddItem(){
              this.value.items.push({source: "", w: "", h: "", qty: "", detailID: "", uom: ""})
            },
            array_to_bool(array) {
                if (array)
                    return !Boolean(array.length)
               
            },
            filterMachine(machine, type) {
                var s = machine.filter(x => {
                    if (type.production.prodt_name == "PRINTING")
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
            submit: function () {
                this.show_errors = true
                this.errors = {}
                if(!this.test2){
                    this.errors.scope = [
                        {name: "s_media", message: "No Media"}
                    ]
                    return false
                }
                if(!Boolean(this.finishers_selected.length)){
                    this.errors.finishers = [
                        {name: "s_media", message: "No Media"}
                    ]
                    return false
                }
                this.loading = true
                axios.post(`cors/newAddproject`, {
                    ...this.value,
                    finishers: this.finishers.concat(this.scope()),
                  
                })
                .then(res => {
                   this.$emit('added',res.data)
                     this.loading = false
                })
                .catch(err => {
                  
                    this.errors = err.response.data.errors

                    if(this.errors_count.info){
                        this.$bvToast.toast(`${this.errors_count.info} found on JO details Tab`, {
                        title: `Cant Proceed`,
                            variant: 'danger',
                            solid: true
                        })
                        this.detail_tab = 0
                    }
                    else if(this.errors_count.items){
                        this.$bvToast.toast(`${this.errors_count.items} found on Items Tab`, {
                        title: `Cant Proceed`,
                            variant: 'danger',
                            solid: true
                        })
                        this.detail_tab = 1
                    }
                     this.loading = false
                })
            },
            scope() {
                var sel_scope = this.$store.getters.get_productiontypes.find(x => x.ID === this.test2)
                let scope = {
                    DETAILS: "",
                    FINISHING: sel_scope.prodt_name,
                    Num: this.finishers_selected.length,
                    department: sel_scope.prodt_dep,
                }
                return scope;
            }

        },

        computed: {
            size:{
                get(val){
                    console.log(val.value.details.size)
                  return val.value.details.size.split(",")
                },
                set(val){
                   this.value.details.size = val.join(',')
                }
            },
            errors_count(){
                var counts={}
                Object.keys(this.errors).map(x=>{
                    return x.split('.')[0]
                }).forEach(function(x) { 
                    if(x=='items')
                        counts['items'] = (counts[x] || 0)+1;
                    else
                         counts['info'] = (counts['info'] || 0)+1;
                 });

                return counts;
            },
            finishers: function () {
                return this.finishers_selected.map((s, i) => {
                    return {
                        DETAILS: s.detail,
                        FINISHING: s.production.prodt_name,
                        Num: i,
                        department: s.production.prodt_dep,
                        machine: s.sel_machine,
                        machine_req: s.production.prodt_machine,
                        processname: s.productionID,
                        productionID: s.productID
                    }
                })
            },

        },
        mounted() {

        },
    }
</script>