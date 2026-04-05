// db.js - 一次性数据库初始化脚本
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 设置数据库路径
const dbPath = join(__dirname, '../user_database.db');

console.log('正在初始化数据库：', dbPath);

const db = new Database(dbPath, { 
    timeout: 10000 
});

// 优化设置
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

// 执行表结构创建
const createTableSQL = `
CREATE TABLE IF NOT EXISTS "user_db" (
    "user_id" INTEGER PRIMARY KEY NOT NULL,
    "pick_pool" TEXT
);
`;

try {
    db.exec(createTableSQL);
    console.log('数据库表结构创建成功');
} catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
} finally {
    db.close(); // 初始化完成后关闭连接
}

console.log('数据库初始化完成');