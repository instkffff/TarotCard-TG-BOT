// 根据用户id检索
import { db } from '../db.js';

function getPickPoolByUserId(userId) {
    const stmt = db.prepare('SELECT pick_pool FROM user_db WHERE user_id = ?');
    const result = stmt.get(userId);
    
    if (result) {
        return result.pick_pool;
    }
    
    return null; // 如果没有找到对应的用户ID，则返回null
}

export { getPickPoolByUserId };