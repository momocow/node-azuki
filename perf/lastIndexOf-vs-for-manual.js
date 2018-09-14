const arr = '1'.repeat(500000).split()
const target = '@'
arr.push(target)
arr.push(...('1'.repeat(500000).split()))
const str = arr.join('')

const lastIndexOfSubstr = 'lastIndexOf + substr'
const forLoop = 'for loop'

console.time(lastIndexOfSubstr)
const result1 = str.substr(str.lastIndexOf('@'))
console.timeEnd(lastIndexOfSubstr)

let result2 = ''
console.time(forLoop)
for (let i = str.length - 1; i >= 0; i--) {
  result2 = str[i] + result2
  if (str[i] === '@') break
}
console.timeEnd(forLoop)

console.log(result1 === result2)

/* 
lastIndexOf + substr: 0.326ms
for loop: 60.304ms
*/