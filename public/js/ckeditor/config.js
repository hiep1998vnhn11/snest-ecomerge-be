CKEDITOR.editorConfig = function (config) {
  config.toolbarGroups = [
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'styles', groups: ['styles'] },
    { name: 'colors', groups: ['colors'] },
    { name: 'insert', groups: ['insert'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    {
      name: 'editing',
      groups: ['find', 'selection', 'spellchecker', 'editing'],
    },
    { name: 'forms', groups: ['forms'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    {
      name: 'paragraph',
      groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
    },
    { name: 'links', groups: ['links'] },
    { name: 'tools', groups: ['tools'] },
    { name: 'others', groups: ['others'] },
    { name: 'about', groups: ['about'] },
  ]
  config.height = 500
  config.width = '100%'
  config.removeButtons =
    'Preview,Print,Templates,NewPage,Cut,Copy,Paste,PasteText,PasteFromWord,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Find,Flash,SpecialChar,PageBreak,Iframe,Subscript,Superscript,CopyFormatting,RemoveFormat,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Anchor,Unlink,Link,Maximize,About,ShowBlocks,Styles'
}
