const inline_menu = [
    {
        type: 'article',
        id: '1',
        title: '抽卡',
        description: '点击抽取塔罗牌',
        thumb_url: 'https://cdn-icons-png.flaticon.com/512/4867/4867324.png', // 对应左侧头像
        input_message_content: {
            message_text: `抽卡`
        },
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'⏳ 抽卡中请稍后...','callback_data':'none'}
                ]
            ]
        }

    },
    {
        type: 'article',
        id: '2',
        title: '洗牌',
        description: '点击重置牌池',
        thumb_url: 'https://cdn-icons-png.flaticon.com/512/17926/17926065.png',
        input_message_content: {
            message_text: `🔄 洗牌成功`
        }
    },
    {
        type: 'article',
        id: '4',
        title: '总结',
        description: '总结所有抽卡',
        thumb_url: 'https://cdn-icons-png.flaticon.com/512/17300/17300328.png',
        input_message_content: {
            message_text: `抽卡总结`
        },
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'⏳ 抽卡总结中请稍后...','callback_data':'none'}
                ]
            ]
        }
    },
    {
        type: 'article',
        id: '3',
        title: '帮助',
        description: '获取帮助',
        thumb_url: 'https://cdn-icons-png.flaticon.com/512/9195/9195785.png',
        input_message_content: {
            message_text: 
`== 塔罗牌Bot使用方法 ==

- 抽卡 -
从78张塔罗牌中不重复抽取一张直到洗牌。 

- 洗牌 -
重置卡池，将之前抽牌放回卡组。`
        }
    }
];

export { inline_menu };