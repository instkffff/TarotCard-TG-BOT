// 根据用户id 更新pick_pool
import { db } from '../db.js';

function updateUserPickPool(userId, pickPool) {
    try {
        // 将数组转换为JSON字符串存储
        const pickPoolStr = JSON.stringify(pickPool);
        
        const stmt = db.prepare('UPDATE user_db SET pick_pool = ? WHERE user_id = ?');
        const result = stmt.run(pickPoolStr, userId);
        
        return result;
    } catch (error) {
        console.error('更新用户pick_pool时出错:', error);
        throw error;
    }
}

export { updateUserPickPool };