<template>
    <div class="media row">
        <div class="media-body">
            <div class="media-title" style="">
            </div>
            <div class="messge-body p-2 shadow bg-white">
                <div class="">
                    <quillEditor style="height:100%" ref="test" :options="customToolbar" v-model="data.content" />
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
                </div>
                <div class="clearfix">
                    <div class="row">
                        <div class="col-md-12 mt-2">

                            <file-upload class="btn btn-primary"
                                :headers="{'Authorization':`Bearer ${ currentUser.token}`,'Accept':'application/json'}"
                                :post-action="`${server}/cors/file/attach/send`"  :multiple="false"
                                :size="1024 * 1024 * 20" v-model="files" @input-filter="inputFilter"
                                @input-file="inputFile" ref="upload">
                                <i class="fa fa-plus"></i>
                                Select files
                            </file-upload>

                            <b-overlay :show="sending || ($refs.upload && $refs.upload.active)" rounded opacity="0.6" spinner-small spinner-variant="primary"
                                class="d-inline-block float-right">
                                <b-button @click="submit">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>Send
                                </b-button>
                            </b-overlay>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
    /*eslint-disable*/


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
    var InlineBlot = Quill.import('blots/block');

    Quill.register({
        'modules/imageDropAndPaste': QuillImageDropAndPaste,
        'modules/imageDropAndPaste': QuillImageDropAndPaste,
        'modules/imageUpload': ImageUpload,
        "modules/imageResize": ImageResize,
        'modules/magicUrl': MagicUrl,
    })




    import {
      mapActions,
      mapGetters,
        mapState
    } from 'vuex'



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
        props: ['trailid'],
        components: {
            quillEditor,
            FileUpload
        },
        computed:{
            ...mapState([
                'users'
            ]),
            ...mapGetters(['currentUser','current_employee_id'])
        },
        data() {
            return {
                server: window.axios.defaults.baseURL,
                files: [],
                sending: false,
                data: {
                    Type: "comment",
                    content: "",
                    user: this.current_employee_id,
                },
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

            }
        },
        mounted() {
            this.update_users()
        },
        methods: {
            ...mapActions(['update_users']),
            suggestPeople(searchTerm) {
                const allPeople = this.users;
                return allPeople.filter(person => person.name.includes(searchTerm));
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
            submit() {
               
                this.sending = true
                axios.post(`cors/trail/${this.trailid}/send`, {
                    ...this.data,
                    user: this.current_employee_id,
                })
                    .then(res => {
                        // console.log(res)
                       

                       this.update_temp(res.data.id);
                          this.showNotification({title:'Message Sent',content:res.data.content})
                    })
                    .catch(err => {
                        console.error(err);
                    }).then(x=>{
                        
                        this.$emit('sent')
                        this.data = {}
                        this.sending = false

                       

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
                        console.log('Editor',Editor)
                        quill.insertEmbed(quill.getSelection().index, 'imageBlot', {
                            src: url,
                        }, 'user');

                    })
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
               
            }


        },
    }
</script>