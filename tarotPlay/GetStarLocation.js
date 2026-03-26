import { getStarPositions } from '../starLocation/starInZodiac.js'

function GetStarLocation() {
    const starPositions = getStarPositions();
    
    const result = {};
    
    for (const [key, value] of Object.entries(starPositions)) {
        result[key] = value.id;
    }
    
    return result;
}

/* const starLocation = GetStarLocation();
console.log(starLocation); */


/* { '4': [ 3, 19, 21 ], '6': [ 2 ], '7': [ 10 ], '18': [ 1, 16 ] } */

export { GetStarLocation };

