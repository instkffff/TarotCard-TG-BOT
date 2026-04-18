import { getPickPoolByUserId } from './db/operate/query.js';
import { insertUser } from './db/operate/insert.js';

// 卡牌信息
import { card_pool } from './deck/cardpool.js'
import { card_mean } from './deck/cardmean.js'

function drawSum(user_id) {
    let pick_pool_string = getPickPoolByUserId(user_id);
    let pick_pool = JSON.parse(pick_pool_string);

    if (pick_pool == null) {
        insertUser(user_id, [[], []]);
        return "您目前未抽卡";
    }

    if (pick_pool[0].length == 0) {
        return "您目前未抽卡";
    }

    let cardID = pick_pool[0]
    let rotation = pick_pool[1]

    let result = "";
    
    for (let i = 0; i < cardID.length; i++) { 

        let index = cardID[i] - 1;
        // 获取卡牌名称
        let cardName = card_pool.card_name_ZH[index];
        // 获取正逆位
        let position = rotation[i] == 0 ? "正位" : "逆位";
        // 获取释义
        let meaning = card_mean.meanings_ZH[index][rotation[i]];
        
        // 按照模板格式拼接结果
        result += `==${cardName}==\n${position}\n${meaning}\n`;
    }
    
    return result.trim(); // 返回结果并去除末尾换行符
}

/* // 测试
let resultSum = drawSum(12345678)
console.log(resultSum) */

export { drawSum }