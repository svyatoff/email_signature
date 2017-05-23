(function (w) {
	var doc = w.document;
	var inputs = doc.querySelectorAll('form .input');
	var select = doc.querySelector('[data-select]');
	var prepare = doc.querySelector('[data-prepare]');
	var download = doc.querySelector('[data-load]');
	var html = doc.querySelector('#signature_container').innerHTML;

	for (var i = inputs.length - 1; i >= 0; i--) {
		inputs[i].addEventListener('keyup', updateSignature);
	}

	function updateSignature(e) {
		var id = e.target.id;
		var value = e.target.value;
		var element = doc.querySelector('.' + id);

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
			element.src = value;
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
		download.href = 'data:text/html, ' + html; 
		download.classList.remove('is-hidden');
		prepare.classList.add('is-hidden');
		console.log('prepareHTML', html);
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