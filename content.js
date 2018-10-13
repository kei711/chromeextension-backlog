let watch = function() {
    u('a.loom-link-another:not(.googleDrivePreview)').each(function(elem) {
        let $elem = u(elem);
        let url = $elem.attr('href');
        if (((url.indexOf('https://docs.google.com') === 0) || (url.indexOf('https://drive.google.com') === 0))
            // ignore Google From
            && (url.indexOf('forms') === -1)
            // ignore Open url
            && (url.indexOf('open') === -1)
            // ignore Google Drive Folder
            && (url.indexOf('folders') === -1)
        ) {
            let $placeholder = u('<div class="googleDrivePreview__placeholder">カーソルを合わせるとプレビューが表示されます</div>');
            $elem.parent().append($placeholder);
            $placeholder.on('mouseenter', function () {
                $placeholder.first().style.display = 'none';

                let $preview = u('<div class="googleDrivePreview__preview"></div>');
                let previewUrl = url.replace(/\/d\/(.*)\/(.*)$/g, '/d/$1/preview');
                $preview.append('<iframe src="' + previewUrl + '"></iframe>');
                $placeholder.parent().append($preview);
            });
            $elem.addClass('googleDrivePreview');
        }
    });
};

watch();

// DOMの変更検知して更新を行う
let target = u('#issuecard');
if (target) {
    let observer = new MutationObserver(watch);
    observer.observe(target.first(), { childList: true, subtree: true});
}