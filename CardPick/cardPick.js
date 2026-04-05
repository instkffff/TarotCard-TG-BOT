import crypto from 'crypto';

function cardPick(pool, exclusion=[], count=1) {
    // 过滤掉被排除的卡牌
    const availableCards = pool.filter(card => !exclusion.includes(card));
    
    if (availableCards.length === 0 || count <= 0) {
        return [[], []]; // 如果没有可用的卡牌或抽取数量小于等于0，则返回两个空数组
    }
    
    // 确保抽取数量不超过可用卡牌数量
    const actualCount = Math.min(count, availableCards.length);
    
    // 使用 Fisher-Yates 洗牌算法配合 crypto 提供的安全随机数
    const shuffled = [...availableCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        // 使用 crypto.randomInt 生成安全的随机整数
        const j = crypto.randomInt(0, i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // 获取选中的卡牌
    const selectedCards = shuffled.slice(0, actualCount);
    
    // 为每张卡牌生成旋转参数（0或1）
    const rotations = selectedCards.map(() => crypto.randomInt(0, 2));
    
    // 返回二维数组：第一维是卡牌，第二维是旋转参数
    return [selectedCards, rotations];
}

/* // 从主牌池中抽取3张牌

import { card_pool } from '../deck/cardpool.js'
const pool = card_pool.card_array;
const [pickedCards, rotations] = cardPick(pool, [0, 5, 8], 3);

console.log("卡牌:", pickedCards);
console.log("旋转:", rotations); */


export { cardPick };