import { main_pool, star_pool, zodiac_pool, element_pool } from '../cardPick/cardPool.js'
import { cardPick } from '../cardPick/cardPick.js'

function GetCard() {
    // 记录已抽取的卡牌，避免重复
    let excludedCards = [];
    const result = [];
    
    // 1. 先从star_pool 中随机抽取一个
    const starCard = cardPick(star_pool, excludedCards, 1);
    excludedCards = excludedCards.concat(starCard); // 将已抽的卡加入排除列表
    result.push(starCard);
    
    // 2. 再从element_pool 中随机抽取一个
    const elementCard = cardPick(element_pool, excludedCards, 1);
    excludedCards = excludedCards.concat(elementCard); // 将已抽的卡加入排除列表
    result.push(elementCard);
    
    // 3. 再从zodiac_pool 中随机抽取一个
    const zodiacCard = cardPick(zodiac_pool, excludedCards, 1);
    excludedCards = excludedCards.concat(zodiacCard); // 将已抽的卡加入排除列表
    result.push(zodiacCard);
    
    // 4. 最后从main_pool 中随机抽取三个
    const mainCards = cardPick(main_pool, excludedCards, 3);
    result.push(mainCards);
    
    return result;
}

/* const cardP = GetCard();
console.log(cardP);
 */

/* [ [ 10 ], [ 21 ], [ 14 ], [ 19, 12, 5 ] ] */

export { GetCard };