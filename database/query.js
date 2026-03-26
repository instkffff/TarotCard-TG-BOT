// 数据库检索
import { db } from './db.js';
/**
 * 通过 user_id 检索数据库
 * @param {string} userId - 用户ID
 * @returns {Array<{task_md5: string, task_result: string}>} 包含 task_md5 和 task_result 的对象数组
 */
function queryByUserId(userId) {
  if (!userId) {
    throw new Error('用户ID不能为空');
  }
  
  try {
    // 准备查询语句
    const stmt = db.prepare(`
      SELECT task_md5, task_result 
      FROM task_history 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `);
    
    // 执行查询
    const results = stmt.all(userId);
    
    return results;
  } catch (error) {
    console.error('数据库查询失败:', error.message);
    throw error;
  }
}

export { queryByUserId };