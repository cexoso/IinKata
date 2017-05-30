const _ = require("lodash")
const {
    property, range, set, at, reject, get, times, map,
    unary, reduce, reduceRight, partial,
    includes, head, filter
} = _
const gHightCounts = fromRight => xs => {
    const handle = fromRight ? reduceRight : reduce;
    const ret = handle(map(xs, x => ({ count: 1, value: x })), (acc, x) => {
        if (x.value > acc.value) {
            acc.value = x.value;
            acc.count++
        }
        return acc
    });
    return get(ret, "count", 0)
}
const gHightCountsFromRight = gHightCounts(true)
const gHightCountsFromLeft = gHightCounts(false)
function getVisitCount(xs) {
    return [gHightCountsFromLeft(xs), gHightCountsFromRight(xs)]
}
const validate = pairs => clues => pairs[0] <= clues[0] && pairs[1] <= clues[1]
const getEnumNum = length => range(1, length + 1)
const getCol = data => j => map(data, property(j))
const getCurrent = ({ data, length, index, cluesList }) => {
    const i = ~~(index / length)
    const j = index % length
    const rowClues = at(cluesList, [cluesList.length - 1 - i, length + i])
    const colClues = at(cluesList, [j, 3 * length - 1 - j])
    return {
        i,
        j,
        row: data[i],
        col: getCol(data)(j),
        rowClues,
        colClues
    }
}
const solvePuzzle = list => {
    const length = Math.sqrt(list.length)
    const ret = times(length, () => new Array(length))
    const enumNum = getEnumNum(length)    
    let index = 0;
    while (index < list.length) {
        const { i, j, row, col, rowClues, colClues } = getCurrent({ data: ret, length, index, cluesList: list })
        const current = ret[i][j];
        if (ret[i][j] > length) {
            ret[i][j] = undefined
            index--;
        } else {
            const setCurrent = partial(set, ret, `${i}.${j}`)
            const maybe = reject(enumNum, unary(partial(includes, [...row, ...col, current])))
            const first = head(filter(maybe, i => current !== undefined ? i > current : true))
            if (first !== undefined) {
                setCurrent(first)
                const afterCol = getCol(ret)(j);
                const afterRow = row;
                const visitRow = getVisitCount(afterRow)
                const visitCol = getVisitCount(afterCol)
                if (validate(visitRow)(rowClues) && validate(visitCol)(colClues)) {
                    index++;
                }
            } else {
                ret[i][j] = undefined
                index--;
            }
        }
    }
    return ret
}
module.exports = {
    getVisitCount,
    gHightCounts,
    solvePuzzle
}
