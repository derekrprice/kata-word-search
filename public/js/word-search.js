(() => {
	document.addEventListener('DOMContentLoaded', () => {
		document.getElementById('file').addEventListener('change', () => {
			document.getElementById('upload-form').submit();
		});
	});
})();
