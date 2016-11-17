function generator(sequencer,...o) {
    const next = sequencer.apply(this,o);
    const gener = {}
    function generNext() {
        const res = next.apply(this);        
        if (res !== "End of sequence error expected") {
            gener.next = function () {
                generNext();
                return res;
            }
        } else {
            gener.next = "End of sequence error expected"
        }        
    }
    generNext();
    return gener;
}
function dummySeq() {
  return function() {
    return "dummy";
  };
}

function factorialSeq(i = 0,acc = 1) {
    return function () {     
        const res = i === 0 ? acc : acc *= i;
        i++;   
        return res;
    }
}

function fibonacciSeq([prev,curr] = [0,1]) {
    return function () {
        [prev,curr] = [curr,prev + curr];
        return prev;
    }
}

function rangeSeq(start = 0, step = 1) {
    return function () {
        const res = start;
        start += step;
        return res
    }
}

function primeSeq(x = 2) {
    function isprime(x) {
        let i = 2; 
        let k = ~~Math.sqrt(x);        
        for (;i <= k; i ++ ) {
            if (x % i === 0 ) {
                return false;
            }
        }
        return i > k;
    }
    return function () {
        for(let i = x;;i++) {
            if (isprime(i)) {
                x = i + 1
                return i;
            }
        }
    }
}
function partialSumSeq(...o) {
    let sum = 0;
    return function () {
        let x;
        [x,...o] = o;
        return x !== void 0 ? sum += x : 'End of sequence error expected'
    }
}