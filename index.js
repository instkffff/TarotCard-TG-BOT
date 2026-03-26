// 在其他文件中使用
import { server } from './httpApi/main.js';
import { clearDatabase } from './database/user/clearDatabase.js';
import { bot } from './telegramBot/telegram.js';

function scheduleDailyTask() {
  const now = new Date();
  // 设置明天凌晨0点的时间 (北京时间)
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  
  // 计算距离下次执行还有多少毫秒
  const timeUntilNextRun = nextMidnight.getTime() - now.getTime();
  
  // 设置定时器，在计算出的时间后执行
  setTimeout(async () => {
    try {
      console.log('开始执行数据库清理任务:', new Date());
      await clearDatabase();
      console.log('数据库清理完成');
      
      // 执行完成后，重新安排下一次执行
      scheduleDailyTask();
    } catch (error) {
      console.error('数据库清理失败:', error);
      // 即使失败也继续安排下一次执行
      scheduleDailyTask();
    }
  }, timeUntilNextRun);
}

// 启动定时任务
scheduleDailyTask();

server.listen(9009, () => {
  console.log('Server running on port 9009');
  console.log('数据库清理任务已设置 - 每天0点执行');
});

// 启动机器人
bot.launch();