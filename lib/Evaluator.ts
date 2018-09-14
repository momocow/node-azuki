import { runInContext, createContext, Context } from 'vm'

interface EvaluatorOptions {
  filename?: string,
  lineOffset?: number
  columnOffset?: number
}

export class Evaluator {
  private readonly _dict: Context
  private readonly _options: EvaluatorOptions = {}

  constructor (dict: {[key: string]: string} = {}, options?: EvaluatorOptions) {
    const clone = Object.assign({}, dict)
    this._dict = createContext(Object.freeze(clone))
    Object.assign(this._options, options)
  }

  evaluate (code: string) {
    return runInContext(code, this._dict, {
      ...this._options,
      displayErrors: true
    })
  }
}
