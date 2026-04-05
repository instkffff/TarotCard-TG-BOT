// 数据库操作
import { insertUser } from './db/operate/insert.js';
import { getPickPoolByUserId } from './db/operate/query.js';
import { updateUserPickPool } from './db/operate/modifier.js';

// 卡牌信息
import { card_pool } from './deck/cardpool.js'
import { card_mean } from './deck/cardmean.js'

// 抽卡方法
import { cardPick } from './CardPick/cardPick.js'
import { cardInfo } from './CardPick/cardInfo.js'

function queryPickPool(user_id) {
    let pick_pool = getPickPoolByUserId(user_id);
    if (pick_pool == null) {
        insertUser(user_id, []);
        pick_pool = getPickPoolByUserId(user_id);
    }
    return pick_pool;
}

function draw(user_id) {
    // 如果从数据库获取的是字符串格式，需要先转换为数组
    let pick_pool_string = queryPickPool(user_id);  // 假设返回的是字符串
    
    // 将字符串转换为数组
    let pick_pool = JSON.parse(pick_pool_string);
    
    if (pick_pool.length >= 10){
        // 如果牌组已经到10张，则返回一个特殊值
        return 888888;
    }
    
    let [pickedCards, rotations] = cardPick(card_pool.card_array, pick_pool, 1);

    pick_pool.push(pickedCards[0]);
    updateUserPickPool(user_id, pick_pool);

    let drawInfo = cardInfo(card_pool, card_mean, rotations[0], pickedCards[0]);
    
    return { drawInfo, pick_pool_string };
}


function reset(user_id) {
    updateUserPickPool(user_id, []);
}

// 测试抽卡
/* let { drawInfo, pick_pool_string } = draw(12345678);
console.log(drawInfo);
console.log(pick_pool_string); */

// reset(12345678);

export { draw, reset };

