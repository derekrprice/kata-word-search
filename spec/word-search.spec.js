/*
 * Unit tests for lib/word-search.js
 */

describe('kata-word-search', function() {

    let app;

    let haystack = `U,M,K,H,U,L,K,I,N,V,J,O,C,W,E
L,L,S,H,K,Z,Z,W,Z,C,G,J,U,Y,G
H,S,U,P,J,P,R,J,D,H,S,B,X,T,G
B,R,J,S,O,E,Q,E,T,I,K,K,G,L,E
A,Y,O,A,G,C,I,R,D,Q,H,R,T,C,D
S,C,O,T,T,Y,K,Z,R,E,P,P,X,P,F
B,L,Q,S,L,N,E,E,E,V,U,L,F,M,Z
O,K,R,I,K,A,M,M,R,M,F,B,A,P,P
N,U,I,I,Y,H,Q,M,E,M,Q,R,Y,F,S
E,Y,Z,Y,G,K,Q,J,C,C,Q,W,Y,A,K
S,J,F,Z,M,Q,I,B,D,H,E,M,K,W,D
T,G,L,B,H,C,B,E,C,H,E,O,Y,I,K
O,J,Y,E,U,L,N,C,C,L,Y,K,Z,U,H
W,Z,M,I,S,U,K,U,R,B,I,D,O,X,S
K,Y,L,B,Q,Q,P,M,D,F,C,K,E,V,B`;

    // call the init function of calculator to register DOM elements
    beforeEach(() => {
        app = require('../lib/word-search');
    });

    afterEach(() => {
        app = undefined;
    });

    it('fails to find missing word', function () {
        expect(app.search("DEREK\n" + haystack)).toBe('\n');
    });

    it('should search horizontally', function () {
        expect(app.search("SCOTTY\n" + haystack)).toBe('SCOTTY: (0,5),(1,5),(2,5),(3,5),(4,5),(5,5)\n');
    });

    it('should search vertically', function () {
        expect(app.search("BONES\n" + haystack)).toBe('BONES: (0,6),(0,7),(0,8),(0,9),(0,10)\n');
    });

    it('should search diagonally descending', function () {
        expect(app.search("SPOCK\n" + haystack)).toBe('SPOCK: (2,1),(3,2),(4,3),(5,4),(6,5)\n');
    });

    it('should search diagonally ascending', function () {
        expect(app.search("CHEKOV\n" + haystack)).toBe('CHEKOV: (8,9),(9,10),(10,11),(11,12),(12,13),(13,14)\n');
    });

});
