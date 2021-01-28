<template>
    <div>



        <div class="row">
            <div class="col-md-12">

                <b-alert dismissible @dismissed="x=>{show_errors=false,errors={}}"
                    :show="Boolean(Object.keys(errors).length) && show_errors" variant="danger" class="disabled">
                    Cant Proceed {{Object.keys(errors).length}} error<template
                        v-if="Object.keys(errors).length>0">s</template> found
                </b-alert>
            </div>
            <div class="col-md-12">
                <b-form-group label="Project Name:" label-for="input-2">
                    <b-form-input :state="array_to_bool(errors['details.s_projname'])"
                        v-model="value.details.s_projname" />
                </b-form-group>
            </div>
            <div class="col-md-6">
                <b-form-group label="Media:" label-for="input-3">
                    <b-form-input :state="array_to_bool(errors['details.s_media'])" v-model="value.details.s_media" />
                </b-form-group>
            </div>

            <div class="col-md-6">
                <b-form-group label="Project Type:" label-for="input-1">
                    <v-select :label="`name`" v-model="value.projects.projecttype" :reduce="Client => Client.ID"
                        :options="get_projecttypes">
                        <template #selected-option="{ name }">
                            <div style="margin:2px">
                                <strong>{{ name }}</strong>
                            </div>
                        </template>
                    </v-select>
                </b-form-group>
            </div>

            <div class="col-md-12">
                <b-form-group label="Size" label-for="radio-group-1">
                    <b-form-checkbox-group v-model="size" :state="array_to_bool(errors['details.size'])"
                        id="checkbox-group-1" :options="[
                        {text:'ACTUAL SIZE',value:'ACTUAL SIZE'},
                        {text:'CROP',value:'CROP'},
                        {text:'SWATCH',value:'SWATCH'},
                        {text:'RESIZE',value:'RESIZE'},
                        ]" name="flavour-1"></b-form-checkbox-group>
                </b-form-group>
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 row m-0 p-0 ">
                <div class="col-md-6" v-for="(item, index) in value.finishers" :key="index">

                    <div class="card card-outline shadow-sm">
                        <div class="card-header">
                            {{item.FINISHING}}
                        </div>

                        <div class="card-body">
                            <b-form-group label="Machine:" label-for="input-2">
                                <b-form-select :state="array_to_bool(errors[`finishers.${index}.machine`])"
                                    v-model="item.machine"
                                    :disabled="!Boolean(filterMachine(machines,item).length)"
                                    :options="filterMachine(machines,item)" />
                            </b-form-group>
                            <b-form-group label="Instructions" label-for="input-5">
                                <b-form-textarea v-model="item.DETAILS" rows="5" max-rows="5" no-auto-shrink>
                                </b-form-textarea>
                            </b-form-group>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
    /*eslint-disable*/
    export default {
        props: ['value'],
        data() {
            return {
                show_errors: false,
                errors: {}
            }
        },
        computed: {
            ...mapGetters(['get_projecttypes']),
            ...mapState(['machines']),
            size: {
                get(val) {
                    console.log(val.value.details.size)
                    return val.value.details.size.split(",")
                },
                set(val) {
                    this.value.details.size = val.join(',')
                }
            },
        },
        methods: {
            array_to_bool(array) {
                if (array)
                    return !Boolean(array.length)

            },
            filterMachine(machine, type) {

                var s = machine.filter(x => {
                    if (type.FINISHING == "PRINTING")
                        return x.Type == "PRINTER"
                    else if (type.FINISHING == "CUTTING")
                        return x.Type == "CUTTING"
                })

                return s.map(x => {
                    return {
                        text: x.brand,
                        value: x.brand
                    }
                });

            },
            submit() {
                this.errors = {}
                axios.post(`cors/updateProject/${this.value.details.ID}`,
                        this.value)
                    .then(res => {

                        this.$emit('edited', res.data)
                        
                    })
                    .catch(err => {
                        // console.error(err); 

                        this.errors = err.response.data.errors
                    })
            }
        },
    }
</script>