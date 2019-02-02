
exports.search = (file) => {
	var lines = file.split(/\n/);

	var line1 = lines.shift();
	var needles = line1.split(/,/);

	var haystack = [];
	lines.forEach((line) => {
		haystack.push(line.split(/,/));
	});

	return {needles: needles, haystack: haystack};
};
