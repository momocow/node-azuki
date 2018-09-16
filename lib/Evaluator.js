"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm_1 = require("vm");
class Evaluator {
    constructor(dict = {}, filename) {
        this.filename = filename;
        const clone = Object.assign({}, dict);
        this._dict = vm_1.createContext(Object.freeze(clone));
    }
    evaluate(code, lineOffset, columnOffset) {
        return vm_1.runInContext(code, this._dict, {
            filename: this.filename,
            lineOffset,
            columnOffset,
            displayErrors: false
        }) || undefined;
    }
}
exports.Evaluator = Evaluator;
