# node-azuki
A string template engine for NodeJs, treating everything as pure strings thus templates are included but not limited to HTML!

[![Build Status](https://travis-ci.org/momocow/node-azuki.svg?branch=master)](https://travis-ci.org/momocow/node-azuki)
[![Coverage Status](https://coveralls.io/repos/github/momocow/node-azuki/badge.svg?branch=master)](https://coveralls.io/github/momocow/node-azuki?branch=master)
[![npm](https://img.shields.io/npm/v/azuki.svg)](https://www.npmjs.com/package/azuki)
[![GitHub](https://img.shields.io/github/license/momocow/node-azuki.svg)](https://github.com/momocow/node-azuki)


> [NodeJs VM](https://nodejs.org/api/vm.html) is used to evaluate expressions in templates; therefore, it currently has no browser support!

## API
```ts
import {
  Azuki,
  AzukiParser,
  parseFile
} from 'azuki'
```

### new Azuki()

### new AzukiParser()

### parseFile()
- Overloads
  - (`src`, `dict`, `parserOptions`?, `encoding`?): Promise&lt;string&gt;
  - (`src`, `dest`, `dict`, `parserOptions`?, `encoding`?): Promise&lt;void&gt;
- Parameters
  - `src` string
  - `dest` string
  - `dict` {[key: string]: string}
  - `parserOptions` [ParserOptions](#parseroptions)
  - `encoding` string (Default: `"utf8"`)

### ParserOptions
```ts
interface ParserOptions {
  /**
   * @default "{%"
   */
  startingBrace?: string

  /**
   * @default "%}"
   */
  endingBrace?: string

  /**
   * Throw the evaluation error or not. (e.g. TypeError or xxx is undefined.)
   */
  throws?: boolean,

  /**
   * Only effective if `throws` is false,
   * this property will serve as the default value of the evaluation result.
   */
  defaultReplacement?: string
}
```