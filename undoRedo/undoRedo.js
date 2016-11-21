const onlySet = obj => key => value => obj[key] = value
const onlyGet = obj => key => obj[key];
const onlyDel = obj => key => delete obj[key];
const setRecord = stack => index => fun => {    
    stack[index] = fun
    stack.splice(index + 1);    
};
const getRecord = stack => index => stack[index];
function undoRedo(object) {
    const onlySetObj = onlySet(object);
    const onlygetObj = onlyGet(object);
    const onlyDelObj = onlyDel(object);
    const stack = [];
    let index = -1;
    const setRecordStack = setRecord(stack);
    const getRecordStack = getRecord(stack);
    function generRecord({obj,k,v,isDel}) {
        if (Object.prototype.hasOwnProperty.call(obj,k)) {
            const old = obj[k];
            return {
                "undo": ()=>onlySetObj(k)(old),
                "redo": ()=>isDel ? onlyDelObj(k) : onlySetObj(k)(v)
            }
        } else {            
            return {
                "undo": ()=>onlyDelObj(k),
                "redo": ()=>onlySetObj(k)(v)
            }
        }
    }
	return {
		set(key,value) {
            const record = generRecord({obj: object,k: key,v: value,isDel: false});
            setRecordStack(++ index)(record);
            record.redo();            
        },
		get(key) {
            return onlygetObj(key);
        },
		del(key) {
            const record = generRecord({obj: object,k: key,v: null,isDel: true});
            setRecordStack(++ index)(record);
            record.redo();
        },
		undo() {
            if (index !== -1) {
                const record = getRecordStack(index--);
                record.undo()
            } else {
                throw new Error("can't undo");
            }
        },
		redo() {
            if (index + 1 < stack.length) {
                const record = getRecordStack(++index);
                record.redo();
            } else {
                throw new Error("can't redo");
            }
        }        
	}
}