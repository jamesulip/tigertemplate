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
                                <div class="col-md-6">
                                    <span> {{ option.TYPE }}#{{ option.NUM }}</span>
                                </div>
                            </div>
                        </template>
                        <template slot="option" slot-scope="option">
                           
                         
                            <div class="row">
                             <div class="col-md-6">
                                    {{ option.TYPE }}#{{ option.NUM }}
                                
                                </div>
                                <div class="col-md-6" v-if="option.trailid">
                                    <div class="float-right">
                                        <b-icon-check></b-icon-check>
                                    </div>
                                </div>
                                </div>
                        </template>
                    </v-select>
                    <b-form-invalid-feedback :state="!error.projects">
                        You must select projects first to generate Subject.
                    </b-form-invalid-feedback>
                </b-form-group>
            </div>
            <div class="col-md-12">
                <quillEditor style="height:100%" ref="test" :options="customToolbar" v-model="content.content" />
                <div class="card card-body mt-1 p-1" v-if="files.length >0">
                    <table class="mt-2 table-hover table table-sm">
                        <thead>
                            <tr>
                                <th style="width:1%;"></th>
                                <th style="width:50%"></th>
                                <th style="width:25%"></th>
                                <th style="width:25%"></th>
                                <th style="width:1%;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in files" :key="index">
                                <td>
                                    <b-icon-paperclip></b-icon-paperclip>
                                </td>
                                <td>
                                    <div class="text-truncate">
                                        <span class="text-truncate">
                                            {{item.name}}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <b-progress :value="item.progress"></b-progress>
                                </td>

                                <td style="    text-align: center;" v-if="item.error">{{item.error}}</td>
                                <td style="    text-align: center;" v-else-if="item.success">success</td>
                                <td style="    text-align: center;" v-else-if="item.active">active</td>

                                <td>
                                    <b-icon-x></b-icon-x>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="clearfix">
                    <div class="row">
                        <div class="col-md-12 mt-2">

                            <file-upload class="btn btn-primary"
                                :headers="{'Authorization':`Bearer ${ currentUser.token}`,'Accept':'application/json'}"
                                :post-action="`${server}/cors/file/attach/send`" :multiple="true"
                                :size="1024 * 1024 * 20" v-model="files" @input-filter="inputFilter"
                                @input-file="inputFile" ref="upload">
                                <i class="fa fa-plus"></i>
                                Select files
                            </file-upload>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>

    </b-button>
</template>
<script>
    /*eslint-disable*/
    import _ from 'lodash';

    import {
        quillEditor,
        Quill
    } from 'vue-quill-editor'
    import {
        ImageUpload
    } from 'quill-image-upload';
    import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
    import ImageResize from 'quill-image-resize-vue';
    import MagicUrl from 'quill-magic-url'
    import "quill-mention";
    import FileUpload from 'vue-upload-component'
import { mapGetters } from 'vuex';
    var InlineBlot = Quill.import('blots/block');

    Quill.register({
        'modules/imageDropAndPaste': QuillImageDropAndPaste,
        'modules/imageDropAndPaste': QuillImageDropAndPaste,
        'modules/imageUpload': ImageUpload,
        "modules/imageResize": ImageResize,
        'modules/magicUrl': MagicUrl,
    })

    class ImageBlot extends InlineBlot {
        static create(data) {
            const node = super.create(data);
            node.setAttribute('src', data.src);
            node.setAttribute('style', data.style);
            node.style.maxWidth = "500px";
            node.setAttribute('data-custom', data.custom);
            console.log(node);
            return node;
        }
        static value(domNode) {
            const {
                src,
                custom
            } = domNode.dataset;
            return {
                src,
                custom
            };
        }
    }
    ImageBlot.blotName = 'imageBlot';
    ImageBlot.className = 'image-blot';
    ImageBlot.tagName = 'img';
    ImageBlot.style = "background-color: red;"

    Quill.register({
        'formats/imageBlot': ImageBlot
    });
    export default {
        props: ['projects', "variant", "size"],
        components: {
            quillEditor,
            FileUpload
        },
        data() {
            return {
                server: window.axios.defaults.baseURL,
                sending:false,
                files:[],
                sel: [],
                send_to_trail: false,
                customToolbar: {
                    theme: 'snow',
                    modules: {
                        mention: {
                            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                            mentionDenotationChars: ["@", "#"],
                            listItemClass: 'list-group-item list-group-item-action',
                            mentionListClass: 'list-group',

                            source: async (searchTerm, renderList) => {
                                const matchedPeople = this.suggestPeople(searchTerm);

                                renderList(matchedPeople.map(x => {
                                    return {
                                        id: x.id,
                                        value: x.name
                                    }
                                }));
                            }
                        },
                        imageResize: {},
                        magicUrl: true,
                        imageDropAndPaste: {
                            handler: this.imageHandler
                        },
                        imageUpload: {
                            customUploader: (file, s) => this.handleImageAdded(file, s), // add custom uploader
                        },
                        toolbar: {

                            container: [
                                ["bold", "italic", "underline"],
                                [{
                                    list: "ordered"
                                }, {
                                    list: "bullet"
                                }],
                                ['image']
                            ],
                            handlers: {
                                'image': function () {
                                    document.getElementById('getFile').click()
                                }
                            }
                        }
                    }
                },
                content: {
                    content: '',
                    title: '',
                    projects: ''
                },
                error: {
                    projects: true
                }
            }
        },

        computed: {
            ...mapGetters(['currentUser']),
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
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }
            },
            inputFile(newFile, oldFile) {
                this.$refs.upload.active = true
               
            },
            imageHandler: function (imageDataUrl, type, imageData) {
                fetch(imageDataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", {
                            type: "image/png"
                        })
                        this.handleImageAdded(file)
                    })

            },
            handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
                this.sending = true
                var formData = new FormData();
                formData.append("upload", file);
                axios({
                        url: "cors/UploadImage",
                        method: "POST",
                        data: formData
                    })
                    .then(result => {
                        let url = result.data.url;
                        var quill = this.$refs.test.quill;
                        this.sending = false
                        quill.insertEmbed(quill.getSelection().index, 'imageBlot', {
                            src: url,
                            // custom: 'hello-' + Date.now(),
                        }, 'user');

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            update_temp(id) {
                
                axios.post(`cors/file/updateTemp/${id}`, {
                        ids: this.files.map(x => {
                            return x.response.id
                        }),
                        type: "comment"
                    })
                    .then(res => {
                        this.files = []
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            send(f) {
                f.preventDefault();

                axios.post(`cors/emails2`, {
                        ...this.content,
                        projects: this.sel.map(x => x.ID)
                    })
                    .then(res => {
                        // console.log(res)
                        
                        this.send_to_trail = false
                        this.update_temp(res.data.id)
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