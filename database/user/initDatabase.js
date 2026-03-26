import Database from 'better-sqlite3';

/**
 * 初始化用户数据库
 * @param {string} dbPath - 数据库文件路径
 * @returns {import('better-sqlite3')} 数据库实例
 */
function initDatabase(dbPath = './user_database.db') {
  // 连接到数据库（如果不存在则会自动创建）
  const db = new Database(dbPath, {
    verbose: console.log // 开启调试日志
  });

  // 启用 WAL 模式以提高并发性能
  db.exec('PRAGMA journal_mode = WAL;');
  
  // 设置 WAL 相关参数以优化性能
  db.exec('PRAGMA wal_autocheckpoint = 1000;'); // 每1000页写入自动检查点
  db.exec('PRAGMA synchronous = NORMAL;');      // 平衡性能和安全性

  // 创建任务历史表
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "task_history" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      "user_id" TEXT NOT NULL,
      "task_md5" TEXT NOT NULL,
      "task_result" TEXT NOT NULL,
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.exec(createTableQuery);
  
  console.log('数据库初始化完成（WAL模式已启用）');
  
  return db;
}

export { initDatabase };