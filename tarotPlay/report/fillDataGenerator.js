import { card } from '../../database/card/card.js';
import { star } from '../../database/card/star.js';
import { element } from '../../database/card/element.js';
import { zodiac } from '../../database/card/zodiac.js';
import { splitStarCard } from '../dataCovert/decompress.js';

/* data 示例

data = '102114191205|04[031921]06[02]07[10]18[0116]'

const { cardSelect, starLocation } = splitStarCard('102114191205|04[031921]06[02]07[10]18[0116]');

card = [ [ 10 ], [ 21 ], [ 14 ], [ 19, 12, 5 ] ]
zodiac = { '4': [ 3, 19, 21 ], '6': [ 2 ], '7': [ 10 ], '18': [ 1, 16 ] } 
*/

/* mainData()结构 

抽卡结果1: ${d.cardName1}
卡牌释义1: ${d.cardMeaning1}
抽卡结果2: ${d.cardName2}
卡牌释义2: ${d.cardMeaning2}
抽卡结果3: ${d.cardName3}
卡牌释义3: ${d.cardMeaning3}

d: {cardName1, cardMeaning1, cardName2, cardMeaning2, cardName3, cardMeaning3}
*/

function mainData(data){
    const { cardSelect, starLocation } = splitStarCard(data);
    const mainCardSelect = cardSelect[3]

    const cardName1 = card[mainCardSelect[0]].name
    const cardMeaning1 = card[mainCardSelect[0]].meaning
    const cardName2 = card[mainCardSelect[1]].name
    const cardMeaning2 = card[mainCardSelect[1]].meaning
    const cardName3 = card[mainCardSelect[2]].name
    const cardMeaning3 = card[mainCardSelect[2]].meaning

    const d = {cardName1, cardMeaning1, cardName2, cardMeaning2, cardName3, cardMeaning3}

    return d
}


/* 抽卡结果: ${d.cardName}
对应行星: ${d.planetName}
行星释义: ${d.planetMeaning}
所在星座: ${d.zodiacName}
星座释义: ${d.zodiacMeaning} */
function starData(data){
    const { cardSelect, starLocation } = splitStarCard(data);
    const StarCardSelect = cardSelect[0];

    // 逻辑：遍历 starLocation 的键，查找哪个键对应的数组包含 StarCardSelect 中的值
    const foundKey = Object.keys(starLocation).find(key => 
        starLocation[key].some(val => StarCardSelect.includes(val))
    );
    
    const cardName = card[StarCardSelect].name;
    const planetName = star[StarCardSelect].name;
    const planetMeaning = star[StarCardSelect].meaning;
    const zodiacName = zodiac[foundKey].name;
    const zodiacMeaning = zodiac[foundKey].meaning;
    
    const d = {cardName, planetName, planetMeaning, zodiacName, zodiacMeaning}
    return d
}

/* 抽卡结果: ${d.cardName}
元素共鸣: ${d.elementName}
元素释义: ${d.elementMeaning} */
function elementData(data){
    const { cardSelect, starLocation } = splitStarCard(data);
    const ElementCardSelect = cardSelect[1];

    const cardName = card[ElementCardSelect].name;
    const elementName = element[ElementCardSelect].name;
    const elementMeaning = element[ElementCardSelect].meaning;

    const d = {cardName, elementName, elementMeaning}
    return d
}

/* 抽卡结果: ${d.cardName}
对应星座: ${d.zodiacName}
星座释义: ${d.zodiacMeaning}

内部巡行能量: 
${d.starInZodiac} */
function zodiacData(data){
    const { cardSelect, starLocation } = splitStarCard(data);
    const ZodiacCardSelect = cardSelect[2];

    const cardName = card[ZodiacCardSelect].name;
    const zodiacName = zodiac[ZodiacCardSelect].name;
    const zodiacMeaning = zodiac[ZodiacCardSelect].meaning;

    let starInZodiac = '';
    if (starLocation[ZodiacCardSelect]){
        // 填写规格
        // 行星名称: 行星名称1
        // 行星释义: 行星释义1
        // 行星名称: 行星名称2
        // 行星释义: 行星释义2
        // ...
        
        starInZodiac = starLocation[ZodiacCardSelect].map(starIndex => 
            `行星名称: ${star[starIndex].name}\n行星释义: ${star[starIndex].meaning}`
        ).join('\n\n');
    }

    const d = {cardName, zodiacName, zodiacMeaning, starInZodiac}
    return d
}


/* console.log(mainData('102114191205|04[031921]06[02]07[10]18[0116]'))
console.log(starData('102114191205|04[031921]06[02]07[10]18[0116]'))
console.log(elementData('102114191205|04[031921]06[02]07[10]18[0116]'))
console.log(zodiacData('102114191205|04[031921]06[02]07[10]18[0116]')) */

export { mainData, starData, elementData, zodiacData }