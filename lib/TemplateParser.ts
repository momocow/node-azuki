import { Evaluator } from './Evaluator'

interface ParserOptions {
  startingBrace?: string
  endingBrace?: string
}

export class TemplateParser {
  private readonly _options: ParserOptions = {
    startingBrace: '{%',
    endingBrace: '%}'
  }

  constructor (options?: ParserOptions) {
    Object.assign(this._options, options)
  }

  parse (template: string, dict?: {[key: string]: string}) {
    const evaluator = new Evaluator(dict)
    const { startingBrace, endingBrace } = this._options

    const stack = []

    for (let ch of template) {
      switch (ch) {
        case startingBrace:
        case endingBrace:

      }
      stack.push(ch)
    }

    return stack.join('')
  }
}
