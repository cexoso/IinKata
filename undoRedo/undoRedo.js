const im = require("immutable");
function undoRedo(object) {
    let obj = im.fromJS(object);
    let index = 0;
    const stack = [obj];
    
	return {
		set(key,value) {
            obj = obj.set(key,value);
            index ++;
            stack.splice(index);
            stack.push(obj);            
        },
		get(key) {
            return obj.get(key);
        },
		del(key) {
            obj = obj.set(key,void 0);
            index ++;
            console.log(index)
            stack.splice(index);
            stack.push(obj);
        },
		undo() {            
            const o = stack[--index];
            if (o) {
                obj = o;
            } else {
                throw new Error("can't undo");
            }
        },
		redo() {
            const o = stack[++index];
            if (o) {
                obj = o;
            } else {
                throw new Error("can't redo");
            }
        },
        show() {
            console.log("--------------------------\n")
            console.log(`obj:${obj}`);
            console.log(`stack:${stack}`);
            console.log(`index:${index}`)
            console.log("--------------------------\n")
        }
	};
}

const obj = {
    x: 1,
    y: 2
};
const unRe = undoRedo(obj);
console.assert(unRe.get("y") === 2,"y should be 2");
unRe.set('y', 10);//
unRe.show();
console.assert(unRe.get("y") === 10,"y should be 10");
unRe.undo();
unRe.show();
console.assert(unRe.get("y") === 2,"y should be 2");
unRe.del("x")//
unRe.show();
console.assert(unRe.get("x") === void 0,"x should be undefined");
unRe.undo();
console.assert(unRe.get("x") === 1,"x should be 3");
unRe.show();
unRe.set("z",1)//
unRe.show();
unRe.undo();
unRe.show();
console.assert(unRe.get("z") === void 0,"z should be undefined");
unRe.show();
unRe.redo();
unRe.show();
console.assert(unRe.get("z") === 1,"z should be 1");
