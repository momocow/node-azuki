# node-azuki
A string template engine for NodeJs, treating everything as pure strings thus templates are included but not limited to HTML!

[![Build Status](https://travis-ci.org/momocow/node-azuki.svg?branch=master)](https://travis-ci.org/momocow/node-azuki)
[![Coverage Status](https://coveralls.io/repos/github/momocow/node-azuki/badge.svg?branch=master)](https://coveralls.io/github/momocow/node-azuki?branch=master)
[![npm](https://img.shields.io/npm/v/azuki.svg)](https://www.npmjs.com/package/azuki)
[![GitHub](https://img.shields.io/github/license/momocow/node-azuki.svg)](https://github.com/momocow/node-azuki)


> [NodeJs VM](https://nodejs.org/api/vm.html) is used to evaluate expressions in templates; therefore, it currently has no browser support!

## Example
javascript
```js
const { Azuki, parseFile } = require('azuki')
// dictionary
const dict = {
  test: 't_e_s_t',
  nested: 'test',
  // other js variables are allowed
  num: 1
}

const parser = new Azuki(dict)

// Using Nodejs Stream API
fs.createReadStream('/path/to/template')
  .pipe(parser)
  .pipe(fs.createWriteStream('/path/to/output'))

// Or using `parseFile` utility function
parseFile('/path/to/template', dict)
  .then(function (result) {
    console.log(result)
    // "This is a t_e_s_t!\nNested case: "t_e_s_t"\nConditional case: 1"
  })

parseFile('/path/to/template', '/path/to/output', dict)
  .then(function () {
    console.log(fs.readFileSync('/path/to/output', 'utf8'))
    // "This is a t_e_s_t!\nNested case: "t_e_s_t"\nConditional case: 1"
  })
```

template
```
This is a {% test %}!
Nested case: "{% {% nested %} %}"
Conditional case: {% num === 1 ? '1' : '2' %}
```

output
```
This is a t_e_s_t!
Nested case: "t_e_s_t"
Conditional case: 1
```

## Caveat
Avoid using preserved words as dictionary keys. Preserved words are e.g. built-in objects and functions any [standard global object](https://es5.github.io/#x15.1) has. Also see [vm.createContext()](https://nodejs.org/api/vm.html#vm_vm_createcontext_sandbox_options) in the Nodejs official document.
- `JSON`
- `this`
- `console`
- `toString`

(Which also means that you can utilize such functions like `JSON.parse` and `JSON.stringify` in the template.)

## API
> WIP

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