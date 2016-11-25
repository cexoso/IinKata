// 未完成 我把题目丢了
function lastDigit(as){
    const [base,...xs] = as;
    if (base === 0 || base === void 0) return 1;    
    const map = [
        [0],
        [1],
        [2,4,8,6],
        [1,3,9,7],
        [4,6],
        [5],
        [6],
        [1,7,9,3],
        [6,8,4,2],
        [1,9]
    ];
    const last = map[base % 10];
    console.log(last)
    const {length} = last;
    let acc = xs.reduce((acc,x)=>{
        return (x * acc) % length;
    },1);
    console.log(acc);
    return last[acc];
}
console.log(lastDigit([4,3,6]))