import { runInContext, createContext, Context } from 'vm'

export class Evaluator {
  private readonly _dict: Context

  constructor (dict: {[key: string]: string} = {}, public readonly filename?: string) {
    const clone = Object.assign({}, dict)
    this._dict = createContext(Object.freeze(clone))
  }

  evaluate (code: string, lineOffset?: number, columnOffset?: number) {
    return runInContext(code, this._dict, {
      filename: this.filename,
      lineOffset,
      columnOffset,
      displayErrors: false
    })
  }
}
