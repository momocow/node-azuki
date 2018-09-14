const arr = '1'.repeat(1000000000).split()

const arrayJoin = 'Array join'
const stringConcat = 'String concat'

console.time(arrayJoin)
const result1 = arr.join('')
console.timeEnd(arrayJoin)

let result2 = ''
console.time(stringConcat)
for (let i of arr) {
  result2 += i
}
console.timeEnd(stringConcat)

console.log(result1.length, result2.length)
console.assert(result1.length === result2.length)

/* 
Array join: 0.063ms
String concat: 0.006ms
*/
