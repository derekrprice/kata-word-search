let needles;
let haystack;
let maxx;
let maxy;

/**
 * Parse a text file into a list of needles and a haystack array.  The text file may use Windows or UNIX style
 * EOLs.
 * @param {string} file - The file to parse.
 */
function parseFile (file) {
    let lines = file.split(/\n/);

    let line1 = lines.shift().trim();
    needles = line1.split(/,/);

	haystack = [];
	lines.forEach((line) => {
		haystack.push(line.trim().split(/,/));
	});

	maxy = haystack.length;
	maxx = haystack[0].length;
}

/**
 * Starting at matched character at location x, y, check if the remainder of the word exists along a vector.
 * @param {int} x - x coordinate of starting search location.
 * @param {int} y - y component of starting search location.
 * @param {int} xdir - x component of search vector.
 * @param {int} ydir - y component of search vector.
 * @param {string} needle - The word to search for.
 * @returns {*}
 */
function checkwordvector (x, y, xdir, ydir, needle) {
    // Already found char 0 at x, y.
    let matched = [`(${x},${y})`];
    for (let i = 1;
         i < needle.length
         && x+i*xdir < maxx && x+i*xdir >= 0
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

/**
 * Given a position containing the first character of a word, check each possible vector for the word.
 * @param needle
 * @param {int} x - x coordinate of starting search location.
 * @param {int} y - y component of starting search location.
 * @param {string} needle - The word to search for.
 * @returns {*}
 */
function checkwordfromstart (x, y, needle) {
    // Check the word along each allowed vector.
    for (let xdir = -1; xdir < 2; xdir++) {
        for (let ydir = -1; ydir < 2; ydir++) {
            let found = checkwordvector (x, y, xdir, ydir, needle);
            if (found) {
                return found;
            }
        }
    }
}

/**
 * Search haystack for a word.
 * @param {string} needle - The word to search for.
 * @returns {string} - The list of word coordinates or false, if not found.
 */
function find (needle) {
    // Check for the first character of the word.
    for (let x = 0; x < maxx; x++) {
        for (let y = 0; y < maxy; y++) {
            if (haystack[y][x] === needle.charAt(0)) {
                let found = checkwordfromstart (x, y, needle);
                if (found) {
                    return found;
                }
            }
        }
    }

    return false;
}

/**
 * Parse data into a list of needles and a square haystack and return the locations of each needle found.  Example
 * file format:
 * <pre>
 *     BONES,KHAN,KIRK,SCOTTY,SPOCK,SULU,UHURA
 *     U,M,K,H,U,L,K,I,N,V,J,O,C,W,E
 *     L,L,S,H,K,Z,Z,W,Z,C,G,J,U,Y,G
 *     H,S,U,P,J,P,R,J,D,H,S,B,X,T,G
 *     B,R,J,S,O,E,Q,E,T,I,K,K,G,L,E
 *     A,Y,O,A,G,C,I,R,D,Q,H,R,T,C,D
 *     S,C,O,T,T,Y,K,Z,R,E,P,P,X,P,F
 *     B,L,Q,S,L,N,E,E,E,V,U,L,F,M,Z
 *     O,K,R,I,K,A,M,M,R,M,F,B,A,P,P
 *     N,U,I,I,Y,H,Q,M,E,M,Q,R,Y,F,S
 *     E,Y,Z,Y,G,K,Q,J,P,C,Q,W,Y,A,K
 *     S,J,F,Z,M,Q,I,B,D,B,E,M,K,W,D
 *     T,G,L,B,H,C,B,E,C,H,T,O,Y,I,K
 *     O,J,Y,E,U,L,N,C,C,L,Y,B,Z,U,H
 *     W,Z,M,I,S,U,K,U,R,B,I,D,U,X,S
 *     K,Y,L,B,Q,Q,P,M,D,F,C,K,E,A,B
 * </pre>
 * @param file
 * @returns {string}
 */
exports.search = (file) => {

	parseFile (file);

    let output = [];
    needles.forEach((needle) => {
		let found = find (needle);
		if (found) {
		    output.push(`${needle}: ${found}`);
        }
	});
    return output.join("\n") + "\n";
};
