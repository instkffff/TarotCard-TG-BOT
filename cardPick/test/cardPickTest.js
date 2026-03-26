import { main_pool, star_pool, zodiac_pool, element_pool } from '../cardPool.js'
import { cardPick } from '../cardPick.js'

/* // 从主牌池中抽取3张牌
const pickedCards = cardPick(main_pool, [0, 5, 8], 3);

console.log(pickedCards); */

let exclusion = [];

const starPick = cardPick(star_pool, exclusion, 1)

exclusion.push(starPick[0])

console.log(starPick)
console.log(exclusion)

const elementPick = cardPick(element_pool, exclusion, 1)

exclusion.push(elementPick[0])

console.log(elementPick)
console.log(exclusion)

const zodiacPick = cardPick(zodiac_pool, exclusion, 1)

exclusion.push(zodiacPick[0])

console.log(zodiacPick)
console.log(exclusion)

const mainPick = cardPick(main_pool, exclusion, 3)

console.log(mainPick)

/* [ 1 ]
[ 1 ]
[ 4 ]
[ 1, 4 ]
[ 21 ]
[ 1, 4, 21 ]
[ 9, 13, 8 ] */