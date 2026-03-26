import { Telegraf } from 'telegraf';
require('dotenv').config({path:'conf.env'})

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.help((ctx) => ctx.reply('chillet sticker bot --author NightCandle'))

bot.on('inline_query', async (ctx) => {
  // 获取用户输入，如果为空则默认为 "今日运势"
  const userInput = ctx.inlineQuery.query.trim();
  const requestText = userInput || "今日运势"; 
  const userId = String(ctx.from.id);

  try {
    // 1. 调用本地接口
    const url = 'http://127.0.0.1:9009/api/tarot';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,     // 动态用户 ID
        request: requestText // 动态祈愿内容（输入为空时即为“今日运势”）
      })
    });

    // 假设 API 返回 JSON，结果在 txt 字段中
    const data = await response.json();
    const tarotText = data.txt || '占卜师陷入了沉思，请稍后再试。';

    // 2. 构造返回选项
    const results = [{
      type: 'article',
      id: `tarot_${Date.now()}`,
      // 如果用户没输入，标题显示“今日运势”，否则显示用户输入的内容
      title: userInput ? `✨ 占卜：${userInput}` : '🔮 点击占卜今日运势',
      description: userInput ? `点击获取关于“${userInput}”的启示` : '默认占卜今日运势，看看你的运气吧！',
      input_message_content: {
        message_text: `🔮 **塔罗占卜结果**\n\n**问：** ${requestText}\n\n**解：**\n${tarotText}\n\n*—— NightCandle*`,
        parse_mode: 'Markdown'
      }
    }];

    // 3. 触发函数：返回查询结果
    return await ctx.answerInlineQuery(results, { cache_time: 0 });

  } catch (error) {
    console.error('API Error:', error);
    // 报错时的反馈
    return await ctx.answerInlineQuery([{
      type: 'article',
      id: 'error',
      title: '⚠️ 占卜暂时无法进行',
      description: '请检查本地 API 服务是否开启',
      input_message_content: {
        message_text: '抱歉，占卜感应中断，请稍后再试。'
      }
    }], { cache_time: 0 });
  }
});

bot.launch()