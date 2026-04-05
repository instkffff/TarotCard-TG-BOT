// telegraf.js
import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { inline_menu } from './inline_menu.js';
import { draw, reset } from '../draw.js';

config({ path: './conf.env' });
const url = process.env.URL;
const bot = new Telegraf(process.env.BOT_TOKEN);

// 测试抽卡
// let drawInfo = draw(12345678);
// console.log(drawInfo);

// reset(12345678);

function FinalMessage(user_id) {
    let { drawInfo, pick_pool } = draw(user_id);
    console.log(drawInfo);
    if (drawInfo === 888888) {
        return {
            type: 'photo',
            media: 'https://chilletstickerpic.pages.dev/png/5.png',
            caption: "您已抽满10张 请重置卡池" + '\n' + pick_pool, // 这里的文字会显示在图片下方
            parse_mode: 'HTML'     // 如果文字里有加粗等标签，请保留
        };
    } else {
        let cardID = drawInfo.id;
        let cardName = drawInfo.card_name_ZH;
        let cardMean = drawInfo.card_meaning;
        let rotation = drawInfo.rotation;

        return {
            type: 'photo',
            media: url + rotation + '/' + cardID + '.jpg',
            caption: "== " + cardName + " == " + '\n' + cardMean + '\n' + pick_pool, // 这里的文字会显示在图片下方
            parse_mode: 'HTML'     // 如果文字里有加粗等标签，请保留
        };
    }

    /* {
        id: 24,
        card_name_ZH: '权杖二',
        card_meaning: '大局观、领导者、克服挑战',
        rotation: 0
    } */
}

bot.on('inline_query', async (ctx) => {
    const results = inline_menu
    return ctx.answerInlineQuery(results, { cache_time: 0 });
});

bot.on('chosen_inline_result', async (ctx) => {
    const { result_id, from, inline_message_id } = ctx.update.chosen_inline_result;

    console.log('收到选择结果:', result_id, '内联消息ID:', inline_message_id);

    let user_id = from.id;

    if (result_id === '1') {
        // 如果有 inline_message_id，编辑消息
        if (inline_message_id) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            let finalMessage = FinalMessage(user_id);
            console.log('发送最终结果:', finalMessage);
            await finalReply(ctx, inline_message_id, finalMessage);
        }
    } else if (result_id === '2') {
        // 处理洗牌操作
        reset(user_id);
        console.log('已重置卡池');

        // 可选：给用户反馈（如果需要的话）
        // 注意：这里不能使用 inline_message_id，因为它不存在

    } else if (result_id === '3') {
        // 处理帮助选项
        console.log('用户查看了帮助信息');
    } else {
        console.log('未知的 result_id:', result_id);
    }
})

async function finalReply(ctx, inline_message_id, finalMessage) {
    try {
        await ctx.telegram.editMessageMedia(
            undefined,
            undefined,
            inline_message_id,
            {
                type: 'photo',
                media: finalMessage.media,
                caption: finalMessage.caption,
                parse_mode: 'HTML'
            },
            {
                reply_markup: { inline_keyboard: [] }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

export { bot };