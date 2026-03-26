import { getStarPositions } from '../starInZodiac.js'

const result = getStarPositions()

console.log( result )

/* {
  '4': { id: [ 3, 19, 21 ], degree: [ 21.26, 2.95, 4.5 ] },
  '6': { id: [ 2 ], degree: [ 3.35 ] },
  '7': { id: [ 10 ], degree: [ 15.34 ] },
  '18': { id: [ 1, 16 ], degree: [ 8.85, 16.53 ] }
} */