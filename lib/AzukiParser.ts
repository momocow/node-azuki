import { Evaluator } from './Evaluator'
import { RunningScriptOptions } from 'vm'

export interface ParserOptions {
  startingBrace?: string
  endingBrace?: string
  throws?: boolean,
  defaultReplacement?: string
}

export class AzukiParser {
  private dict: {[key: string]: string} = {}
  private readonly _options: ParserOptions = {
    startingBrace: '{%',
    endingBrace: '%}',
    throws: false
  }

  get startingBrace () {
    return this._options.startingBrace
  }

  get endingBrace () {
    return this._options.endingBrace
  }

  constructor (dict?: {[key: string]: string}, options?: ParserOptions) {
    this.dict = dict || {}
    Object.assign(this._options, options)
  }

  load (dict: {[key: string]: string}, overwrite: boolean = true): this {
    for (const [ key, value ] of Object.entries(dict)) {
      this.set(key, value, overwrite)
    }
    return this
  }

  set (key: string, value: string, overwrite: boolean = true): this {
    if (overwrite || !(key in this.dict)) {
      this.dict[key] = value
    }
    return this
  }

  parse (template: string, options?: RunningScriptOptions) {
    const {
      filename = undefined,
      lineOffset = undefined,
      columnOffset = undefined
    } = options || {}

    const {
      startingBrace,
      endingBrace,
      throws,
      defaultReplacement
    } = this._options

    const evaluator = new Evaluator(this.dict, filename)

    do {
      const exprEnd = template.indexOf(endingBrace)
      if (exprEnd < 0) break

      const exprStart = template.substr(0, exprEnd).lastIndexOf(startingBrace) + startingBrace.length
      if (exprStart < 0) break

      const expr = template.substring(exprStart, exprEnd)
      let result = defaultReplacement
      try {
        result = `${evaluator.evaluate(expr, lineOffset, columnOffset)}`
      } catch (e) {
        if (throws) throw e
      }
      template = replaceString(
        template, exprStart - startingBrace.length, exprEnd + endingBrace.length, result)
    } while (1)

    return template
  }
}

function replaceString (subject: string, start: number, end: number, replacement: string) {
  return subject.substring(0, start) + replacement + subject.substr(end)
}
