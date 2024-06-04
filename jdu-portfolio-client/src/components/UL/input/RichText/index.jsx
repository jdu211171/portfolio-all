import { useEffect } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
// import 'froala-editor/js/plugins/image.min.js';
import { _convertHtmlToPlainText } from "../../../../utils/htmlToPlainText";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import api from "../../../../services/api";

const config = (setValue, getValues) => ({
    enter: Froalaeditor.ENTER_BR,
    tableStyles: {
        "no-border": "No border"
    },
    charCounterCount: true,
    useClasses: false,
    attribution: false,
    heightMin: 220,
    heightMax: 592,
    widthMax: '100%',
    placeholderText: false,
    linkInsertButtons: [],
    pastePlain: true,
    imageResize: true,
    imageDefaultWidth: '100%',
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    videoResponsive: true,
    toolbarSticky: true,
    toolbarInline: false,
    toolbarVisibleWithoutSelection: true,
    imageManagerDeleteMethod: false,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    toolbarButtons: {
        'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
        },
        'moreParagraph': {
            'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
        },
        'moreRich': {
            'buttons': ['insertLink', 'insertImage', 'emoticons', 'insertTable', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR']
        },
        'moreMisc': {
            'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
            'align': 'right',
            'buttonsVisible': 2
        }
    },
    events: {
        initialized: function () {
            replyEditor = this;
        },
        blur: () => {
            // console.log(replyEditor.html.get(true));
        },
        'image.beforeUpload': function (e) {
            toast.promise(new Promise((resolve, reject) => {
                try {
                    const fd = new FormData()

                    fd.append('file', e[0])
                    api.post(`/upload`, fd, {
                        headers: {
                            'Content-Type': "multipart/form-data",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                        }
                    })
                        .then(res => {
                            if (res.data?.url) {
                                replyEditor.image.insert(String(res?.data?.url), false, null, replyEditor.image.get())
                                resolve('')
                            } else {
                                reject('')
                            }
                        })
                } catch (error) {
                    reject(error)
                }
            }), {
                loading: '画像を読み込み中...',
                success: '画像は正常にアップロードされました',
                error: '「画像をアップロードするときにエラーが発生しました」'
            })
        },
        'image.inserted': function (img) {
            const values = getValues()
            let descImg = values?.descImg || []
            descImg?.push(img?.[0]?.src)
            setValue(`descImg`, descImg)
        },
        'image.removed': (img) => {
            const values = getValues()
            let descImg = values?.descImg || []
            descImg = descImg?.filter(e => e !== img?.[0]?.currentSrc)
            setValue(`descImg`, descImg)
            api.delete(`/remove`, { data: { url: img[0]?.currentSrc }, }, {
                headers: {
                    'Content-Type': "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            })
        },
        'image.error': () => {

        },
        // 'video.beforeUpload': (e) => {
        //     const file = e[0];
        //     const fd = new FormData()
        //     fd.append('video', file)

        //     axios.post(`https://api.jdu.getter.uz/upload`, fd, {
        //         headers: {
        //             'Content-Type': "multipart/form-data",
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        //         }
        //     }).then(res => replyEditor.video.insert(String(res?.data?.url), null, null, replyEditor.video.get()))
        // },
        'paste.beforeCleanup': function (html) {
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const elements = temp.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, ul');
            elements.forEach(el => {
                el.removeAttribute('style');
            });
            return temp.innerHTML;
        },

    }
})

let replyEditor = "";
let locale = ''

const RichText = ({
    register,
    setValue = () => { },
    getValues = () => { },
    value = '',
    name = '',
    onChange = () => { },
}) => {
    useEffect(() => {
        // if (import.meta.env.PROD) {
        import('./removeLisence.scss')
        // }
    }, [])
    locale = name?.split('.')?.[0]
    return (
        <>
            <Toaster />
            <FroalaEditor
                model={value}

                onModelChange={(model) => { onChange(model); setValue(name, model) }}
                config={config(setValue, getValues)}
                {...register}
            />
        </>
    );
}

export default RichText;