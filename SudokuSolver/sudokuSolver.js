const reduce = (arr,fun,acc) => arr.reduce(fun,acc);
const map = (arr,fun) => arr.map(fun);
const indexOf = (xs,x) => xs.indexOf(x);
const filter = (arr,fun) => arr.filter(fun);
const getRow = puzzle => row => col => filter(puzzle[row],(c,i)=> i !== col && c !== 0);
const getCol = puzzle => row => col => filter(map(puzzle,(r)=>r[col]),(r,i)=> i !== row && r !== 0);
const getSqrt = puzzle => row => col => {
    const lr = Math.floor(row / 3) * 3;
    const lc = Math.floor(col / 3) * 3;
    return reduce(puzzle,(rowAcc,rowValue,row)=>row >= lr && row < lr + 3 ? rowAcc.concat(reduce(rowValue,(colAcc,colValue,col)=>col >= lc && col < lc + 3 && colValue !== 0 ? (colAcc.push(colValue),colAcc) : colAcc,[])) : rowAcc,[]);    
}
const num = Array.from({length: 9},(_,i)=>i + 1);
const solve = (puzzle,allIndex,index) => {
    const {length} = allIndex;    
    while (index >= 0 && index < length) {
        const {row,col} = allIndex[index];
        const current = puzzle[row][col];
        const disabled = [...getRow(puzzle)(row)(col),...getCol(puzzle)(row)(col),...getSqrt(puzzle)(row)(col)];
        const enabled = filter(num,i=>indexOf(disabled,i) === -1 && i > current);
        const [head,...tail] = enabled;        
        if (head !== void 0) {
            puzzle[row][col] = head;
            index ++;
        } else {
            puzzle[row][col] = 0;
            index --;
        }
    }        
    return index = length ? puzzle : "无解";
}
function sudoku(puzzle) {
    const allIndex = reduce(puzzle,(rowAcc,rowValue,row)=>rowAcc.concat(reduce(rowValue,(colAcc,colValue,col)=>colValue === 0 ? (colAcc.push({row,col}),colAcc) : colAcc,[])),[]);    
    return solve(puzzle,allIndex,0);
}
var puzzle = [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]];
console.log(sudoku(puzzle))