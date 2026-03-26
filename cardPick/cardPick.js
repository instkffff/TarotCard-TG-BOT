function cardPick(pool, exclusion=[], count=1) { 
    // 过滤掉被排除的卡牌
    const availableCards = pool.filter(card => !exclusion.includes(card));
    
    if (availableCards.length === 0 || count <= 0) {
        return []; // 如果没有可用的卡牌或抽取数量小于等于0，则返回空数组
    }
    
    // 确保抽取数量不超过可用卡牌数量
    const actualCount = Math.min(count, availableCards.length);
    
    // 随机打乱可用卡牌并取前actualCount张
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, actualCount);
}


/* // 从主牌池中抽取3张牌
const pickedCards = cardPick(main_pool, [0, 5, 8], 3);

console.log(pickedCards); */

export { cardPick };