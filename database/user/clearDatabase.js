// 清空数据库
import { db } from '../db.js';

/**
 * 清空数据库中的所有数据
 */
function clearDatabase() {
  try {
    // 开始事务
    db.exec('BEGIN TRANSACTION');
    
    // 删除 task_history 表中的所有数据
    db.exec('DELETE FROM task_history');
    
    // 提交事务
    db.exec('COMMIT');
    
    console.log('数据库已清空');
  } catch (error) {
    // 回滚事务
    db.exec('ROLLBACK');
    console.error('清空数据库失败:', error.message);
    throw error;
  }
}

/* clearDatabase(); */

export { clearDatabase };