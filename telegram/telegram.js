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
    let { drawInfo, pick_pool_string } = draw(user_id);
    if (drawInfo === 888888) {
        return `您已抽满10张 请洗牌以重置卡池`
    }

    /* {
        id: 24,
        card_name_ZH: '权杖二',
        card_meaning: '大局观、领导者、克服挑战',
        rotation: 0
    } */

    let cardID = drawInfo.id;
    let cardName = drawInfo.card_name_ZH;
    let cardMean = drawInfo.card_meaning;
    let rotation = drawInfo.rotation;

    /* return {
        type: 'photo',
        media: url + rotation + '/' + cardID + '.jpg',
        caption: "== " + cardName + " ==" + cardMean + "<br>" + pick_pool_string, // 这里的文字会显示在图片下方
        parse_mode: 'HTML'     // 如果文字里有加粗等标签，请保留
    }; */

    return {
        type: 'photo',
        media: 'https://chilletstickerpic.pages.dev/tarot/1/40.jpg',
        caption: '== 圣杯四 ==突然觉醒、选择快乐、接受\n[33,32]',
        parse_mode: 'HTML'
    }

}

bot.on('inline_query', async (ctx) => {
    const results = inline_menu
    return ctx.answerInlineQuery(results, { cache_time: 0 });
});

bot.on('chosen_inline_result', async (ctx) => {
    const { result_id, from, inline_message_id } = ctx.update.chosen_inline_result;

    console.log('收到选择结果:', result_id, '内联消息ID:', inline_message_id);
    if (!inline_message_id) return;

    let user_id = from.id;

    await new Promise(resolve => setTimeout(resolve, 1000));

    let finalMessage = FinalMessage(user_id);

    console.log('发送最终结果:', finalMessage);

    if (result_id === '1') {
        await finalReply(ctx, inline_message_id, finalMessage);
    } else if (result_id === '2') {
        reset(user_id);
    } else {
        return
    }

})

async function finalReply(ctx, inline_message_id, finalMessage) {
    try {
        await ctx.telegram.editMessageText(
            undefined,
            undefined,
            inline_message_id,
            {
                type: 'photo',
                media: finalMsg.media,
                caption: finalMsg.caption,
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