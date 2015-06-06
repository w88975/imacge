qiniuToken.config.access_key = '004mJyNuXdOSW3-8_6yv6-e0Z4zTI5VCRhoeALlT';
qiniuToken.config.secret_key = 'nNb-Yvs9YJzHt6lIVIz2M-qPDBMyT82ZEoncSngn';
qiniuToken.config.scope = 'kamisama';

var progress = document.getElementById('progress');
var drop = document.getElementById('drop');

// Quark shell 初始化

quark.debug = true;

// 初始化设置菜单
quark.setupPreferences([
  {"label": "General",  "identifier": "general",  "icon": "NSPreferencesGeneral", "height": 192*2},
  {"label": "Account",  "identifier": "account",  "icon": "NSUserAccounts",       "height": 102*2},
  {"label": "Shortcut", "identifier": "shortcut", "icon": "NSAdvanced",           "height": 120*2}
]);

// 点击图标后置顶.
quark.setClickAction(function () {
    quark.pin();
});

var popup = false;

// 全局快捷键`F1`弹出
quark.addKeyboardShortcut({
    keycode: 0x7A,
    modifierFlags: 0,
    callback: function () {
        if (!popup) {
            quark.openPopup();
            popup = true;
        }
        else {
            popup = false;
            quark.closePopup();
        }
        quark.pin();
    }
});

// 快捷键 `command + ,` 弹出设置
document.body.addEventListener('keydown',function (event) {
    if (event.metaKey && event.which === 188) {
        quark.openPreferences();
    }
});

drop.addEventListener('dragover',function () {
    drop.style.borderColor = '#F9FF00';
});

drop.addEventListener('dragleave',function () {
    drop.style.borderColor = 'white';
});

console.log(qiniuToken.getToken());

var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'drop',
    uptoken : qiniuToken.getToken(),
    unique_names: true,
    domain: 'http://7u2k79.com1.z0.glb.clouddn.com/',
    container: 'drop',
    max_file_size: '100mb',
    flash_swf_url: 'js/plupload/Moxie.swf',
    max_retries: 3,
    dragdrop: true,
    drop_element: 'drop',
    chunk_size: '4mb',
    auto_start: true,
    init: {
        'FilesAdded': function(up, files) {
            drop.style.borderColor = 'white';

            // 图片转换成Base64
            var reader = new FileReader();
            reader.readAsDataURL(files[0].getNative());
            reader.onload = function(e){
                document.getElementById('base64').value = e.target.result;
            };
        },
        'BeforeUpload': function(up, file) {
            progress.style.display = 'block';
        },
        'UploadProgress': function(up, file) {
            // 上传进度显示
            var progressbar = document.getElementById('progressbar');
            progressbar.style.width = file.percent + "%";
            quark.setLabel(file.percent + "%");
        },
        'FileUploaded': function(up, file, info) {
            var res = JSON.parse(info);
            document.getElementById('url').value = up.settings.domain + res.key;
            quark.notify({title: 'Imacge', content: 'Image upload to complete!', popupOnClick: true});
            progress.style.display = 'none';
            progressbar.style.width = '0%';
            quark.pin();
            quark.setLabel('');
        },
        'Error': function(up, err, errTip) {

        },
        'UploadComplete': function() {

        },
        'Key': function(up, file) {
            var key = "";
            return key
        }
    }
});
