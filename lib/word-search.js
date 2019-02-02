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

function checkwordfromstart (x, y, xdir, ydir, needle) {
    // Already found char 0 at x, y.
    let matched = [`(${x},${y})`];
    for (let i = 1;
         i < needle.length
         && x+i*xdir < maxx
         && y+i*ydir < maxy && y+i*ydir >= 0;
         i++
    ) {
        if (haystack[y+i*ydir][x+i*xdir] === needle.charAt(i)) {
            matched.push(`(${x+i*xdir},${y+i*ydir})`);
        } else {
            break;
        }
    }
    if (matched.length === needle.length) {
        return matched.join(",");
    }

    return false;
}

function find (needle) {
    for (let x = 0; x < maxx; x++) {
        for (let y = 0; y < maxy; y++) {
            if (haystack[y][x] === needle.charAt(0)) {
                for (let xdir = -1; xdir < 2; xdir++) {
                    for (let ydir = -1; ydir < 2; ydir++) {
                        let found = checkwordfromstart (x, y, xdir, ydir, needle);
                        if (found) {
                            return `${needle}: ${found}`
                        }
                    }
                }
            }
        }
    }

    return '';
}

exports.search = (file) => {

	parseFile (file);

    let output = "";
    needles.forEach((needle) => {
		output += find (needle) + "\n";
	});
    return output;
};
