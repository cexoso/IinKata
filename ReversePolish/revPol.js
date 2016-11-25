const split = expr => sp => expr.split(sp);
const parseNum = str => !isNaN(parseFloat(str)) ? parseFloat(str) : str;
const add = x1 => x2 => x1 + x2;
const sub = x1 => x2 => x1 - x2;
const div = x1 => x2 => x1 / x2;
const mult = x1 => x2 => x1 * x2;
const flit = fun => x1 => x2 => fun(x2)(x1);
function reversePolish(sp) {
    const res = [];
    let x;    
    while ((x = sp.pop()) !== void 0) {
        switch (x) {
            case '+':                
                res.push(add(res.pop())(res.pop()));
                break;
            case '-':
                res.push(flit(sub)(res.pop())(res.pop()));
                break;
            case '*':
                res.push(mult(res.pop())(res.pop()));
                break;
            case '/':
                res.push(flit(div)(res.pop())(res.pop()));
                break;
            default:
                res.push(x);          
        }
    }
    return res.pop();
}
function calc(expr) {
    return expr === "" ? 0 : reversePolish(split(expr)(" ").map(parseNum).reverse());    
}
console.assert(calc("") === 0,"Should work with empty string")
console.assert(calc("1 2 3") === 3, "Should parse numbers");
console.assert(calc("1 2 3.5") === 3.5, "Should parse float numbers");
console.assert(calc("1 3 +") === 4, "Should support addition");
console.assert(calc("1 3 *") === 3, "Should support multiplication");
console.assert(calc("1 3 -") === -2, "Should support subtraction");
console.assert(calc("4 2 /") === 2, "Should support division");