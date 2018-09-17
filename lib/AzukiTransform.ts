import { AzukiParser, ParserOptions } from './AzukiParser'
import { Transform, TransformOptions } from "stream"
import { RunningScriptOptions } from 'vm'

type ExcludedTransformOptions = "objectMode" |
  "readableObjectMode" |
  "writableObjectMode" |
  "read" |
  "write" |
  "writev" |
  "final" |
  "destroy" |
  "decodeStrings" |
  "transform" |
  "flush"

export type AzukiTransformOptions = {
  [K in Exclude<keyof TransformOptions, ExcludedTransformOptions>]: TransformOptions[K]
}

/**
 * Forced to use non-object mode
 */
export class AzukiTransform extends Transform {
  private readonly _parser: AzukiParser
  private _buf: string = ''

  constructor (
    dict: {[key: string]: string} = {},
    parserOptions?: ParserOptions,
    transformOptions?: AzukiTransformOptions
  ) {
    super({
      ...transformOptions,
      objectMode: false,
      readableObjectMode: false,
      writableObjectMode: false,
      decodeStrings: false
    })

    this._parser = new AzukiParser(dict, parserOptions)
  }

  _flush (callback: Function) {
    if (this._buf) this.push(this._buf)
    callback()
  }

  _transform (chunk: string, encoding: string, callback: (err?: Error, output?: string) => void) {
    let result = this._parser.parse(this._buf + chunk)

    const remains = result.indexOf(this._parser.startingBrace)
    if (remains >= 0) {
      this.push(result.substr(0, remains))
      this._buf = result.substr(remains)
    } else {
      this.push(result)
      this._buf = ''
    }
    callback()
  }

  load (dict: {[key: string]: string}, overwrite: boolean) {
    this._parser.load(dict, overwrite)
    return this
  }

  set (key: string, value: string, overwrite: boolean) {
    this._parser.set(key, value, overwrite)
    return this
  }

  parse (template: string, options?: RunningScriptOptions) {
    return this._parser.parse(template, options)
  }
}
