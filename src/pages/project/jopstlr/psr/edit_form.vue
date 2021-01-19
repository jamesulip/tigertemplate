<template>
    <div>
       


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

    </div>
</template>

<script>
/*eslint-disable*/
export default {
    props:['value'],
    data() {
        return {
            errors:{}
        }
    },
    methods: {
         array_to_bool(array) {
                if (array)
                    return !Boolean(array.length)
               
            },
    },
}
</script>