const _ = require("lodash")
const {
    property, range, set, at, reject, get, times, map, eq, curry,
    unary, reduce, reduceRight, partial,
    includes, head, filter, flowRight, compact, size, lte,
    every, zipWith, isEqual
} = _
const eq0 = partial(eq, 0)
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
const validate = curry(function (isFullFilled, pairs, clues) {
    const ret = zipWith(pairs, clues, function (p, c) {
        if (eq0(c)) {
            return true
        }
        const fn = curry(isFullFilled ? eq : lte)
        return fn(p, c)
    })
    return every(ret)
})
const getConfig = ({ length }) => {
    return {
        enumNum: range(1, length + 1)
    }
}
const getCol = curry(function (data, j) {
    return map(data, property(j))
})
const getCurrent = ({ data, length, index, cluesList }) => {
    const i = ~~(index / length)
    const j = index % length
    const rowClues = at(cluesList, [cluesList.length - 1 - i, length + i])
    const colClues = at(cluesList, [j, 3 * length - 1 - j])
    return {
        i,
        j,
        row: data[i],
        col: getCol(data, j),
        rowClues,
        colClues
    }
}
const isFullFilled = length => flowRight(partial(eq, length), size, compact)
const solvePuzzle = list => {
    const length = list.length / 4
    const ret = times(length, () => new Array(length))
    
    const { enumNum } = getConfig({ length })
    let index = 0;
    
    const retLength = length * length
    while (index < retLength) {
        const { i, j, row, col, rowClues, colClues } = getCurrent({ data: ret, length, index, cluesList: list })
        
        const current = ret[i][j];
        const isLengthFull = isFullFilled(length)
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
                if (validate(isLengthFull(row), visitRow, rowClues) && validate(isLengthFull(afterCol), visitCol, colClues)) {
                    index++;
                }
            } else {
                ret[i][j] = undefined
                index--;
            }
        }
        console.log(ret)
    }
    return ret
}
module.exports = {
    getVisitCount,
    gHightCounts,
    solvePuzzle,
    validate
}