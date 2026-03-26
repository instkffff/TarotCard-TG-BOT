/*
decompress_starlocation()

将格式如 "04[031921]06[02]07[10]18[0116]" 的字符串解压为对象

{ '4': [ 3, 19, 21 ], '6': [ 2 ], '7': [ 10 ], '18': [ 1, 16 ] }

*/
function decompress_starlocation(str) {
    const result = {};
    
    // 使用正则表达式匹配模式: 两位数字[key][多位两位数字组合]
    const regex = /(\d{2})\[([0-9]{0,100})\]/g;
    let match;
    
    while ((match = regex.exec(str)) !== null) {
        const key = match[1].replace(/^0+/, '') || '0'; // 移除前导零
        const valuesStr = match[2];
        
        // 每两个字符分割为一个数字
        const values = [];
        for (let i = 0; i < valuesStr.length; i += 2) {
            const value = valuesStr.substring(i, i + 2);
            if (value) {
                values.push(parseInt(value, 10));
            }
        }
        
        result[key] = values;
    }
    
    return result;
}

/*
decompress_card()

将格式如 "102114191205" 的字符串解压为二维数组

[ [ 10 ], [ 21 ], [ 14 ], [ 19, 12, 5 ] ]

*/
function decompress_card(str) {
    // 验证长度必须是偶数且至少为6
    if (str.length < 6 || str.length % 2 !== 0) {
        throw new Error('Invalid string length: must be even and at least 6');
    }
    
    const result = [];
    
    // 计算前面独立成组的数量（每组2个字符）
    // 最后3组（6个字符）合并到一个数组中
    const totalPairs = str.length / 2;
    const independentPairs = Math.max(0, totalPairs - 3); // 至少保留最后3对
    
    // 添加独立的数字对
    for (let i = 0; i < independentPairs * 2; i += 2) {
        const numStr = str.substring(i, i + 2);
        if (numStr) {
            result.push([parseInt(numStr, 10)]);
        }
    }
    
    // 添加最后3对数字到一个数组中
    const lastPartStartIndex = independentPairs * 2;
    if (lastPartStartIndex < str.length) {
        const lastPart = str.substring(lastPartStartIndex);
        const lastValues = [];
        for (let i = 0; i < lastPart.length; i += 2) {
            const numStr = lastPart.substring(i, i + 2);
            if (numStr) {
                lastValues.push(parseInt(numStr, 10));
            }
        }
        if (lastValues.length > 0) {
            result.push(lastValues);
        }
    }
    
    return result;
}

/*
splitStarCard()

将合并的字符串 "102114191205|04[031921]06[02]07[10]18[0116]" 分离并解压

返回包含解压后的card和starLocation的对象
*/
function splitStarCard(mergedStr) {
    const parts = mergedStr.split('|');
    if (parts.length !== 2) {
        throw new Error('Invalid merged string format');
    }
    
    const compressedCard = parts[0];
    const compressedStarLocation = parts[1];
    
    const cardSelect = decompress_card(compressedCard);
    const starLocation = decompress_starlocation(compressedStarLocation);
    
    return { cardSelect, starLocation };
}

/* const { cardSelect, starLocation } = splitStarCard('102114191205|04[031921]06[02]07[10]18[0116]');

console.log(card);
console.log(starLocation); */

/* [ [ 10 ], [ 21 ], [ 14 ], [ 19, 12, 5 ] ]
{ '4': [ 3, 19, 21 ], '6': [ 2 ], '7': [ 10 ], '18': [ 1, 16 ] } */


export { decompress_starlocation, decompress_card, splitStarCard };