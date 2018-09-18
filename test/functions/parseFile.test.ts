import { test } from 'ava'

import { parseFile } from '../..'
import { templateFile, dict } from '../fixture'

test('parseFile(src, dict): Promise<Buffer>', async function (t) {
  const buf = await parseFile(templateFile, dict)
  t.is(buf, '這是一個測試')
})
