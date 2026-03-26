/*
compress_starlocation()

{ '4': [ 3, 19, 21 ], '6': [ 2 ], '7': [ 10 ], '18': [ 1, 16 ] }

压缩成以下格式

04[031921]06[02]07[10]18[0116]

这个对象里面有多少对象不一定

*/
function compress_starlocation(obj) {
    let result = '';
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const values = obj[key];
            let valuesStr = '';
            
            for (let i = 0; i < values.length; i++) {
                // 将每个数字转换为两位数格式
                const paddedValue = String(values[i]).padStart(2, '0');
                valuesStr += paddedValue;
            }
            
            // 将key也转换为两位数格式
            const paddedKey = String(key).padStart(2, '0');
            result += `${paddedKey}[${valuesStr}]`;
        }
    }
    
    return result;
}

/*
compress_card()

[ [ 10 ], [ 21 ], [ 14 ], [ 19, 12, 5 ] ]

压缩成以下格式

102114191205

*/
function compress_card(arr) {
    let result = '';
    
    for (let i = 0; i < arr.length; i++) {
        const innerArr = arr[i];
        
        for (let j = 0; j < innerArr.length; j++) {
            // 将每个数字转换为两位数格式
            const paddedValue = String(innerArr[j]).padStart(2, '0');
            result += paddedValue;
        }
    }
    
    return result;
}

/*
mergeStarCard()

04[031921]06[02]07[10]18[0116]
102114191205

合并结果

102114191205|04[031921]06[02]07[10]18[0116]

*/
function mergeStarCard(compressedCard, compressedStarLocation) {
    return `${compressedCard}|${compressedStarLocation}`;
}


/* const star = compress_starlocation({ '4': [ 3, 19, 21 ], '6': [ 2 ], '7': [ 10 ], '18': [ 1, 16 ] })
console.log(star)

const card = compress_card([ [ 10 ], [ 21 ], [ 14 ], [ 19, 12, 5 ] ])
console.log(card)

console.log(mergeStarCard(card, star)) */

/* 04[031921]06[02]07[10]18[0116]
102114191205
102114191205|04[031921]06[02]07[10]18[0116]
 */

export { compress_starlocation, compress_card, mergeStarCard }