import { db } from './db.js';

/**
 * 将任务记录写入数据库
 * @param {string} userId - 用户ID
 * @param {string} taskMd5 - 任务MD5值
 * @param {string} taskResult - 任务结果
 * @returns {object} 插入结果
 */
function insertTaskRecord(userId, taskMd5, taskResult) {
  if (!userId || !taskMd5 || !taskResult) {
    throw new Error('用户ID、任务MD5和任务结果不能为空');
  }
  
  try {
    // 准备插入语句
    const stmt = db.prepare(`
      INSERT INTO task_history (user_id, task_md5, task_result, created_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `);
    
    // 执行插入
    const result = stmt.run(userId, taskMd5, taskResult);
    
    console.log(`成功插入记录，ID: ${result.lastInsertRowid}`);
    
    return {
      success: true,
      id: result.lastInsertRowid,
      changes: result.changes
    };
  } catch (error) {
    console.error('数据库插入失败:', error.message);
    throw error;
  }
}

export { insertTaskRecord };