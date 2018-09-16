"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Evaluator_1 = require("./Evaluator");
class AzukiParser {
    constructor(dict, options) {
        this.dict = {};
        this._options = {
            startingBrace: '{%',
            endingBrace: '%}',
            throws: false
        };
        this.dict = dict || {};
        Object.assign(this._options, options);
    }
    load(dict, overwrite = true) {
        for (const [key, value] of Object.entries(dict)) {
            this.set(key, value, overwrite);
        }
        return this;
    }
    set(key, value, overwrite = true) {
        if (overwrite || !(key in this.dict)) {
            this.dict[key] = value;
        }
        return this;
    }
    parse(template, options) {
        const { filename = undefined, lineOffset = undefined, columnOffset = undefined } = options || {};
        const { startingBrace, endingBrace, throws } = this._options;
        const evaluator = new Evaluator_1.Evaluator(this.dict, filename);
        do {
            const exprEnd = template.indexOf(endingBrace);
            if (exprEnd < 0)
                break;
            const exprStart = template.substr(0, exprEnd).lastIndexOf(startingBrace) + startingBrace.length;
            if (exprStart < 0)
                break;
            const expr = template.substring(exprStart, exprEnd);
            let result = '';
            try {
                result = `${evaluator.evaluate(expr, lineOffset, columnOffset)}`;
            }
            catch (e) {
                if (throws)
                    throw e;
            }
            template = replaceString(template, exprStart - startingBrace.length, exprEnd + endingBrace.length, result);
        } while (1);
        return template;
    }
}
exports.AzukiParser = AzukiParser;
function replaceString(subject, start, end, replacement) {
    return subject.substring(0, start) + replacement + subject.substr(end);
}
