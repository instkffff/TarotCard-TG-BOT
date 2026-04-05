// 插入条目 用户id pick_pool=[]
import { db } from '../db.js';

function insertUser(userId, pickPool = []) {
    try {
        // 将数组转换为JSON字符串存储
        const pickPoolStr = JSON.stringify(pickPool);
        
        const stmt = db.prepare('INSERT INTO user_db (user_id, pick_pool) VALUES (?, ?)');
        const result = stmt.run(userId, pickPoolStr);
        
        return result;
    } catch (error) {
        console.error('插入用户数据时出错:', error);
        throw error;
    }
}

export { insertUser };