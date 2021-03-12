<template>
    <div class="media row">

        <div class="media-body">
            <div class="media-title" style="">
            </div>
            <div class="messge-body p-2  bg-white">
                <div class="">
                    <quillEditor  style="height:100%" ref="test" :options="customToolbar" v-model="data.content" />



                    <div class="py-1" v-if="files.length >0">
                        <ul class="border border-gray-200 rounded-sm divide-y divide-gray-200 lg:w-1/2 sm:w-10/12">
                            <li class="pl-3 pr-4 py-1 bg-gray-100 flex items-center justify-between text-sm" v-for="(item, index) in files" :key="`upload-${index}`">
                                  <!-- error -->
                                <template v-if="item.success">
                                    <span  v-b-tooltip.hover :title="item.name" class="w-3/4 truncate font-medium text-blue-500 hover:underline cursor-pointer">
                                        {{item.name}}
                                    </span>
                                    <div class="w-3/12 text-center">
                                        <span class="font-medium text-gray-500">({{item.size | bytesToSize(2)}})</span>
                                        <button class="text-gray-500 hover:text-red-600 float-right">
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </template>
                                <!-- success -->
                                <template v-else-if="item.error">
                                    <span v-b-tooltip.hover :title="item.name" class="w-3/4 truncate">
                                        {{item.name}}
                                    </span>
                                    <div class="w-3/12 text-center">
                                        <span class="font-medium text-gray-500">Error</span>
                                        <button class="text-gray-500 hover:text-blue-600 float-right">
                                            <i class="fa fa-undo" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </template>
                                <!-- pending -->
                                <template v-else>
                                    <span v-b-tooltip.hover :title="item.name" class="w-3/4 truncate">
                                        {{item.name}}
                                    </span>
                                    <b-progress class="w-3/12 rounded-md" :value="item.progress" :precision="1" show-progress></b-progress>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="card card-body mt-1 p-1" v-if="files.length >0">
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

                                    <td style="text-align: center;" v-if="item.error">{{item.error}}</td>
                                    <td style="text-align: center;" v-else-if="item.success">success</td>
                                    <td style="text-align: center;" v-else-if="item.active">active</td>

                                    <td>
                                        <b-icon-x></b-icon-x>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div> -->
                     <file-upload  :input-id="`xs-${_uid}`" class="btn btn-primary" :key="`up-file`"
                                :headers="{'Authorization':`Bearer ${ currentUser.token}`}"
                                :post-action="`${server}/cors/file/attach/send`"  :multiple="true"
                                :size="1024 * 1024 * 20" v-model="files" @input-filter="inputFilter"
                                @input-file="inputFile" ref="upload">
                                <i class="fa fa-plus"></i>
                                Select files
                            </file-upload>
                </div>
                <div class="clearfix" v-show="!hideButton">
                    <div class="row">
                        <div class="col-md-12 mt-2">
                            <b-overlay :show="sending || ($refs.upload && $refs.upload.active)" rounded opacity="0.6" spinner-small spinner-variant="primary"
                                class="d-inline-block float-right">
                                <b-button @click="submit" :disabled="disabled">
                                    <i class="fa fa-paper-plane pr-3" aria-hidden="true"></i>Submit Proposal
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
        props: ['trailid','disabled','hide-button'],
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
                    Type: "proposal",
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
                axios.post(`cors/trail/${this.trailid.trailid}/send`, {
                    ...this.data,
                    user: this.current_employee_id,
                    ref:this.trailid.DETAILID
                })
                    .then(res => {
                        // console.log(res)
                       
                          this.$emit('sent',res.data)
                       this.update_temp(res.data.id);
                        this.showNotification({title:'Message Sent',content:res.data.content})
                    })
                    .catch(err => {
                        console.error(err);
                    }).then(x=>{
                        
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
                        type: "proposal"
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