<template>
    
        <b-button :variant="variant" :size="size" @click="send_to_trail=true">
            <i class="fa fa-paper-plane" aria-hidden="true"></i> Send to Trail
      

        <b-modal v-model="send_to_trail" size="lg" @ok="send">

            <div class="col-md-12">
                <b-form-group label="Subject:" label-for="input-2">
                    <b-input-group>
                        <b-form-input v-model="content.title" />
                        <b-input-group-append>
                            <b-button @click="set_subject" variant="info">
                                <b-icon icon="arrow-clockwise"></b-icon>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                
            </div>
            <div class="col-md-12">
                <b-form-group label="Projects:" label-for="input-2">
                    <v-select :closeOnSelect="false" multiple v-model="sel" :options="projects" :label="`NUM`">
                        <template slot="selected-option" slot-scope="option">
                            <div class="flex">
                                <div class="col">

                                    <span> {{ option.TYPE }}#{{ option.NUM }}</span>
                                </div>
                            </div>
                        </template>
                        <template slot="option" slot-scope="option">
                            <span class="fa" :class="option.icon"></span>
                            {{ option.TYPE }}#{{ option.NUM }}
                        </template>
                    </v-select>
                    <b-form-invalid-feedback :state="!error.projects">
                       You must select projects first to generate Subject.
                    </b-form-invalid-feedback>
                </b-form-group>
            </div>
            <div class="col-md-12">
                <vue-editor v-model="content.content" :editor-toolbar="customToolbar"></vue-editor>
            </div>
        </b-modal>

     </b-button>
</template>
<script>
/*eslint-disable*/
    import _ from 'lodash';
    export default {
        props: ['projects',"variant","size"],
        data() {
            return {
                sel: [],
                send_to_trail: false,
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{
                        list: "ordered"
                    }, {
                        list: "bullet"
                    }],
                    ["image", "code-block"]
                ],
                content: {
                    content: '',
                    title: '',
                    projects:''
                },
                error: {
                    projects: true
                }
            }
        },
     
        computed: {
            selected_projects() {
                try {
                    var a4 = this.sel.map(pro => {
                        return pro
                    }).sort((a, b) => {
                        return parseInt(a.NUM) - parseInt(b.NUM)
                    })
                    var seq = []
                    var all = []
                    var tf = true
                    var fir = _.first(a4)
                    console.log(fir)
                    a4.forEach((f, ind) => {
                        var cur = parseInt(f.NUM)
                        var next = a4[ind + 1] ? parseInt(a4[ind + 1].NUM) - 1 : f
                        if (cur == next || _.isNaN(next)) {
                            seq.push(f)
                            if (_.isNaN(next))
                                all.push(seq)
                        } else if (cur < next) {
                            seq.push(f)
                            all.push(seq)
                            seq = []
                        } else {
                            seq.push(f)
                            all.push(seq)

                        }
                    })
                    return `${fir.TYPE}#` + all.map(x => {
                        return x.filter(w => {
                            return w == x[0] || w == x[x.length - 1]
                        }).map(props => {
                            return `${props.NUM}`
                        }).join('-')
                    }).join(',') + `-${fir.detail2.client2.com_name}-${fir.detail2.s_projname}`;
                } catch (error) {
                    return ''
                }
            }
        },
        methods: {
            send(f){
                f.preventDefault();
                
                axios.post(`cors/emails2`,{
                    ...this.content,
                    projects:this.sel.map(x=>x.ID)
                })
                .then(res => {
                    // console.log(res)
                    this.send_to_trail = false
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            set_subject() {
                this.error.projects = true
                if (this.selected_projects) {
                    this.error.projects = false
                    this.content.title = this.selected_projects
                }
            },
            title(s) {
                console.log('s', s)
            }
        },
    }
</script>