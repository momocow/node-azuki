import { createReadStream, createWriteStream } from 'fs'
import { resolve as resolvePath } from 'path'
import s2p = require('stream-to-promise')

import { AzukiTransform } from './AzukiTransform'
import { ParserOptions } from './AzukiParser'
import { Readable } from 'stream'

/**
 * File mode
 */
export function parseFile (src: string, dest: string, dict: Record<string, string>,
  parserOptions?: ParserOptions, encoding?: string): Promise<void>
/**
 * String mode
 */
export function parseFile (src: string, dict: Record<string, string>,
  parserOptions?: ParserOptions, encoding?: string): Promise<string>
export function parseFile (
  src: string,
  destOrDict: string | Record<string, string>,
  dictOrParserOpts?: Record<string, string> | ParserOptions,
  parserOptsOrEncoding?: ParserOptions | string,
  encoding: string = 'utf8'
): Promise<void> | Promise<string> {
    const mode = typeof destOrDict === 'string' ? 'file' : 'string'

    const dest = <string>(mode === 'file' ? destOrDict : '')
    const dict = <Record<string, string>>(mode === 'file' ? dictOrParserOpts : destOrDict)
    const parserOptions = <ParserOptions>(mode === 'file' ? parserOptsOrEncoding : dictOrParserOpts)
    encoding = typeof parserOptsOrEncoding === 'string' ? parserOptsOrEncoding : encoding

    const ostream = createReadStream(
      resolvePath(process.cwd(), src),
      encoding
    )
      .pipe(new AzukiTransform(dict, parserOptions))

    return mode === 'file' ? s2p(
      ostream.pipe(
        createWriteStream(
          resolvePath(process.cwd(), dest),
          encoding
        )
      )
    ) : (s2p(<Readable>ostream)).then(function (buf: Buffer) {
      return buf.toString(encoding)
    })
}
