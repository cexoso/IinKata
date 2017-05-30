const expect = require('chai').expect;
const m = require("../4by4Skyscrapers/answers")

const { validate, solvePuzzle, getVisitCount, gHightCounts } = m


describe('4by4Skyscrapers', function () {
    it('getVisitCount', function () {
        expect(getVisitCount([4, 3, 2, 1])).to.be.eqls([1, 4])
        expect(getVisitCount([2, 3, 4, 1])).to.be.eqls([3, 2])
    });
    it("getHightCount", function () {
        expect(gHightCounts(false)([4, 3, 2, 1])).to.be.eq(1)
        expect(gHightCounts(true)([4, 3, 2, 1])).to.be.eq(4)
        expect(gHightCounts(false)([2, 3, 4, 1])).to.be.eq(3)
        expect(gHightCounts(true)([2, 3, 4, 1])).to.be.eq(2)
    })
    it("validate", function () {
        expect(validate(true, [1, 1], [1, 1])).to.be.eq(true)
        expect(validate(true, [1, 1], [0, 1])).to.be.eq(true)
        expect(validate(false, [1, 1], [0, 1])).to.be.eq(true)
    })
    it("can solve 4x4 puzzle 1", function () {
        var clues = [
            2, 2, 1, 3,
            2, 2, 3, 1,
            1, 2, 2, 3,
            3, 2, 1, 3
        ];
        var expected = [
            [1, 3, 4, 2],
            [4, 2, 1, 3],
            [3, 4, 2, 1],
            [2, 1, 3, 4]
        ];
        var actual = solvePuzzle(clues);
        expect(expected).to.be.eqls(actual);
    })
    it("can solve 4x4 puzzle 2", function () {
        var clues = [
            0, 0, 1, 2,
            0, 2, 0, 0,
            0, 3, 0, 0,
            0, 1, 0, 0
        ];
        var expected = [
            [2, 1, 4, 3],
            [3, 4, 1, 2],
            [4, 2, 3, 1],
            [1, 3, 2, 4]
        ];
        var actual = solvePuzzle(clues);
        expect(expected).to.be.eqls(actual);
    })

});

