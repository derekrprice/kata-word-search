let needles;
let haystack;
let maxx;
let maxy;

function parseFile (file) {
    let lines = file.split(/\n/);

    let line1 = lines.shift();
    needles = line1.split(/,/);

	haystack = [];
	lines.forEach((line) => {
		haystack.push(line.split(/,/));
	});

	maxy = haystack.length;
	maxx = haystack[0].length;
}

function findhorizontal (x, y, needle) {
    // Already found char 0 at x, y.
    let matched = [`(${x},${y})`];
    for (let i = 1; i < needle.length && i+x < maxx; i++) {
        if (haystack[y][x+i] === needle.charAt(i)) {
            matched.push(`(${x+i},${y})`);
        }
    }
    if (matched.length === needle.length) {
        return matched.join(",");
    }

    return false;
}

function find (needle) {
    let found = false;

    for (let x = 0; x < maxx && !found; x++) {
        for (let y = 0; y < maxy && !found; y++) {
            if (haystack[y][x] === needle.charAt(0) && (found = findhorizontal (x, y, needle))) {
                return `${needle}: ${found}`;
            }
        }
    }
}

exports.search = (file) => {

	parseFile (file);

    let output = "";
    needles.forEach((needle) => {
		output += find (needle) + "\n";
	});
    return output;
};
