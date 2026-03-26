import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

config({ path: './conf.env' });

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.help((ctx) => ctx.reply('chillet sticker bot --author NightCandle'))

bot.on('inline_query', async (ctx) => {
  const userInput = ctx.inlineQuery.query.trim();
  const requestText = userInput || "今日运势"; 
  console.log(`[开始占卜] 用户: ${ctx.from.id}, 内容: ${requestText}`);

  try {
    const url = 'http://127.0.0.1:9009/api/tarot';
    
    // 设置一个超时控制器，防止 API 挂起导致 Bot 彻底没反应
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8秒强制断开

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: String(ctx.from.id), request: requestText }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const data = await response.json();
    console.log('[API 返回原始数据]:', data); // 重点：看看这里输出了什么

    // 检查字段是否存在
    const tarotText = data.txt || data.result || data.message || 'API返回数据格式不符';

    const results = [{
      type: 'article',
      id: `tarot_${Date.now()}`,
      title: userInput ? `✨ 占卜：${userInput}` : '🔮 点击占卜今日运势',
      description: tarotText.substring(0, 50) + '...', // 预览部分内容
      input_message_content: {
        message_text: `🔮 **塔罗占卜结果**\n\n**问：** ${requestText}\n\n**解：**\n${tarotText}`,
        parse_mode: 'Markdown'
      }
    }];

    return await ctx.answerInlineQuery(results, { cache_time: 0 });

  } catch (error) {
    console.error('[错误详情]:', error.message);
    // 如果是 fetch 报错，返回一个友好的错误提示
    return await ctx.answerInlineQuery([{
        type: 'article',
        id: 'err',
        title: '⚠️ 占卜暂时失灵',
        description: error.message,
        input_message_content: { message_text: `抱歉，占卜感应中断：${error.message}` }
    }], { cache_time: 0 });
  }
});

// 导出 bot 实例
export { bot }