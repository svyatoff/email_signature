(function (w) {
    var doc = w.document;
    var inputs = doc.querySelectorAll('form .input');
    var select = doc.querySelector('[data-select]');
    var prepare = doc.querySelector('[data-prepare]');
    var download = doc.querySelector('[data-load]');
    var banner = doc.querySelector('#checkImage');
    var bannerWrap = doc.querySelector('#imageWrap');
	var bannerInput = doc.querySelector('#image');

    for (var i = inputs.length - 1; i >= 0; i--) {
        inputs[i].addEventListener('keyup', updateSignature);
    }

    banner.addEventListener('click', function () {
        if (!this.checked) {
            bannerInput.disabled = true;
            removeBanner();
        } else {
            bannerInput.disabled = false;
            createBanner();
        }
    });

    function createBanner(src) {
        var checkLink = bannerWrap.querySelector('a');
        var br = doc.createElement('br');
        var img = doc.createElement('img');
        img.src = src ? src : 'http://i.imgur.com/Cx7gGUX.gif';
        img.classList.add('image');
        img.width = '600';
        img.height = '60';
        var link = doc.createElement('a');
        link.href = 'https://maxpay.com';

        if (checkLink) {
            bannerWrap.querySelector('img').src = src;
        } else {
            link.appendChild(img);
            bannerWrap.appendChild(br);
            bannerWrap.appendChild(br);
            bannerWrap.appendChild(link);
        }
    }

    function removeBanner() {
        bannerWrap.innerHTML = '';
        doc.querySelector('#image').value = '';
    }

    function updateSignature(e) {
        var id = e.target.id;
        var value = e.target.value;
        var element = doc.querySelector('.' + id);
        var checkBanner = banner.checked;

        if (id === 'email') {
            element.href = 'mailto:' + value;
            element.innerHTML = value;
        } else if (id === 'facebook') {
            element.href = value;
        } else if (id === 'twitter') {
            element.href = value;
        } else if (id === 'linkedin') {
            element.href = value;
        } else if (id === 'image') {
            if (checkBanner) {
                createBanner(value);
            }
        } else {
            element.innerHTML = value;
        }
        download.classList.add('is-hidden');
        prepare.classList.remove('is-hidden');
    }

    select.addEventListener('click', selectGmail);
    prepare.addEventListener('click', prepareHTML);

    function selectGmail(event) {
        var id = event.target.dataset.signature;
        var element = doc.querySelector('#' + id);
        selectText(element);
    }
    function prepareHTML(event) {
        var html = doc.querySelector('#signature_container').innerHTML;
        download.href = 'data:text/html, ' + html;
        download.classList.remove('is-hidden');
        prepare.classList.add('is-hidden');
    }

    // from SO: http://stackoverflow.com/a/987376/1592915
    function selectText(element) {
        if (doc.body.createTextRange) {
            range = doc.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (w.getSelection) {
            selection = w.getSelection();
            range = doc.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

})(window);