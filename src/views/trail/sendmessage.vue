<template>
    <div class="media row  z-50">

        <div class="media-body">
            <div class="media-title" style="">
            </div>
            <div class="messge-body p-2 ">
                <div class="">
                    <quillEditor style="height:100%" ref="test" :options="customToolbar" v-model="data.content" />
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
                                        <button @click.prevent="$refs.upload.update(item, {active: true, error: '', progress: '0.00'})" class="text-gray-500 hover:text-blue-600 float-right">
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
                </div>
                <div class="clearfix">
                    <div class="row">
                        <div class="col-md-12 mt-2 flex flex-row items-center">
                            <div class="inline-block">
                                <b-overlay rlay :show="sending || ($refs.upload && $refs.upload.active)" rounded
                                    opacity="0.6" spinner-small spinner-variant="primary">
                                    <b-button :disabled="data.content < 1" @click="submit" size="sm" variant="primary"
                                        class="flex flex-row justify-between items-center max-w-3xl">
                                        <i class="fa fa-paper-plane mr-2" aria-hidden="true"></i>
                                        <span>Send</span>
                                    </b-button>
                                </b-overlay>
                            </div>
                            <file-upload
                                class="ml-1 inline-block w-8 h-8 hover:bg-gray-300 transition-colors delay-75 rounded-md text-gray-400 hover:text-gray-900 " style="padding:5px"
                                :headers="{'Authorization':`Bearer ${ currentUser.token}`,'Accept':'application/json'}"
                                :post-action="`${server}/cors/file/attach/send`" :multiple="true"
                                :size="1024 * 1024 * 20" v-model="files" @input-filter="inputFilter"
                                @input-file="inputFile" ref="upload">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </file-upload>


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
        computed: {
            ...mapState([
                'users'
            ]),
            ...mapGetters(['currentUser', 'current_employee_id'])
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
                            mentionListClass: 'list-group z-50',

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
                        this.showNotification({
                            title: 'Message Sent',
                            content: res.data.content
                        })
                    })
                    .catch(err => {
                        console.error(err);
                    }).then(x => {

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
                        console.log('Editor', Editor)
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